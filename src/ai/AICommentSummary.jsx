import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiMagicIcon, SparklesIcon } from "@hugeicons/core-free-icons";

const AVALAI_API_KEY =
  import.meta.env.VITE_AVALAI_API_KEY ||
  "aa-XUA26uKD7pAlVgAtNpQ0o2nnipu5poGLe8UYz2wLg4ZtGDQC";

const AICommentSummary = ({ comments, courseId }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStorageKey = () => `comment_summary_${courseId}_${comments?.length || 0}`;

  useEffect(() => {
    if (!comments || comments.length === 0 || !courseId) {
      setSummary("");
      return;
    }

    const cacheKey = getStorageKey();
    const cachedSummary = localStorage.getItem(cacheKey);

    if (cachedSummary) {
      setSummary(cachedSummary);
    } else {
      setSummary("");
    }
    setError(null);
  }, [courseId, comments]);

  const handleGenerateSummary = async () => {
    if (!comments || comments.length === 0) return;

    setError(null);

    const cacheKey = getStorageKey();
    const cachedSummary = localStorage.getItem(cacheKey);

    if (cachedSummary) {
      setSummary(cachedSummary);
      return;
    }

    setLoading(true);

    const commentsText = comments
      .map((c, index) => `${index + 1}. ${c.title}: ${c.describe}`)
      .join("\n");

    const prompt = `کامنت‌های زیر مربوط به یک دوره آموزشی هستند. لطفاً نظر کلی دانشجویان، نقاط قوت و انتقادات احتمالی را در ۳ تا ۴ جمله کوتاه، مفید و روان به زبان فارسی خلاصه کن:\n\n${commentsText}`;

    try {
      const response = await fetch("https://api.avalai.ir/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AVALAI_API_KEY.trim()}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "تو یک دستیار هوشمند و خلاصه ساختاریافته هستی که نظرات کاربران را تحلیل و خلاصه می‌کنی.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 400,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "خطا در دریافت پاسخ از هوش مصنوعی");
      }

      const generatedText = data.choices?.[0]?.message?.content;

      if (generatedText) {
        setSummary(generatedText);
        localStorage.setItem(cacheKey, generatedText);
      } else {
        throw new Error("پاسخ معتبری دریافت نشد");
      }
    } catch (err) {
      console.error(err);
      setError("خطا در ایجاد خلاصه کامنت‌ها. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  if (!comments || comments.length === 0) return null;

  return (
    <div className="w-full bg-accent/10 border-2 border-accent/30 rounded-2xl p-4 mb-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-accent text-base lg:text-lg">
          <HugeiconsIcon icon={SparklesIcon} className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>خلاصه هوشمند کامنت‌ها</span>
        </div>

        <Button
          onClick={handleGenerateSummary}
          isDisabled={loading}
          variant="primary"
          className="bg-accent text-accent-foreground text-xs lg:text-sm h-8 lg:h-10 rounded-full px-4 flex items-center gap-2"
        >
          <HugeiconsIcon icon={AiMagicIcon} className="w-4 h-4" />
          {loading ? "در حال پردازش..." : summary ? "نمایش خلاصه" : "خلاصه کن"}
        </Button>
      </div>

      {error && <p className="text-danger text-xs lg:text-sm">{error}</p>}

      {summary && (
        <div className="bg-background/80 p-3.5 rounded-xl border border-border text-foreground text-xs lg:text-sm leading-relaxed whitespace-pre-line animate-fadeIn">
          {summary}
        </div>
      )}
    </div>
  );
};

export default AICommentSummary;