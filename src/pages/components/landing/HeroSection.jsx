import { Button } from "@heroui/button";

const Hero = () => {
  return (
    <section className="my-10 mx-auto w-3/5 text-center" >
      <div className="flex gap-5 my-5">
        <p className="text-5xl">تجربه‌ای بی‌نظیر در یادگیری</p>
        <Button 
                  isIconOnly 
                  disableRipple
                  variant="flat" 
                  className="text-xl w-12 h-12 rounded-full text-center shadow-xl"
                >
        <img src="/public//icons/code-circle 1.png" alt="" className="text-4xl mx-auto"/>
        </Button>
        <p className="text-5xl">کدنویسی؛</p>
      </div>
      <p className="text-5xl my-5">از <span className="text-blue-500" >مبتدی</span> تا <span className="text-red-500">حرفه ای</span> !</p>
      <p className="text-xl text-gray-700 opacity-80 my-5">آکادمی فوق تخصصی کدنویسی و برنامه‌نویسی از سنین کودکی تا بزرگسالی</p>
      <Button color="primary" radius="full" size="lg" disableRipple className="my-5 px-8 text-xl bg-blue-500  text-white w-43 h-14 rounded-4xl" >
        شروع یادگیری
      </Button>
    </section>
  )
}

export default Hero