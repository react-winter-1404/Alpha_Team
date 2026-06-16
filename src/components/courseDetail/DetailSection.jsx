
import { HugeiconsIcon } from "@hugeicons/react";
import {
  StarIcon,
  StarCircleIcon,
} from "@hugeicons/core-free-icons";
import CourseComments from "./CourseComments";

const DetailSection = ({courseId,imageAddress,teacherId,teacherName,miniDescribe,describe,title}) => {
  return (
    <div className=" border border-black w-full lg:w-[54.5%]  flex flex-col ">
      <img
        src={imageAddress}
        alt=""
        className=" bg-danger-hover w-full h-106.5 rounded-3xl"
      />
      <div className=" w-full flex flex-col gap-3 lg:gap-5 mt-5 lg:mt-7  ">
        <div className=" text-muted ">مدرس</div>
        <div className=" w-full flex gap-1.5 ">
          <div className=" flex items-center gap-4 w-[40%] ">
            <img
              src=""
              alt=""
              className=" bg-border w-12 h-12 lg:w-14 lg:h-14 rounded-full "
            />
            <div className=" flex flex-col ">
              <div className=" font-bold text-sm lg:text-lg ">
               {teacherName}
              </div>
              <div className=" text-xs lg:text-[16px] text-muted ">
                سنیور فرانت اند
              </div>
            </div>
          </div>
          <div className=" flex items-center gap-4 w-[40%] ">
            <img
              src=""
              alt=""
              className=" bg-border w-12 h-12 lg:w-14 lg:h-14 rounded-full "
            />
            <div className=" flex flex-col ">
              <div className=" font-bold text-sm lg:text-lg ">
                محسن اسفندیاری
              </div>
              <div className=" text-xs lg:text-[16px] text-muted ">
                سنیور فرانت اند
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-col gap-3 lg:gap-5 mt-6 lg:mt-9  ">
        <div className=" text-muted ">توضیحات</div>
        <div className=" flex flex-col gap-3 lg:gap-5 ">
          <div className=" font-bold text-lg lg:text-2xl ">{miniDescribe}</div>
          <div className=" lg:text-xl ">{describe}</div>
        </div>
        {/* <div className=" flex flex-col gap-3 lg:gap-6 mt-4 ">
          <div className=" font-bold text-lg lg:text-2xl ">
            ویژگی های کلیدی ری اکت چیست؟
          </div>
          <div className=" lg:text-xl ">
            1. کامپوننت‌محور: ری‌اکت بر اساس مفهوم کامپوننت‌ها کار می‌کند. هر
            کامپوننت می‌تواند مستقل باشد و دارای حالت (state) و ویژگی‌ها (props)
            باشد که باعث می‌شود کد قابل استفاده مجدد و سازمان‌یافته‌تر شود.
          </div>
          <div className=" lg:text-xl ">
            2. مجازی‌سازی DOM: ری‌اکت از یک DOM مجازی استفاده می‌کند که باعث
            افزایش سرعت و کارایی در بروزرسانی رابط کاربری می‌شود. به جای اینکه
            هر بار کل DOM را به‌روزرسانی کند، فقط بخش‌هایی که تغییر کرده‌اند را
            به‌روزرسانی می‌کند.
          </div>
          <div className=" lg:text-xl ">
            3. یک‌طرفه بودن داده‌ها: داده‌ها در ری‌اکت به صورت یک‌طرفه از والد
            به فرزند منتقل می‌شوند. این موضوع باعث می‌شود که مدیریت وضعیت در
            برنامه‌ها ساده‌تر و قابل پیش‌بینی‌تر شود.
          </div>
          <div className=" lg:text-xl ">
            4. جامعه بزرگ و اکوسیستم غنی: ری‌اکت دارای یک جامعه بزرگ از
            توسعه‌دهندگان است و ابزارها و کتابخانه‌های متعددی برای تسهیل توسعه
            در دسترس است، از جمله React Router برای مسیریابی و Redux برای مدیریت
            وضعیت.
          </div>
          <div className=" lg:text-xl ">
            5. سازگاری با سایر فناوری‌ها: ری‌اکت می‌تواند با سایر کتابخانه‌ها و
            فریم‌ورک‌ها مانند Angular یا Vue.js ترکیب شود و این انعطاف‌پذیری به
            توسعه‌دهندگان اجازه می‌دهد که از بهترین ابزارها بهره ببرند.
          </div>
        </div> */}
        {/* <div className=" lg:text-xl mt-3 ">
          با توجه به این ویژگی‌ها، ری‌اکت به یکی از محبوب‌ترین انتخاب‌ها برای
          توسعه وب اپلیکیشن‌های مدرن تبدیل شده است. اگر شما هم به دنبال یادگیری
          ری‌اکت هستید، می‌توانید با منابع آموزشی متنوعی که در دسترس است شروع
          کنید و مهارت‌های خود را در این زمینه تقویت کنید
        </div> */}
        <div className=" h-10 border border-black mt-5 flex items-center gap-1.5 lg:gap-3 ">
          <HugeiconsIcon
            icon={StarCircleIcon}
            className=" text-accent w-5 h-5 lg:w-6 lg:h-6 "
          />
          <div className=" lg:text-xl font-bold ">امتیاز بدید</div>
          <div className=" flex gap-1 mx-2 text-yellow-400 ">
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
            <HugeiconsIcon
              icon={StarIcon}
              className=" w-5 h-5 lg:w-6 lg:h-6 "
            />
          </div>
        </div>
      </div>
      <CourseComments courseId={courseId} courseTitle={title} />
    </div>
  );
};

export default DetailSection;
