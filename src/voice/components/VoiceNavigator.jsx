import { useVoiceNavigation } from '../hooks/useVoiceNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from "@hugeicons/react";
import { Mic01Icon, StopIcon } from "@hugeicons/core-free-icons";

const VoiceNavigator = () => {
  const { listening, transcript, currentLang, toggleListening } = useVoiceNavigation();

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex items-center pointer-events-none">
      {/* متن فقط زمانی که در حال گوش دادن هستیم و ترنسکریپت وجود دارد نمایش داده می‌شود */}
      <AnimatePresence>
        {listening && transcript && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className={`pointer-events-auto ml-4 bg-overlay/90 backdrop-blur-xl border border-border text-foreground text-xs px-4 py-2.5 rounded-2xl shadow-2xl max-w-xs font-medium ${
              currentLang === 'fa' ? 'dir-rtl text-right' : 'dir-ltr text-left'
            }`}
          >
            <span className="text-muted block text-[10px] mb-0.5">
              {currentLang === 'fa' ? 'در حال تشخیص صدا...' : 'Listening...'}
            </span>
            {currentLang === 'fa' ? `«${transcript}»` : `"${transcript}"`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pointer-events-auto flex flex-col items-center group">
        {listening && (
          <>
            <span className="absolute -inset-2 rounded-full bg-danger/20 animate-ping" />
            <span className="absolute -inset-4 rounded-full bg-danger/10 animate-pulse duration-1000" />
          </>
        )}

        <button
          onClick={toggleListening}
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-xl transition-all duration-300 border cursor-pointer ${
            listening
              ? 'bg-danger text-white border-danger/50 scale-105 shadow-danger/30 rotate-3'
              : 'bg-accent text-white border-accent/30 hover:scale-105 shadow-accent/25'
          }`}
          title={currentLang === 'fa' ? 'کنترل صوتی' : 'Voice Control'}
        >
          <HugeiconsIcon 
            icon={listening ? StopIcon : Mic01Icon} 
            className={`w-6 h-6 transition-transform duration-300 ${listening ? 'scale-110 animate-bounce' : ''}`} 
          />
        </button>

        <span className="absolute top-full mt-2 text-[10px] font-semibold text-muted px-2 py-0.5 rounded-full bg-overlay/80 border border-border/50 shadow-sm opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
          {currentLang === 'fa' ? 'کنترل صوتی' : 'Voice Control'}
        </span>
      </div>
    </div>
  );
};

export default VoiceNavigator;