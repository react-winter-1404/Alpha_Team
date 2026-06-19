import { useForm } from "react-hook-form"

const LinksProfile = () => {
  const {register, handleSubmit, formState: { errors }} = useForm({mode: "onSubmit"})

    const onSubmit = (data) => {
    console.log("دیتای فرم ارسال شد:", data)
  }

  return (
    <div className='w-full h-[500px] '>
      <form onSubmit={handleSubmit(onSubmit)}  className="w-full h-full flex flex-col justify-start items-start gap-8 p-5">
        <div className="relative not-[]:flex flex-col gap-2 w-[60%]">
        <label htmlFor="n" className="block">تلگرام</label>
        <input {...register("tel", { required: "لینک تلگرام اجباری است" })}  id="n" placeholder="         لینک تلگرام خود را وارد کنید" className="w-full h-[48px] rounded-[16px]  bg-[#ecebec] text-[14px] text-[#272727] p-3"/>
        <img src="/public/icons/telegram-stroke-rounded 2.png" alt="" className="absolute w-[24px] h-[24px] top-[37px] right-[10px]"/>
        {errors.tel && <span className="text-red-500 text-[12px] px-2">{errors.tel.message}</span>}
        </div>

        <div className="relative flex flex-col gap-2 w-[60%]">
        <label htmlFor="f" className="block">نام لینکدین</label>
        <input {...register("link", { required: "لینک لینکدین اجباری است" })}  id="f" placeholder="         لینک لینکدین خود را وارد کنید" className="w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3"/>
        <img src="/public/icons/linkedin-02-stroke-rounded 1.png" alt="" className="absolute w-[24px] h-[24px] top-[42px] right-[10px]"/>
        {errors.link && <span className="text-red-500 text-[12px] px-2">{errors.link.message}</span>}
        </div>

        <button type="submit" className="w-[169px] h-[56px] rounded-[64px] bg-[#3772ff] text-[20px] text-[#fefdff] cursor-pointer">اعمال تغییرات</button>
      </form>
    </div>
  )
}

export default LinksProfile