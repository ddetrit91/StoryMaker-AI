import { z } from "zod";

export const generateRequestSchema = z
  .object({
    niche: z.enum([
      "beauty_salon",
      "clothing_store",
      "cafe",
      "personal_blog",
      "custom",
    ]),
    customNiche: z.string().trim().max(120).optional(),
    goal: z.enum([
      "attract_clients",
      "announce_new",
      "announce_promo",
      "boost_engagement",
    ]),
    textStyle: z.enum(["friendly", "expert", "creative"]),
    additionalInfo: z.string().trim().max(2000).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.niche === "custom" && !data.customNiche?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Укажите свою нишу",
        path: ["customNiche"],
      });
    }
  });

const interactiveSchema = z.object({
  type: z.enum(["poll", "question", "cta"]),
  content: z.string().min(1),
});

const designSchema = z.object({
  background: z.string().min(1),
  colors: z.array(z.string()).min(1).max(6),
  textPlacement: z.string().min(1),
});

export const storyItemSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  visualIdea: z.string().min(1),
  interactive: interactiveSchema,
  design: designSchema,
});

export const storySeriesSchema = z.object({
  stories: z.tuple([storyItemSchema, storyItemSchema, storyItemSchema]),
});

export type GenerateRequestInput = z.infer<typeof generateRequestSchema>;
export type StorySeriesParsed = z.infer<typeof storySeriesSchema>;
