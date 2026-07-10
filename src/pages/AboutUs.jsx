import Footer from "../components/landing/Footer";
import NavbarHeader from "../components/landing/NavbarHeader";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
  const { t } = useTranslation("miniPages");

  return (
    <div className="w-full flex flex-col items-center bg-overlay">
      <NavbarHeader />
      <div className="w-[85%] md:w-[70%] flex items-center gap-3 md:gap-5 pt-10 my-2 md:my-5">
        <div className="w-full flex flex-col items-start gap-2 md:gap-5">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
            {t("aboutUs.title")}
          </div>
          <div className="max-w-120 text-sm sm:text-lg lg:text-xl text-muted">
            {t("aboutUs.intro")}
          </div>
        </div>
        <img
          src="/public/images/aboutUsIntro.png"
          alt=""
          className="w-full"
        />
      </div>
      <div className="w-[85%] md:w-[70%] flex flex-col items-center gap-5 pt-10 my-2 md:my-5">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
          {t("aboutUs.goalTitle")}
        </div>
        <div className="text-center text-sm sm:text-lg lg:text-xl text-muted">
          {t("aboutUs.goalText1")}
        </div>
        <div className="text-center text-sm sm:text-lg lg:text-xl text-muted">
          {t("aboutUs.goalText2")}
        </div>
      </div>
      <div className="w-[85%] md:w-[80%] flex flex-col items-center gap-3 md:gap-10 pt-5 md:pt-10 my-2 md:my-5">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          {t("aboutUs.activitiesTitle")}
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center">
          <img
            src="/public/images/Group 143.png"
            alt=""
            className="min-w-40 w-[50%]"
          />
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">
              {t("aboutUs.onlineLearning")}
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              {t("aboutUs.onlineLearningText1")}
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              {t("aboutUs.onlineLearningText2")}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-5">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="w-full flex sm:justify-end">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">
                {t("aboutUs.workshops")}
              </div>
            </div>

            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              {t("aboutUs.workshopsText1")}
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              {t("aboutUs.workshopsText2")}
            </div>
          </div>
          <div className="p-3 w-[65%] min-w-35 flex justify-center max-h-40 sm:max-h-60">
            <img
              src="/public/images/christopher-gower.png"
              alt=""
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 sm:flex-row justify-between items-center">
          <div className="p-3 w-[65%] min-w-35 flex justify-center max-h-40 sm:max-h-60">
            <img
              src="/public/images/markus-winkler.png"
              alt=""
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">
              {t("aboutUs.news")}
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              {t("aboutUs.newsText1")}
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              {t("aboutUs.newsText2")}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;