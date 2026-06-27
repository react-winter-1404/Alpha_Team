import { useEffect, useState } from "react";
import { Teachers } from "../../core/services/landing/get";

const BestTeachers = () => {
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
        <span className="block text-[28px] md:text-[40px]">
          برترین اساتید هفته
        </span>
        <span className="block text-[14px] md:text-[20px]">
          اساتیدی که با نظرسنجی در دوره ها به انها بیشترین رای مثبت را دادند
        </span>
      </div>

      <div className="flex flex-wrap justify-center items-end gap-[100px] ">
        {isLoading ? (
          <p>در حال فراخوانی...</p>
        ) : (
          <>
            <div className="relative border-4 border bg-overlay dark:bg-surface-secondary h-[297px] w-[90%] md:w-[20%] flex flex-col items-center gap-2 rounded-[24px] text-center">
              <div className="absolute h-[64px] w-[64px] bg-[#787878] rounded-full top-[-32px] "></div>

              <span className="mt-[50px] block text-[20px] md:text-[24px] text-[#272727] dark:text-white">
                محمدحسین بحرالعلومی
              </span>
              <span className="block text-[14px] md:text-[16px] text-[#787878] dark:text-[#d8d5d5]">
                دکتری هوش مصنوعی
              </span>

              <span className="block text-[32px] md:text-[36px] text-[#3772ff]">
                4.2🥈
              </span>

              <p className="mx-auto w-[90%] h-[39px] text-[14px] text-[#787878] dark:text-[#d8d5d5] overflow-hidden align-middle">
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

              <button className="cursor-pointer mx-auto w-[90%] h-[40px] text-[20px] text-[#fefdff] rounded-[65px] bg-[#3772ff]">
                صفحه استاد
              </button>
            </div>

            <div className="relative border-4 border-accent bg-overlay dark:bg-surface-secondary h-[341px] w-[90%] md:w-[25%] flex flex-col items-center gap-2 rounded-[32px] text-center">
              <div className="absolute border-4 border-accent h-[88px] w-[88px] bg-[#787878] rounded-full top-[-44px] "></div>

              <span className="mt-[50px] block text-[20px] md:text-[24px]  ">
                محمدحسین بحرالعلومی
              </span>
              <span className="block text-[14px] md:text-[16px] text-[#787878] dark:text-[#d8d5d5]">
                دکتری هوش مصنوعی
              </span>

              <span className="block text-[32px] md:text-[36px] text-[#3772ff]">
                4.2🥇
              </span>

              <p className="mx-auto w-[90%] h-[39px] text-[14px] text-[#787878] align-middle overflow-hidden dark:text-[#d8d5d5]">
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

              <button className="cursor-pointer mx-auto mt-[20px] w-[90%] h-[50px] text-[20px] text-[#fefdff] rounded-[65px] bg-[#3772ff]">
                صفحه استاد
              </button>
            </div>

            <div className="relative border-4 border bg-overlay dark:bg-surface-secondary dark:text-[#ece8e8] h-[297px] w-[90%] md:w-[20%] flex flex-col items-center gap-2 rounded-[24px] text-center">
              <div className="absolute h-[64px] w-[64px] bg-[#787878] rounded-full top-[-32px] "></div>

              <span className="mt-[50px] block text-[20px] md:text-[24px] text-[#272727] dark:text-white">
                محمدحسین بحرالعلومی
              </span>
              <span className="block text-[14px] md:text-[16px] text-[#787878] dark:text-[#d8d5d5]">
                دکتری هوش مصنوعی
              </span>

              <span className="block text-[32px] md:text-[36px] text-[#3772ff]">
                4.2🥉
              </span>

              <p className="mx-auto w-[90%] h-[39px] text-[14px] text-[#787878] dark:text-[#d8d5d5] overflow-hidden align-middle">
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

              <button className="cursor-pointer mx-auto w-[90%] h-[40px] text-[20px] text-[#fefdff] rounded-[65px] bg-[#3772ff]">
                صفحه استاد
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BestTeachers;
