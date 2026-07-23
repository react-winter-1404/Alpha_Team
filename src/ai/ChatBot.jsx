import { useState } from 'react';

const AVALAI_API_KEY = import.meta.env.VITE_AVALAI_API_KEY || "aa-XUA26uKD7pAlVgAtNpQ0o2nnipu5poGLe8UYz2wLg4ZtGDQC";

const WEBSITE_GUIDE = `
تو یک پشتیبان و راهنمای صمیمی و حرفه‌ای برای این وبسایت آموزشی هستی.
وظیفه تو این است که کاربران را درباره بخش‌های مختلف سایت، خدمات و فرآیند ثبت‌نام در دوره‌ها به طور کامل راهنمایی کنی.

فرآیند ثبت‌نام و رزرو دوره‌ها:
۱. مرحله اول (رزرو دوره): کاربر ابتدا باید دوره مورد نظر خود را انتخاب کرده و دکمه رزرو دوره را بزند.
۲. مرحله دوم (تأیید ادمین): درخواست رزرو کاربر برای مدیران سایت ارسال می‌شود. کاربر باید منتظر بررسی و تأیید ادمین بماند.
۳. مرحله سوم (پرداخت): پس از اینکه رزرو توسط ادمین تأیید شد، لینک پرداخت برای کاربر فعال می‌شود و می‌تواند هزینه دوره را پرداخت کند.
۴. مرحله چهارم (تکمیل ثبت‌نام): بلافاصله پس از پرداخت موفق، ثبت‌نام کاربر در دوره قطعی و نهایی شده و دسترسی به محتوای دوره ایجاد می‌شود.

قوانین پاسخ‌دهی:
- پاسخ‌ها باید لحنی صمیمی، محترمانه و روشن داشته باشند.
- اگر کاربر درباره ثبت‌نام یا خرید دوره پرسید، روند ۴ مرحله‌ای بالا را کاملاً واضح توضیح بده.
- اگر سوال کاربر کاملاً نامرتبط با وبسایت، دوره‌ها و خدمات ما بود، با احترام بگو: "من پشتیبان و راهنمای این وبسایت هستم و می‌توانم درباره دوره‌ها، نحوه ثبت‌نام و خدمات سایت به شما کمک کنم."
`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'سلام، چطور می‌توانم درباره دوره‌ها و نحوه ثبت‌نام راهنمایی‌تان کنم؟' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    const updatedMessages = [...messages, { role: 'user', text: userText }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: WEBSITE_GUIDE },
        ...updatedMessages.map((m) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
      ];

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('https://api.avalai.ir/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AVALAI_API_KEY.trim()}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: apiMessages,
          temperature: 0.6,
          max_tokens: 500,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `Error: ${response.status}`);
      }

      if (data.choices && data.choices[0]?.message?.content) {
        const botReply = data.choices[0].message.content;
        setMessages((prev) => [...prev, { role: 'bot', text: botReply }]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      let errorMessage = 'خطایی در دریافت پاسخ رخ داد. لطفاً دوباره تلاش کنید.';
      if (error.name === 'TypeError') {
        errorMessage = 'خطا در اتصال به شبکه. لطفاً وضعیت اینترنت خود را بررسی کنید.';
      } else if (error.name === 'AbortError') {
        errorMessage = 'پاسخ‌دهی زمان‌بر شد. لطفاً دوباره امتحان کنید.';
      }

      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8.5 left-5 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-full shadow-2xl transition-all flex items-center justify-center font-medium text-sm"
        >
          چت با پشتیبان
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-[26rem] bg-white border border-gray-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden dir-rtl text-right">
          <div className="bg-blue-600 text-white p-3.5 flex justify-between items-center font-bold text-sm shadow-md">
            <span>راهنمای هوشمند سایت</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-lg leading-none"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gray-50">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white ml-auto text-right rounded-bl-none shadow-sm'
                    : 'bg-white border border-gray-100 text-gray-800 mr-auto rounded-br-none shadow-sm whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bg-white border border-gray-100 text-gray-400 p-2.5 rounded-xl text-xs mr-auto w-fit animate-pulse shadow-sm">
                در حال تایپ پاسخ...
              </div>
            )}
          </div>

          <div className="p-2.5 border-t bg-white flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="سوالتان را بپرسید..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
            >
              ارسال
            </button>
          </div>
        </div>
      )}
    </div>
  );
}