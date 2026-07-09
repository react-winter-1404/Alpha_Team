import { motion } from "framer-motion";

const License = () => {
  const ls = [1, 2, 3, 4];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-[95%] m-auto flex flex-wrap justify-center items-center gap-2.5"
    >
      {ls.map((e) => (
        <motion.div
          key={e}
          variants={cardVariants}
          className="h-[332px] w-[90%] md:w-[20%] p-2.5 flex flex-col border-[3px] border-border rounded-[20px] bg-overlay"
        >
          <span className="block w-full text-[40px] text-foreground">
            <span className="block w-[95%] border-b border-separator m-auto">0{e}</span>
          </span>
          <span className="block mt-5 text-[24px] text-foreground">مدرک معتبر</span>
          <span className="block text-[12px] text-muted">بعدا اینجا پر میشه</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default License;