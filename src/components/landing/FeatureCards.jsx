import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpLeft01Icon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";

export default function FeatureCards() {
  const { t } = useTranslation("home");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.45,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-wrap md:justify-center items-center gap-7.5 w-[90%] my-12.5 mx-auto"
    >
      <motion.div
        variants={cardVariants}
        className="relative w-[90%] mx-auto md:mx-0 md:w-[40%] h-[332px] border-[3px] border-border rounded-[30px] text-right overflow-hidden bg-surface-secondary"
      >
        <p className="text-[32px] mr-5 text-foreground">{t("features.studentPanel")}</p>
        <p className="w-55 text-[16px] font-light mt-2.5 mr-5 text-muted">
          {t("features.studentPanelDesc")}
        </p>
        <img
          src="/icons/Frame.png"
          alt=""
          className="absolute bottom-0 left-0"
        />
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="w-[90%] relative md:w-[30%] mx-auto md:mx-0 h-[332px] rounded-[30px] bg-accent"
      >
        <div className="flex justify-between items-center p-5">
          <p className="mr-[20px] text-accent-foreground text-[24px]">
            {t("features.summerCourses")}
          </p>
          <Button className="h-[40px] w-[40px] rounded-full bg-background p-0 flex items-center justify-center">
            <HugeiconsIcon
              icon={ArrowUpLeft01Icon}
              className="m-0 w-6 h-6 text-foreground"
            />
          </Button>
        </div>
        <p className="text-[13px] text-accent-foreground w-[40%] mr-5">
          {t("features.summerCoursesDesc")}
        </p>
        <img
          src="/icons/Group 143.png"
          alt=""
          className="absolute bottom-0 left-0 w-[50%]"
        />
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="w-[90%] md:w-[25%] mx-auto md:mx-0 h-[332px] border-[3px] border-border rounded-[30px] bg-surface-secondary"
      >
        <div className="flex justify-between items-center p-5">
          <p className="text-[24px] text-foreground">{t("features.aboutUs")}</p>
          <Button className="h-[40px] w-[40px] rounded-full bg-accent p-0 flex items-center justify-center">
            <HugeiconsIcon
              icon={ArrowUpLeft01Icon}
              className="m-0 w-6 h-6 text-accent-foreground"
            />
          </Button>
        </div>

        <span className="text-[32px] mt-10 mr-2.5 block text-foreground">+1000</span>
        <span className="text-[16px] mr-2.5 text-muted">
          {t("features.onlineStudents")}
        </span>

        <span className="text-[32px] mt-5 mr-2.5 block text-foreground">+13</span>
        <span className="text-[16px] mr-2.5 text-muted">
          {t("features.experienceYears")}
        </span>
      </motion.div>
    </motion.div>
  );
}