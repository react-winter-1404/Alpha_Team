import { motion } from "framer-motion";
import Footer from "../components/landing/Footer";
import NavbarHeader from "../components/landing/NavbarHeader";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Call02Icon,
  Mail02Icon,
  YoutubeIcon,
  Facebook02Icon,
  TwitterIcon,
  InstagramIcon,
  TelegramIcon,
} from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const iconContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const infoBoxVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.3 },
  },
};

const ContactUsPage = () => {
  const { t } = useTranslation("miniPages");

  return (
    <div className="w-full flex flex-col bg-overlay" style={{ direction: "rtl" }}>
      <NavbarHeader />

      <motion.div
        className="flex flex-col items-center pt-10"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          {t("contactUs.title")}
        </div>
        <div className="my-2 md:my-5 text-sm sm:text-lg lg:text-xl text-muted">
          {t("contactUs.subtitle")}
        </div>

        <div className="flex my-8 md:my-15 gap-8 md:gap-11 lg:gap-14">
          <div className="flex flex-col gap-5 md:gap-8 lg:gap-10">
            <div className="text-sm sm:text-lg lg:text-xl font-bold text-foreground">
              {t("contactUs.communication")}
            </div>
            <motion.div
              className="flex gap-3 md:gap-4.5 lg:gap-6"
              variants={iconContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={iconVariants}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-accent/20 text-accent cursor-pointer hover:bg-accent hover:text-accent-foreground duration-150"
              >
                <HugeiconsIcon
                  icon={Call02Icon}
                  size={24}
                  strokeWidth={1.5}
                  fill="currentColor"
                />
              </motion.div>
              <motion.div
                variants={iconVariants}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-accent/20 text-accent cursor-pointer hover:bg-accent hover:text-accent-foreground duration-150"
              >
                <HugeiconsIcon icon={Mail02Icon} />
              </motion.div>
            </motion.div>
          </div>

          <div className="border border-separator"></div>

          <div className="flex flex-col gap-5 md:gap-8 lg:gap-10">
            <div className="text-sm sm:text-lg lg:text-xl font-bold text-foreground">
              {t("contactUs.socialMedia")}
            </div>
            <motion.div
              className="flex gap-3 md:gap-4.5 lg:gap-6"
              variants={iconContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={iconVariants}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-accent/20 text-accent cursor-pointer hover:bg-accent hover:text-accent-foreground duration-150"
              >
                <HugeiconsIcon icon={YoutubeIcon} />
              </motion.div>
              <motion.div
                variants={iconVariants}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-accent/20 text-accent cursor-pointer hover:bg-accent hover:text-accent-foreground duration-150"
              >
                <HugeiconsIcon icon={Facebook02Icon} fill="currentColor" />
              </motion.div>
              <motion.div
                variants={iconVariants}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-accent/20 text-accent cursor-pointer hover:bg-accent hover:text-accent-foreground duration-150"
              >
                <HugeiconsIcon icon={TwitterIcon} fill="currentColor" />
              </motion.div>
              <motion.div
                variants={iconVariants}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-accent/20 text-accent cursor-pointer hover:bg-accent hover:text-accent-foreground duration-150"
              >
                <HugeiconsIcon icon={InstagramIcon} />
              </motion.div>
              <motion.div
                variants={iconVariants}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center rounded-md bg-accent/20 text-accent cursor-pointer hover:bg-accent hover:text-accent-foreground duration-150"
              >
                <HugeiconsIcon icon={TelegramIcon} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="w-[82%] my-5 md:my-10 py-7 px-15 flex flex-col gap-3 md:gap-5 rounded-2xl bg-surface-secondary shadow-lg"
          variants={infoBoxVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-1.5 md:gap-3">
            <div className="sm:text-xl lg:text-2xl font-bold text-accent">
              {t("contactUs.officePhone")}
            </div>
            <div className="text-xs sm:text-lg lg:text-xl text-foreground">
              {t("contactUs.phone")}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 md:gap-3">
            <div className="sm:text-xl lg:text-xl font-bold text-accent">
              {t("contactUs.officeAddress")}
            </div>
            <div className="text-xs sm:text-lg lg:text-xl text-foreground">
              {t("contactUs.address")}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ContactUsPage;