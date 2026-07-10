import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation("home");

  return (
    <div className="relative mb-10 mt-5 h-37">
      <div className="absolute top-[28%] right-[-5%] h-16 w-[110%] flex items-center gap-4 bg-accent text-accent-foreground -rotate-4 lg:-rotate-3 text-center overflow-hidden">
        <div className="whitespace-nowrap">{t("banner.text")}</div>
        <div className="w-1 h-1 p-0.5 border border-accent-foreground bg-accent-foreground rounded-full mt-2"></div>
        <div className="whitespace-nowrap">{t("banner.text")}</div>
        <div className="w-1 h-1 p-0.5 border border-accent-foreground bg-accent-foreground rounded-full mt-2"></div>
        <div className="whitespace-nowrap">{t("banner.text")}</div>
        <div className="w-1 h-1 p-0.5 border border-accent-foreground bg-accent-foreground rounded-full mt-2"></div>
        <div className="whitespace-nowrap">{t("banner.text")}</div>
        <div className="w-1 h-1 p-0.5 border border-accent-foreground bg-accent-foreground rounded-full mt-2"></div>
        <div className="whitespace-nowrap">{t("banner.text")}</div>
        <div className="w-1 h-1 p-0.5 border border-accent-foreground bg-accent-foreground rounded-full mt-2"></div>
        <div className="whitespace-nowrap">{t("banner.text")}</div>
        <div className="w-1 h-1 p-0.5 border border-accent-foreground bg-accent-foreground rounded-full mt-2"></div>
        <div className="whitespace-nowrap">{t("banner.text")}</div>
      </div>
    </div>
  );
};

export default Banner;