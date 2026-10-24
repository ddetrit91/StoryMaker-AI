import { getTemplate } from "@/lib/story-templates";
import {
  INTERACTIVE_LABELS,
  type StoryItem,
  type TemplateId,
} from "@/lib/types";

interface PdfDocumentProps {
  nicheLabel: string;
  templateId: TemplateId;
  stories: StoryItem[];
}

/** В PDF тёмный шаблон делает текст нечитаемым — всегда светлая карточка */
function resolvePdfTemplateId(templateId: TemplateId): TemplateId {
  return templateId === "dark_elegant" ? "soft_blush" : templateId;
}

/** PDF-макет: светлые карточки, высокий контраст, жирные заголовки */
export function PdfDocument({
  nicheLabel,
  templateId,
  stories,
}: PdfDocumentProps) {
  const tpl = getTemplate(resolvePdfTemplateId(templateId));
  const dateLabel = new Date().toLocaleDateString("ru-RU");

  const titleColor = "#5c3d4a";
  const bodyColor = "#3d3532";
  const labelColor = "#8a6b78";
  const chipText = "#5c3d4a";

  return (
    <div
      id="pdf-export-root"
      style={{
        width: 900,
        boxSizing: "border-box",
        padding: "40px 44px 48px",
        backgroundColor: "#faf7f4",
        color: "#2e2a27",
        fontFamily: 'Manrope, Arial, Helvetica, "Segoe UI", sans-serif',
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: 'Cormorant Garamond, Georgia, "Times New Roman", serif',
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.1,
          color: "#2e2a27",
        }}
      >
        StoryMaker AI
      </h1>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: 13,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#8a8178",
        }}
      >
        {nicheLabel} · {dateLabel}
      </p>

      <div
        style={{
          display: "flex",
          gap: 22,
          marginTop: 28,
          justifyContent: "space-between",
        }}
      >
        {stories.map((story, index) => (
          <div key={`pdf-card-${index}`} style={{ width: 268, flexShrink: 0 }}>
            <div
              style={{
                boxSizing: "border-box",
                width: 268,
                height: 476,
                borderRadius: 26,
                padding: 8,
                backgroundColor: "#1a1614",
                border: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  height: "100%",
                  borderRadius: 20,
                  overflow: "hidden",
                  background: tpl.screenBackground,
                  position: "relative",
                  padding: "30px 18px 16px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 36,
                    right: 36,
                    top: 12,
                    height: 5,
                    borderRadius: 999,
                    backgroundColor: "rgba(0,0,0,0.14)",
                  }}
                />
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: labelColor,
                    fontFamily: "Manrope, Arial, sans-serif",
                  }}
                >
                  Story {index + 1}
                </p>
                <h2
                  style={{
                    margin: 0,
                    fontFamily:
                      'Cormorant Garamond, Georgia, "Times New Roman", serif',
                    fontSize: 24,
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: titleColor,
                  }}
                >
                  {story.title}
                </h2>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: 12.5,
                    lineHeight: 1.55,
                    color: bodyColor,
                    whiteSpace: "pre-line",
                    fontFamily: "Manrope, Arial, sans-serif",
                  }}
                >
                  {story.text}
                </p>
                <div
                  style={{
                    position: "absolute",
                    left: 18,
                    right: 18,
                    bottom: 16,
                    boxSizing: "border-box",
                    borderRadius: 16,
                    padding: "10px 12px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #ead9e0",
                    color: chipText,
                    fontSize: 11,
                    lineHeight: 1.4,
                    fontFamily: "Manrope, Arial, sans-serif",
                  }}
                >
                  <strong style={{ fontWeight: 700, color: chipText }}>
                    {INTERACTIVE_LABELS[story.interactive.type]}
                  </strong>
                  <span style={{ color: chipText }}>
                    {" "}
                    · {story.interactive.content}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 36,
          borderTop: "1px solid #e4d9cf",
          paddingTop: 28,
        }}
      >
        {stories.map((story, index) => (
          <div
            key={`pdf-text-${index}`}
            style={{
              marginBottom: index < stories.length - 1 ? 28 : 0,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1.35,
                color: "#2e2a27",
                fontFamily: "Manrope, Arial, sans-serif",
              }}
            >
              Сторис {index + 1}: {story.title}
            </p>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.65,
                color: "#3f3934",
                whiteSpace: "pre-line",
                fontFamily: "Manrope, Arial, sans-serif",
              }}
            >
              {story.text}
            </p>
            <p
              style={{
                margin: "14px 0 0",
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.55,
                color: "#7a736c",
                fontFamily: "Manrope, Arial, sans-serif",
              }}
            >
              Визуал: {story.visualIdea}
            </p>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.55,
                color: "#7a736c",
                fontFamily: "Manrope, Arial, sans-serif",
              }}
            >
              Оформление: {story.design.background}. {story.design.textPlacement}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
