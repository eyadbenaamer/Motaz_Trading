import { motion } from "framer-motion";

import { useWindowWidth } from "hooks/useWindowWidth";

import landingImage from "assets/main.jpeg";
import landingImageExpanded from "assets/main_expanded.png";
import { ReactComponent as LandingGraphic } from "assets/landing.svg";

const Landing = () => {
  const windowWidth = useWindowWidth();

  const transition = {
    initial: { opacity: 0, y: -10 },
    whileInView: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${
            windowWidth <= 768 ? landingImage : landingImageExpanded
          })`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-[calc(100svh-60px)] flex flex-col items-center justify-start sm:justify-center pt-16 sm:items-start sm:ps-6"
      >
        <div className="container sm:-translate-y-16">
          <motion.h1
            {...transition}
            transition={{ duration: 1.5, delay: 0.5, ease: "linear" }}
            className="ps-2 text-primary text-4xl font-bold py-2 text-shadow"
          >
            شركة معتز للشحن واللوجستيات
          </motion.h1>

          <motion.h2
            {...transition}
            transition={{ duration: 1, delay: 1, ease: "linear" }}
            className="ps-2 text-white text-3xl font-bold py-2 text-shadow"
          >
            خبرة موثوقية وتميز
          </motion.h2>
        </div>
      </section>
      <motion.div
        {...transition}
        transition={{ duration: 1, delay: 0.5, ease: "linear" }}
        className="container py-8 px-4 flex flex-wrap gap-2 justify-around items-center opacity-0"
      >
        <div className="max-w-[400px] w-[-webkit-fill-available]">
          <LandingGraphic />
        </div>
        <div className="max-w-[400px]">
          <span className="text-2xl text-primary font-bold">شركة معتز</span>{" "}
          متخصصة في تقديم خدمات شحن البضائع من الصين إلى ليبيا، حيث تهدف إلى
          تسهيل عمليات الاستيراد والتصدير من خلال حلول شاملة تغطي كافة الجوانب
          المتعلقة بالشحن واللوجستيات. نحن نفخر بتقديم خدمات متكاملة تلبي
          احتياجات العملاء بمختلف القطاعات، مع التركيز على الجودة، السرعة،
          والدقة في المواعيد.
        </div>
      </motion.div>
    </>
  );
};

export default Landing;
