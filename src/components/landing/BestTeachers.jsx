import { useEffect, useState } from "react";
import { Teachers } from "../../core/services/landing/get";
import { useTranslation } from "react-i18next";
import sadatiImg from "../../assets/Courses/photo_2026-07-26_14-38-56.jpg";
import bahrImg from "../../assets/Courses/photo_2026-07-26_14-39-16.jpg";
import parsa from "../../assets/Courses/teachers-icon-18094.png"

const BestTeachers = () => {
  const { t } = useTranslation("home");
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        const response = await Teachers({ pageNumber: 1, rowsOfPage: 8 });
        setCourse(response.data.news);
        console.log("دیتای دریافتی از سمت سرور", response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="m-auto w-[95%] mt-15">
      <div className="m-auto w-full text-center mb-[80px]">
        <span className="block text-[28px] md:text-[40px] text-foreground">
          {t("bestTeachers.title")}
        </span>
        <span className="block text-[14px] md:text-[20px] text-muted">
          {t("bestTeachers.subtitle")}
        </span>
      </div>

      <div className="flex flex-wrap justify-center items-end gap-[100px] ">
        {isLoading ? (
          <p className="text-foreground">{t("bestTeachers.loading")}</p>
        ) : (
          <>
            <div className="relative border-4 border-border bg-overlay h-[297px] w-[90%] md:w-[20%] flex flex-col items-center gap-2 rounded-[24px] text-center">
              <div className="absolute h-[64px] w-[64px] bg-muted rounded-full top-[-32px] overflow-hidden">
                <img
                  src={sadatiImg}
                  alt="محمدرضا ساداتی"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className="mt-[50px] block text-[20px] md:text-[24px] text-foreground">
                محمد رضا ساداتی 
              </span>
              <span className="block text-[14px] md:text-[16px] text-muted">
                مهندس نرم افزار  
              </span>

              <span className="block text-[32px] md:text-[36px] text-accent">
                4.3🥈
              </span>

              <p className="mx-auto w-[90%] h-[39px] text-[14px] text-muted overflow-hidden align-middle">
              مهندس محمدرضا ساداتی بهترین مهندس نرم افزار مازندران که سابقه کار با شرکت های اروپایی
              و آمریکایی را به عنوان تیم لید در رزومه خود دارد
                </p>

              <button className="cursor-pointer mx-auto w-[90%] h-[40px] text-[20px] text-accent-foreground rounded-[65px] bg-accent">
                {t("bestTeachers.teacherPage")}
              </button>
            </div>

            <div className="relative border-4 border-accent bg-overlay h-[341px] w-[90%] md:w-[25%] flex flex-col items-center gap-2 rounded-[32px] text-center">
              <div className="absolute border-4 border-accent h-[88px] w-[88px] bg-muted rounded-full top-[-44px] overflow-hidden">
                <img
                  src={bahrImg}
                  alt="محمدحسین بحرالعلومی"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className="mt-[50px] block text-[20px] md:text-[24px] text-foreground">
                محمدحسین بحرالعلومی
              </span>
              <span className="block text-[14px] md:text-[16px] text-muted">
                دکتری هوش مصنوعی
              </span>

              <span className="block text-[32px] md:text-[36px] text-accent">
                4.5🥇
              </span>

              <p className="mx-auto w-[90%] h-[39px] text-[14px] text-muted align-middle overflow-hidden">
           دکتر بحرالعلومی بهترین استاد حوزه کامپیوتر و هوش مصنوعی مازندران
                که سابقه تدریس در دانشگاه های بزرگ کشور مانند دانشگاه نوشیروانی را دارد
              
              </p>

              <button className="cursor-pointer mx-auto mt-[20px] w-[90%] h-[50px] text-[20px] text-accent-foreground rounded-[65px] bg-accent">
                {t("bestTeachers.teacherPage")}
              </button>
            </div>

            <div className="relative border-4 border-border bg-overlay h-[297px] w-[90%] md:w-[20%] flex flex-col items-center gap-2 rounded-[24px] text-center">
              <div className="absolute h-[64px] w-[64px] bg-muted rounded-full top-[-32px] overflow-hidden">
                <img
                  src={parsa}
                  alt="پارسا آقایی"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className="mt-[50px] block text-[20px] md:text-[24px] text-foreground">
               پارسا آقایی
              </span>
              <span className="block text-[14px] md:text-[16px] text-muted">
               سنیور فرانت اند
              </span>

              <span className="block text-[32px] md:text-[36px] text-accent">
                4.2🥉
              </span>

              <p className="mx-auto w-[90%] h-[39px] text-[14px] text-muted overflow-hidden align-middle">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>

              <button className="cursor-pointer mx-auto w-[90%] h-[40px] text-[20px] text-accent-foreground rounded-[65px] bg-accent">
                {t("bestTeachers.teacherPage")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BestTeachers;