import { useTranslation } from "react-i18next";
import { Button } from "@heroui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LanguageCircleIcon,
  CheckmarkCircle02Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const languages = [
  { key: "fa", name: "فارسی", subName: "Persian", direction: "rtl", icon: Globe02Icon },
  { key: "en", name: "English", subName: "English", direction: "ltr", icon: Globe02Icon },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = i18n.language?.split("-")[0] || "fa";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    const selected = languages.find((item) => item.key === lng);
    document.documentElement.dir = selected.direction;
    document.documentElement.lang = lng;
    localStorage.setItem("language", lng);
    window.dispatchEvent(new Event("storage"));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        isIconOnly
        disableRipple
        variant="flat"
        onPress={() => setIsOpen(!isOpen)}
        className="text-xl border-solid border flex items-center justify-center bg-accent text-accent-foreground duration-500 rounded-full border-accent text-center w-10 h-10 min-w-0 hover:scale-105 transition"
      >
        <HugeiconsIcon icon={LanguageCircleIcon} className="m-0 w-5.5 h-5.5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[9998] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="fixed md:absolute left-4 right-4 bottom-4 md:left-0 md:right-auto md:top-full md:bottom-auto md:mt-2 md:w-52 bg-white dark:bg-[rgb(28,27,34)] border border-gray-200 dark:border-gray-700 rounded-2xl md:rounded-xl shadow-2xl z-[9999] p-2.5 max-h-[80vh] md:max-h-none overflow-y-auto md:overflow-visible pb-safe md:pb-2.5"
            >
              <div className="pb-2 mb-2 border-b border-gray-100 dark:border-gray-800 md:hidden flex justify-between items-center">
                <span className="text-xs font-bold text-foreground">انتخاب زبان</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-muted hover:text-foreground p-1"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                {languages.map((item) => {
                  const isSelected = currentLanguage === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => changeLanguage(item.key)}
                      style={{
                        "--item-color": "var(--color-accent, #3772ff)",
                      }}
                      className={`w-full flex items-center justify-between p-2 md:px-3 md:py-2 text-sm transition-all rounded-xl md:rounded-lg border border-gray-100 dark:border-gray-800 group hover:border-accent/40 hover:bg-accent/10 ${
                        isSelected
                          ? "bg-accent/15 border-accent/60 shadow-xs"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-300/60 dark:border-gray-600/60 shadow-xs flex items-center justify-center flex-shrink-0 bg-accent/15 text-accent"
                        >
                          <HugeiconsIcon icon={item.icon} className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </span>
                        <div className="flex flex-col text-right leading-tight">
                          <span className="text-xs md:text-sm font-medium text-foreground">
                            {item.name}
                          </span>
                          <span className="hidden md:block text-[10px] text-muted">
                            {item.subName}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          className="w-4 h-4 md:w-5 md:h-5 text-accent"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}