import Box from "components/Box";
import { motion } from "framer-motion";

const Services = () => {
  const transition = {
    initial: { opacity: 0, y: -10 },
    whileInView: { opacity: 1, y: 0 },
  };
  return (
    <motion.section
      {...transition}
      transition={{ duration: 1, delay: 0.5, ease: "linear" }}
      id="services"
      className="py-8 bg-alt"
    >
      <div className="container p-4">
        <h1 className="text-primary text-center text-3xl font-bold py-2">
          خدماتنا
        </h1>
        <h2 className="text-primary text-center sm:text-right text-2xl font-bold py-2 px-4 my-5">
          خدمات الشحن البحري والجوي
        </h2>
        <div className="flex justify-around flex-wrap gap-5">
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                الشحن البحري
              </div>
              <p>
                نقل البضائع باستخدام الحاويات الكاملة (FCL) أو الشحن الجزئي
                (LCL) حسب احتياجات العميل. توفير خطط شحن مرنة تتناسب مع نوع
                البضائع وأحجامها. ضمان السلامة الكاملة للبضائع أثناء النقل.
              </p>
            </div>
          </Box>
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                الشحن الجوي
              </div>
              <p>
                شحن سريع للبضائع الحساسة للوقت. خدمات مخصصة للبضائع الصغيرة أو
                ذات القيمة العالية. خيارات تسليم من الباب إلى الباب لتوفير
                الراحة للعملاء.
              </p>
            </div>
          </Box>
        </div>

        <h2 className="text-primary text-center sm:text-right text-2xl font-bold py-2 px-4 my-5">
          الخدمات اللوجستية
        </h2>
        <div className="flex justify-around flex-wrap gap-5">
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                إدارة التخزين
              </div>
              <p>
                توفير حلول تخزين آمنة ومجهزة لتخزين البضائع قبل الشحن أو بعده.
                تنظيم البضائع لتسهيل عمليات الشحن والتوزيع.
              </p>
            </div>
          </Box>
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                خدمات النقل الداخلي
              </div>
              <p>
                ترتيب النقل داخل الصين لنقل البضائع من الموردين إلى موانئ الشحن.
                ضمان سرعة وكفاءة النقل بفضل شراكتنا مع شركات النقل المحلية
                الموثوقة.
              </p>
            </div>
          </Box>
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                إدارة التخليص الجمركي
              </div>
              <p>
                إعداد كافة المستندات المطلوبة لتخليص البضائع من الجمارك بسهولة.
                التأكد من الالتزام بالقوانين الجمركية في الصين وليبيا.
              </p>
            </div>
          </Box>
        </div>

        <h2 className="text-primary text-center sm:text-right text-2xl font-bold py-2 px-4 my-5">
          حلول مبتكرة وخدمات مضافة
        </h2>
        <div className="flex justify-around flex-wrap gap-5">
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                تتبع الشحنات
              </div>
              <p>نظام متقدم يسمح للعملاء بمراقبة حالة شحناتهم خطوة بخطوة.</p>
            </div>
          </Box>
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                تغليف احترافي
              </div>
              <p>خدمات تغليف متخصصة لضمان حماية البضائع أثناء الشحن.</p>
            </div>
          </Box>
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                إدارة المخاطر
              </div>
              <p>
                تقديم خدمات التأمين على البضائع لحمايتها من أي أضرار غير متوقعة
                أثناء النقل.
              </p>
            </div>
          </Box>
        </div>

        <h2 className="text-primary text-center sm:text-right text-2xl font-bold py-2 px-4 my-5">
          خدمات أخرى
        </h2>
        <div className="flex justify-around flex-wrap gap-5">
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                الاستشارات التجارية والدعم
              </div>
              <p>
                تقديم استشارات متخصصة حول أفضل خيارات الشحن المناسبة للبضائع.
                إرشاد العملاء حول متطلبات الجمارك والوثائق الضرورية. توفير خدمات
                مخصصة لتقييم تكاليف الشحن ووضع خطط ملائمة.
              </p>
            </div>
          </Box>
          <Box bg="200">
            <div className="min-w-[200px] max-w-[300px] text-center flex flex-col justify-center gap-4 h-full">
              <div className="text-primary text-2xl my-2 font-bold">
                خدمة العملاء
              </div>
              <p>
                فريق عمل متفانٍ يتمتع بخبرة واسعة في مجال الشحن واللوجستيات. دعم
                متواصل لضمان تلبية كافة استفسارات العملاء وحل المشكلات بأسرع وقت
                ممكن.
              </p>
            </div>
          </Box>
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
