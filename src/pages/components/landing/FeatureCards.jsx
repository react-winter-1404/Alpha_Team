import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpLeft01Icon } from "@hugeicons/core-free-icons";

export default function FeatureCards() {
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
        className="relative w-[90%] mx-auto md:mx-0 md:w-[40%] h-[332px] border-[3px] rounded-[30px] text-right overflow-hidden bg-surface-secondary"
      >
        <p className="text-[32px] mr-5">پنل اختصاصی دانشجو</p>
        <p className="w-55 text-[16px] opacity-80 font-light mt-2.5 mr-5">
          پنل های اختصاصی دانشجویی برای مدیریت دوره ها و تمرین ها
        </p>
        <img
          src="/icons/Frame.png"
          alt=""
          className="absolute bottom-0 left-0"
        />
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="w-[90%] relative md:w-[30%] mx-auto md:mx-0 h-[332px] rounded-[30px] bg-[#3772FF]"
      >
        <div className="flex justify-between items-center p-5">
          <p className="mr-[20px] text-white text-[24px]">
            دوره‌های جدید تابستانه!
          </p>
          <Button className="h-[40px] w-[40px] rounded-full bg-accent-foreground p-0 flex items-center justify-center">
            <HugeiconsIcon
              icon={ArrowUpLeft01Icon}
              className="m-0 w-6 h-6 text-muted"
            />
          </Button>
        </div>
        <p className="text-[13px] text-white w-[40%] mr-5">
          شروع دوره های جدید مبتدی و پیشرفته برای همین تابستان
        </p>
        <img
          src="/icons/Group 143.png"
          alt=""
          className="absolute bottom-0 left-0 w-[50%]"
        />
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="w-[90%] md:w-[25%] mx-auto md:mx-0 h-[332px] border-[3px] rounded-[30px] bg-surface-secondary"
      >
        <div className="flex justify-between items-center p-5">
          <p className="text-[24px]">درباره ما بیشتر بخوانید</p>
          <Button className="h-[40px] w-[40px] rounded-full bg-accent p-0 flex items-center justify-center">
            <HugeiconsIcon
              icon={ArrowUpLeft01Icon}
              className="m-0 w-6 h-6 text-accent-foreground"
            />
          </Button>
        </div>

        <span className="text-[32px] mt-10 mr-2.5 block">+1000</span>
        <span className="text-[16px] mr-2.5 text-gray-500">
          دانشجوی آنلاین در دوره
        </span>

        <span className="text-[32px] mt-5 mr-2.5 block">+13</span>
        <span className="text-[16px] mr-2.5 text-gray-500">
          سال سابقه آموزش تخصصی
        </span>
      </motion.div>
    </motion.div>
  );
}