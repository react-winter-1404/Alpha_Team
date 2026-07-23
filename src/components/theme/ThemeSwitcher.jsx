import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  PaintBoardIcon, 
  Sun01Icon, 
  Moon01Icon, 
  SparklesIcon, 
  FlashIcon, 
  FireIcon, 
  Leaf01Icon, 
  DropletIcon, 
  CloudLightningIcon 
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ThemeSwitcher() {
  const { t } = useTranslation("common");

  const themes = [
    { key: "default", name: t("theme.default"), subName: "Default", color: "#3772ff", icon: Sun01Icon },
    { key: "dark", name: t("theme.dark"), subName: "Dark", color: "#111827", icon: Moon01Icon },
    { key: "purple", name: t("theme.purple"), subName: "Purple", color: "#a855f7", icon: SparklesIcon },
    { key: "orange", name: t("theme.orange"), subName: "Orange", color: "#f97316", icon: FlashIcon },
    { key: "red", name: t("theme.red"), subName: "Red", color: "#ef4444", icon: FireIcon },
    { key: "green", name: t("theme.green"), subName: "Green", color: "#22c55e", icon: Leaf01Icon },
    { key: "blue", name: t("theme.blue"), subName: "Cyan", color: "#06b6d4", icon: DropletIcon },
    { key: "indigo", name: t("theme.indigo"), subName: "Indigo", color: "#6366f1", icon: CloudLightningIcon }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("theme") || "default"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const dropdownRef = useRef(null);

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

  const changeTheme = (value) => {
    if (selectedTheme === value) {
      setIsOpen(false);
      return;
    }

    setIsTransitioning(true);
    
    document.documentElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    document.documentElement.style.filter = "brightness(0.85)";
    
    setTimeout(() => {
      document.documentElement.dataset.theme = value;
      document.documentElement.style.filter = "brightness(0.95)";
      
      setTimeout(() => {
        document.documentElement.style.filter = "";
        
        setTimeout(() => {
          document.documentElement.style.transition = '';
          setIsTransitioning(false);
        }, 300);
      }, 150);
    }, 150);

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
        className={`text-xl border-solid border flex items-center justify-center bg-accent text-accent-foreground duration-500 rounded-full border-accent text-center w-10 h-10 min-w-0 hover:scale-105 transition ${
          isTransitioning ? 'pointer-events-none opacity-80' : ''
        }`}
      >
        <HugeiconsIcon icon={PaintBoardIcon} className="m-0 w-5.5 h-5.5" />
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
              className="fixed md:absolute left-4 right-4 bottom-4 md:left-0 md:right-auto md:top-full md:bottom-auto md:mt-2 md:w-56 bg-white dark:bg-[rgb(28,27,34)] border border-gray-200 dark:border-gray-700 rounded-2xl md:rounded-xl shadow-2xl z-[9999] p-2.5 max-h-[80vh] md:max-h-none overflow-y-auto md:overflow-visible pb-safe md:pb-2.5"
            >
              <div className="pb-2 mb-2 border-b border-gray-100 dark:border-gray-800 md:hidden flex justify-between items-center">
                <span className="text-xs font-bold text-foreground">{t("theme.selectTheme")}</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-muted hover:text-foreground p-1"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5">
                {themes.map((item) => {
                  const isSelected = selectedTheme === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => changeTheme(item.key)}
                      style={{
                        "--item-color": item.color,
                      }}
                      className={`w-full flex items-center justify-between p-2 md:px-3 md:py-2 text-sm transition-all rounded-xl md:rounded-lg border border-gray-100 dark:border-gray-800 group hover:border-[var(--item-color)]/40 hover:bg-[var(--item-color)]/10 ${
                        isSelected
                          ? "bg-[var(--item-color)]/15 border-[var(--item-color)]/60 shadow-xs"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-300/60 dark:border-gray-600/60 shadow-xs flex items-center justify-center flex-shrink-0"
                          style={{ 
                            background: `color-mix(in srgb, ${item.color} 15%, transparent)`,
                            color: item.color 
                          }}
                        >
                          <HugeiconsIcon icon={item.icon} className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </span>
                        <div className="flex flex-col text-right leading-tight">
                          <span className="text-xs md:text-xs font-medium text-foreground">
                            {item.name}
                          </span>
                          <span className="hidden md:block text-[10px] text-muted">
                            {item.subName}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span 
                          className="text-sm md:text-base font-bold"
                          style={{ color: item.color }}
                        >
                          ✓
                        </span>
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