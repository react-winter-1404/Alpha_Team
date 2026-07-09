import { HugeiconsIcon } from "@hugeicons/react";
import {
  MailEdit02Icon,
  PasswordValidationIcon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

const Steps = ({ step, stepsList }) => {
  return (
    <div className="w-full h-auto flex flex-col items-center gap-4 sm:gap-6.5">
      <AnimatePresence>
        {stepsList.map((e, index) => {
          if (e.id <= step) {
            return (
              <motion.div
                key={index}
                className="w-full flex items-center gap-2 sm:gap-3"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="w-full h-auto sm:h-14.25 flex items-center gap-2 sm:gap-3">
                  <div className="h-10 w-10 sm:h-14.25 sm:w-14.25 flex justify-center items-center bg-accent text-accent-foreground rounded-full shrink-0">
                    <HugeiconsIcon
                      icon={MailEdit02Icon}
                      className="w-4 sm:w-5"
                    />
                  </div>
                  <div className="font-bold lg:text-[19.25px] md:text-[16px] sm:text-[14.5px] whitespace-nowrap text-foreground">
                    {e.describe}
                  </div>
                </div>
              </motion.div>
            );
          } else {
            return (
              <motion.div
                key={index}
                className="w-full h-auto sm:h-14.25 flex items-center gap-2 sm:gap-3"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="w-full h-auto sm:h-11 flex items-center gap-2 sm:gap-3 mr-0 sm:mr-1.5">
                  <div className="h-8 w-8 sm:h-11 sm:w-11 flex justify-center items-center bg-overlay rounded-full shrink-0">
                    <HugeiconsIcon
                      icon={PasswordValidationIcon}
                      className="w-3.5 sm:w-5 text-muted"
                    />
                  </div>
                  <div className="flex flex-col text-field-placeholder text-[11px] gap-0.5 sm:gap-0.75">
                    <div className="font-bold text-[13px] whitespace-nowrap text-muted">{e.describe}</div>
                  </div>
                </div>
              </motion.div>
            );
          }
        })}
      </AnimatePresence>
    </div>
  );
};

export default Steps;