import { useForm } from "react-hook-form"
// import DatePicker from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";


const PersonalProfie = () => {

    const [sumbitedPercent, setSumbitedPercent] = useState(0)

    const {register, handleSubmit} = useForm({mode: "onSubmit"})

    const requiredFields = ["name", "lastName", "aboutMe", "phone", "code", "birthday", "sex", "email", "address"]

    const onSumbit = (data) => {
      const filledFileds = requiredFields.filter(filed => data[filed] && data[filed].length > 0).length
      const percent = Math.round((filledFileds / requiredFields.length) * 100)

      setSumbitedPercent(percent)
    }


    const inp = (c) => {
      if (c < 50) return { clr: "#ffc619", p: "اطلاعات کاربری شما تکمیل نیست!"}
      else if (c > 50 && c < 100) return { clr: "#3E98C7", p: "اطلاعات کاربری شما تکمیل نیست!"}
      else return { clr: "#47C724", p: "اطلاعات کاربری شما تکمیل تکمیل شد"}
    }

    const pc = inp(sumbitedPercent)

  return (
    <div className='w-full h-full bg-[#fefdff] p-[30px] rounded-b-[16px] flex justify-center items-start'>
        <form onSubmit={handleSubmit(onSumbit)} className="w-[70%] h-full flex flex-wrap gap-8">

            <div className="flex flex-col gap-2 w-[40%]">
            <label htmlFor="n" className="block">نام</label>
            <input {...register("name")} id="n" placeholder="نام خود را وارد کنید" className="w-full h-[48px] rounded-[16px]  bg-[#ecebec] text-[14px] text-[#272727] p-3"/>
            </div>

            <div className="flex flex-col gap-2 w-[40%]">
            <label htmlFor="f" className="block">نام خانوداگی</label>
            <input {...register("lastName")} id="f" placeholder="نام خانوادگی خود را وارد کنید" className="w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3"/>
            </div>
            
            <div className="flex flex-col gap-2 w-full mt-[-10px]">
            <label htmlFor="a" className="block">درباره من</label>
            <textarea {...register("aboutMe")} id="a" placeholder="یک متن درباره خود بنویسید" className="w-[86%] h-[93px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 text-right resize-none" dir="rtl"/>
            </div>
            
            <div className="flex flex-col gap-2 w-[40%] mt-[-10px]">
            <label htmlFor="p" className="block">شماره همراه</label>
            <input {...register("phone")} id="p" placeholder="شماره همراه خود را وارد کنید" className="w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3"/>
            </div>
            
            <div className="flex flex-col gap-2 w-[40%] mt-[-10px]">
            <label htmlFor="c" className="block">کد ملی</label>
            <input {...register("code")} id="c" placeholder="کد ملی خود را وارد کنید" className="w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3"/>
            </div>
            
            <div className="relative flex flex-col gap-2 w-[40%] mt-[-10px]">
              <label htmlFor="b" className="block">تاریخ تولد</label>
              <input {...register("birthday")} id="b" placeholder="تاریخ تولد خود را وارد کنید" className="w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3"/>
              <img src="/public/icons/calendar-03-stroke-rounded 1.png" alt="" className="absolute top-11 left-2 w-[24px] h-[24px] cursor-pointer"/>
            </div>
            
        
            <div className="flex flex-col gap-2 w-[40%] mt-[-10px]">
            <label htmlFor="s" className="block">جنسیت</label>
            <div className="flex justify-center items-center gap-2">
              <label ><input {...register("sex")} type="radio" value={"male"}/>مرد</label>
              <label ><input {...register("sex")} type="radio" value={"female"}/>زن</label>
              <span className="text-[16px] text-[#3772ff] cursor-default m-r">انتخاب کنید</span>
            </div>            
            </div>
            
            <div className="flex flex-col gap-2 w-full mt-[-10px]">
            <label htmlFor="e" className="block">ایمیل</label>
            <input {...register("email")} id="e" placeholder="ایمیل خود را وارد کنید" className="w-[86%] h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3"/>
            </div>
            

            <div className="flex flex-col gap-2 w-full mt-[-10px]">
            <label htmlFor="ad" className="block">آدرس سکونت</label>
            <textarea {...register("address")} id="ad" placeholder="آدرس سکونت خود را وارد کنید" className="w-[86%] h-[93px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] indent-3 flex flex-wrap items-start justify-start p-3 text-right resize-none" dir="rtl"/>
            </div>

            <button type="submit" className="w-[169px] h-[56px] rounded-[64px] bg-[#3772ff] text-[20px] text-[#fefdff] cursor-pointer">اعمال تغییرات</button>
        </form>

        <div className="w-[27%] h-[35%] border p-3">
          <h3 className="text-[16px] text-[#272727]">وضعیت اطلاعات حساب</h3>

          <div className="m-auto mt-[40px] h-[130px] w-[136px]">
            <CircularProgressbar value={sumbitedPercent} text={`${sumbitedPercent}%`} 
            styles={buildStyles({
              pathColor: pc.clr,
              textColor: pc.clr,
              trailColor: "#f0f0f0",
              strokeLinecap: "round",
              textSize: "34px",
              pathTransitionDuration: 0.5,
            })}
            />
          </div>

          <p className="text-[14px] mt-[20px] text-center" style={{color:pc.clr}}>{pc.p}</p>

        </div>
    </div>
  )
}

export default PersonalProfie