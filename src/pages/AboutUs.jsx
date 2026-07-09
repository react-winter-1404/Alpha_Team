import Footer from "../components/landing/Footer";
import NavbarHeader from "../components/landing/NavbarHeader";

const AboutUsPage = () => {
  return (
    <div className="w-full flex flex-col items-center bg-overlay">
      <NavbarHeader />
      <div className="w-[85%] md:w-[70%] flex items-center gap-3 md:gap-5 pt-10 my-2 md:my-5">
        <div className="w-full flex flex-col items-start gap-2 md:gap-5">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
            درباره ما
          </div>
          <div className="max-w-120 text-sm sm:text-lg lg:text-xl text-muted">
            +13 سال سابقه فعالیت در زمینه آموزش کدنویسی از سنین کودکی تا
            بزرگسال. هدف ما همیشه این بوده که دانشجویان را با مهارت های لازم
            برای موفقیت در دنیای فناوری و برنامه نویسی مجهز کنیم.
          </div>
        </div>
        <img
          src="/public/images/aboutUsIntro.png"
          alt=""
          className="w-full"
        />
      </div>
      <div className="w-[85%] md:w-[70%] flex flex-col items-center gap-5 pt-10 my-2 md:my-5">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
          هدف ما در اکادمی بحر
        </div>
        <div className="text-center text-sm sm:text-lg lg:text-xl text-muted">
          ما به عنوان یک وبسایت آموزشی سعی داریم به همه شما عزیزان فارسی زبان
          کمک کنیم که در این دنیای بی کران از زبان ها و فریمورک‌ها و ابزارهای
          مختلف برنامه نویسی مسیر فعالیت خود را پیدا کنید و همچنین سعی داریم در
          این مسیر همراه شما باشیم تا این قابلیت را بدست بیاورید که از دانش کسب
          شد در کسب و کار خود یا برای استخدام در شرکتی که قصد فعالیت در آن را
          دارید استفاده کنید . هدف ما پیروزی شماست .
        </div>
        <div className="text-center text-sm sm:text-lg lg:text-xl text-muted">
          از این رو تصمیم ما ایجاد کردن یک فضای دوستانه است، که هم برای آموزش و
          هم برای ایجاد ارتباط و حل مشکل برنامه نویسان مختلف در فضای وب فارسی
          مورد استفاده قرار بگیرد تا در کنار یادگیری ابزارهای جدید، به عنوان یک
          برنامه نویس بتوانید مشکلاتتان را در راکت حل کنید یا حتی قادر باشید شغل
          آینده خود را پیدا کنید.
        </div>
      </div>
      <div className="w-[85%] md:w-[80%] flex flex-col items-center gap-3 md:gap-10 pt-5 md:pt-10 my-2 md:my-5">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          بخشی از فعالیت های ما
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center">
          <img
            src="/public/images/Group 143.png"
            alt=""
            className="min-w-40 w-[50%]"
          />
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">
              آموزش آنلاین
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              آموزش آنلاین، مهم‌ترین بخشی است که آکادمی بحر بر اساس آن بنا نهاده
              شده است. در این بخش سعی داریم کار با جدیدترین زبان‌ها، فریم‌ورک‌ها
              و ابزارهای برنامه‌نویسی جهان را به فارسی‌زبانان آموزش دهیم.
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              ما در آکادمی بحر تمام تلاش خود را می‌کنیم تا دوره‌هایی به‌روز و
              کاربردی را در اختیار شما قرار دهیم و شما را برای بازار کار آماده
              کنیم. این برای یک وب‌سایت آموزشی کار بسیار دشواری است که در عین
              به‌روز بودن محتوا، آموزش‌هایی با کیفیت بالا نیز تهیه کند. اما ما
              در آکادمی بحر به‌صورت ۲۴ ساعته تلاش می‌کنیم تا بهترین محتوا را که
              درخور کاربران ایرانی باشد، در اختیار شما دوستان قرار دهیم.
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-5">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="w-full flex sm:justify-end">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">
                برگزاری کارگاه های حضوری
              </div>
            </div>

            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              کارگاه‌های حضوری، فرصتی بی‌نظیر برای یادگیری عمیق و تعامل مستقیم
              است که آکادمی بحر با افتخار آن را در کنار آموزش‌های آنلاین خود
              قرار داده است. در این کارگاه‌ها، شرکت‌کنندگان در محیطی پویا و
              صمیمی، مهارت‌های برنامه‌نویسی را به‌صورت عملی و گام‌به‌گام زیر نظر
              مدرسان مجرب فرا می‌گیرند.
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              ما در آکادمی بحر تمام تلاش خود را می‌کنیم تا کارگاه‌هایی متناسب با
              نیازهای واقعی بازار کار طراحی کنیم؛ کارگاه‌هایی که در آن‌ها، از
              جدیدترین متدهای آموزشی استفاده می‌شود و هر شرکت‌کننده می‌تواند با
              پروژه‌های عملی و رفع اشکال حضوری، آموخته‌های خود را تثبیت کند.
              برگزاری یک کارگاه باکیفیت، کار ساده‌ای نیست؛ باید محتوای به‌روز،
              فضای مناسب، مربیان کارآزموده و پشتیبانی مؤثر را یکجا فراهم آورد.
              اما ما در آکادمی بحر با برنامه‌ریزی دقیق و تلاش مستمر، می‌کوشیم
              بهترین تجربه آموزشی حضوری را که شایسته کاربران ایرانی است، برایتان
              رقم بزنیم.
            </div>
          </div>
          <div className="p-3 w-[65%] min-w-35 flex justify-center max-h-40 sm:max-h-60">
            <img
              src="/public/images/christopher-gower.png"
              alt=""
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 sm:flex-row justify-between items-center">
          <div className="p-3 w-[65%] min-w-35 flex justify-center max-h-40 sm:max-h-60">
            <img
              src="/public/images/markus-winkler.png"
              alt=""
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">
              اخبار و مقالات آموزشی
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              اخبار و مقالات آموزشی، چراغ راهی برای آگاهی از مسیر پرسرعت دنیای
              فناوری است که آکادمی بحر آن را جدی گرفته است. در این بخش می‌کوشیم
              تازه‌ترین اخبار، رویدادها و تحلیل‌های دنیای برنامه‌نویسی و
              تکنولوژی را به شکلی دقیق، روان و کاربردی در اختیار فارسی‌زبانان
              قرار دهیم.
            </div>
            <div className="text-xs sm:text-sm lg:text-[17px] text-muted">
              ما در آکادمی بحر باور داریم که یک برنامه‌نویس موفق، تنها به مهارت
              فنی نیاز ندارد؛ بلکه باید همواره در جریان تغییرات و روندهای جدید
              باشد. از معرفی نسخه‌های تازه زبان‌ها و فریم‌ورک‌ها گرفته تا مقایسه
              ابزارها، مصاحبه با متخصصان و راهنماهای گام‌به‌گام، همه و همه
              محتوایی است که با وسواس و دقت برای این بخش آماده می‌شود. تهیه
              محتوای باکیفیت که هم به‌روز باشد، هم معتبر و هم به زبان ساده
              مفاهیم پیچیده را منتقل کند، کار آسانی نیست. اما تیم محتوای آکادمی
              بحر به‌طور پیوسته در حال رصد، تحقیق و تولید است تا بهترین مقالات و
              اخبار را شایسته شما عزیزان ارائه دهد.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;