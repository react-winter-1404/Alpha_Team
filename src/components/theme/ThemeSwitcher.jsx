import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PaintBoardIcon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    key: "default",
    name: "پیش فرض",
    color: "#3772ff"
  },
  {
    key: "dark",
    name: "تاریک",
    color: "#111827"
  },
  {
    key: "purple",
    name: "بنفش",
    color: "#a855f7"
  },
  // {
  //   key: "black",
  //   name: "مشکی",
  //   color: "#111111"
  // },
  {
    key: "orange",
    name: "نارنجی",
    color: "#f97316"
  },
  {
    key: "red",
    name: "قرمز",
    color: "#ef4444"
  },
  {
    key: "green",
    name: "سبز",
    color: "#22c55e"
  },
  {
    key: "blue",
    name: "آبی",
    color: "#06b6d4"
  },
  {
    key: "indigo",
    name: "ایندیگو",
    color: "#6366f1"
  }
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("theme") || "default"
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeTheme = (value) => {
    document.documentElement.dataset.theme = value;
    localStorage.setItem("theme", value);
    setSelectedTheme(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        isIconOnly
        disableRipple
        variant="flat"
        onPress={() => setIsOpen(!isOpen)}
        className="text-xl border-solid border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 dark:border-gray-600 duration-500 rounded-full border-gray-200 text-center w-10 h-10 min-w-0 hover:scale-105 transition"
      >
        <HugeiconsIcon icon={PaintBoardIcon} className="m-0 w-5.5 h-5.5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-[rgb(28,27,34)] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-[9999] py-2"
          >
            {themes.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => changeTheme(item.key)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedTheme === item.key
                    ? "bg-gray-100 dark:bg-gray-800"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm flex-shrink-0"
                    style={{ background: item.color }}
                  />
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted">
                      Theme
                    </span>
                  </div>
                </div>

                {selectedTheme === item.key && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-accent text-lg"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}