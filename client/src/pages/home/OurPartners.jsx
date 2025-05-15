import { motion } from "framer-motion";

const OurPartners = () => {
  const transition = {
    initial: { opacity: 0, y: -10 },
    whileInView: { opacity: 1, y: 0 },
  };
  return (
    <motion.section
      {...transition}
      transition={{ duration: 1, delay: 0.5, ease: "linear" }}
      id="our-partners"
      className="bg-alt py-8"
    ></motion.section>
  );
};

export default OurPartners;
