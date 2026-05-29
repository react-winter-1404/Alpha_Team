import { motion, AnimatePresence } from "framer-motion";
import { Card, Button } from "@heroui/react";
import { useState } from "react";

// نمونه 1: یک کارت که با انیمیشن ظاهر می‌شود
const AnimatedCard = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Button onPress={() => setShow(!show)}>
        {show ? "مخفی کردن" : "نمایش"}
      </Button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="mt-4">
              
                <p>این کارت با انیمیشن ظاهر شد!</p>
              
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default AnimatedCard