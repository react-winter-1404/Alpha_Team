import { Button } from "@heroui/button";

const Hero = () => {
  return (
    <section className="my-10 mx-auto w-[90%] md:w-3/5 text-center" >
      <div className="items-center justify-center flex flex-wrap gap-5 my-5 text-[33px] md:text-[48px]">
        <p className=" ">تجربه‌ای بی‌نظیر در یادگیری</p>
        <Button 
                  isIconOnly 
                  disableRipple
                  variant="flat" 
                  className="hidden md:block text-xl w-12 h-12 rounded-full text-center shadow-xl"
                >
        <img src="/public//icons/code-circle 1.png" alt="" className="text-4xl mx-auto"/>
        </Button>
        <p className="">کدنویسی؛</p>
      </div>
      <p className="text-[33px] md:text-[48px] my-5">از <span className="text-blue-500" >مبتدی</span> تا <span className="text-red-500">حرفه ای</span> !</p>
      <p className="text-[16px] md:text-[20px] w-[80%] mx-auto text-gray-700 opacity-80 my-5">آکادمی فوق تخصصی کدنویسی و برنامه‌نویسی از سنین کودکی تا بزرگسالی</p>
      <Button color="primary" radius="full" size="lg" disableRipple className="my-5 px-2 text-[16px] md:text-[20px] bg-blue-500  text-white w-[140px] h-[40px] md:w-43 md:h-14 rounded-4xl" >
        شروع یادگیری
      </Button>
    </section>
  )
}

export default Hero