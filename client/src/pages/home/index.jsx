import { motion } from "framer-motion";

import Header from "./header";
import Landing from "./Landing";
import Services from "./Services";
import OurPartners from "./OurPartners";
import Contactus from "./Contactus";

import { ReactComponent as CommitmentGraphic } from "assets/commitment.svg";

const Home = () => {
  const transition = {
    initial: { opacity: 0, y: -10 },
    whileInView: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Header />
      <Landing />
      <Services />
      {/* <OurPartners /> */}
      {/* <Contactus /> */}
      <section className="bg-alt py-8">
        <motion.div
          {...transition}
          transition={{ duration: 1, delay: 0.5, ease: "linear" }}
          className="container py-8 px-4 flex flex-wrap gap-2 justify-around items-center opacity-0"
        >
          <div className="max-w-[400px]">
            <h1 className="text-primary text-3xl font-bold my-5">التزامُنا</h1>
            <p>
              تلتزم
              <span className="text-primary font-bold"> شركة معتز </span> بتقديم
              خدمات عالية الجودة تجعل من عملية الشحن تجربة سلسة وفعالة. نحن نؤمن
              بأن نجاحنا ينبع من نجاح عملائنا، ونعمل جاهدين لبناء علاقات طويلة
              الأمد قائمة على الثقة والشفافية. هدفنا هو أن نكون شريككم الموثوق
              في كل خطوة من خطوات رحلتكم التجارية بين الصين وليبيا.
            </p>
          </div>
          <div className="max-w-[400px] w-[-webkit-fill-available]">
            <CommitmentGraphic />
          </div>
        </motion.div>
      </section>
    </>
  );
};
export default Home;
