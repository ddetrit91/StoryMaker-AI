import {
  GoogleGenerativeAI,
  SchemaType,
  type ResponseSchema,
} from "@google/generative-ai";
import { getGeminiApiKey } from "./env";
import { buildUserPrompt, SYSTEM_INSTRUCTION } from "./prompts";
import type { GenerateRequest, StorySeries } from "./types";
import { storySeriesSchema } from "./validate";

const MODEL_ID = "gemini-3.5-flash-lite";

const RESPONSE_SCHEMA: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    stories: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          text: { type: SchemaType.STRING },
          visualIdea: { type: SchemaType.STRING },
          interactive: {
            type: SchemaType.OBJECT,
            properties: {
              type: {
                type: SchemaType.STRING,
                format: "enum",
                enum: ["poll", "question", "cta"],
              },
              content: { type: SchemaType.STRING },
            },
            required: ["type", "content"],
          },
          design: {
            type: SchemaType.OBJECT,
            properties: {
              background: { type: SchemaType.STRING },
              colors: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
              },
              textPlacement: { type: SchemaType.STRING },
            },
            required: ["background", "colors", "textPlacement"],
          },
        },
        required: ["title", "text", "visualIdea", "interactive", "design"],
      },
    },
  },
  required: ["stories"],
};

function getClient() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenerativeAI(apiKey);
}

function parseJsonPayload(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("INVALID_JSON");
  }
}

async function callModel(
  input: GenerateRequest,
  extraHint?: string,
): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: MODEL_ID,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      temperature: 0.85,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    },
  });

  const prompt = extraHint
    ? `${buildUserPrompt(input)}\n\n${extraHint}`
    : buildUserPrompt(input);

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  if (!text?.trim()) {
    throw new Error("EMPTY_RESPONSE");
  }
  return text;
}

export async function generateStories(
  input: GenerateRequest,
): Promise<StorySeries> {
  let raw = await callModel(input);

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const parsed = parseJsonPayload(raw);
      const validated = storySeriesSchema.parse(parsed);
      return validated as StorySeries;
    } catch {
      if (attempt === 0) {
        raw = await callModel(
          input,
          "Предыдущий ответ был невалидным. Верни строго JSON с ровно 3 элементами в stories по схеме.",
        );
        continue;
      }
      throw new Error("INVALID_RESPONSE");
    }
  }

  throw new Error("INVALID_RESPONSE");
}
