import { useTranslation } from "react-i18next";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LanguageCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const languages = [
  {
    key: "fa",
    name: "فارسی",
    direction: "rtl",
  },
  {
    key: "en",
    name: "English",
    direction: "ltr",
  },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = i18n.language?.split("-")[0] || "fa";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    const selected = languages.find((item) => item.key === lng);
    document.documentElement.dir = selected.direction;
    document.documentElement.lang = lng;
    localStorage.setItem("language", lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        isIconOnly
        variant="flat"
        className="rounded-full border dark:border-gray-700 hover:scale-105 transition flex justify-center items-center "
        onClick={() => setIsOpen(!isOpen)}
      >
        <HugeiconsIcon icon={LanguageCircleIcon} className="w-5.5 h-55." />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full mt-2 z-50 min-w-[180px] bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 overflow-hidden"
            >
              {languages.map((item) => (
                <button
                  key={item.key}
                  onClick={() => changeLanguage(item.key)}
                  className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  {currentLanguage === item.key && (
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      className="w-5 h-5 text-primary"
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}