import { motion } from "framer-motion";
import { Button, Chip } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ThirdBracketCircleIcon } from "@hugeicons/core-free-icons";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="my-10 mx-auto w-[90%] md:w-3/5 text-center"
    >
      <div className="items-center justify-center flex flex-wrap gap-5 my-5 text-[33px] md:text-[40px] lg:text-[48px] text-foreground">
        <p>تجربه‌ای بی‌نظیر در یادگیری</p>
        <Chip
          isIconOnly
          disableRipple
          variant="flat"
          className="hidden text-xl w-12 h-12 rounded-full md:flex justify-center items-center text-center shadow-xl"
        >
          <HugeiconsIcon
            icon={ThirdBracketCircleIcon}
            className="m-0 w-8 h-8 text-muted"
          />
        </Chip>
        <p>کدنویسی؛</p>
      </div>
      <p className="text-[33px] md:text-[48px] my-5 text-foreground">
        از <span className="text-accent">مبتدی</span> تا{" "}
        <span className="text-danger">حرفه ای</span> !
      </p>
      <p className="text-[16px] md:text-[20px] w-[80%] mx-auto text-muted my-5">
        آکادمی فوق تخصصی کدنویسی و برنامه‌نویسی از سنین کودکی تا بزرگسالی
      </p>
      <Button
        color="primary"
        radius="full"
        size="lg"
        disableRipple
        className="my-5 px-2 text-[16px] md:text-[20px] bg-accent text-accent-foreground w-[140px] h-[40px] md:w-43 md:h-14 rounded-4xl"
      >
        شروع یادگیری
      </Button>
    </motion.section>
  );
};

export default Hero;