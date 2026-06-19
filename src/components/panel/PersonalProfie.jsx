import { useForm } from "react-hook-form";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";
import { putPersonalProfile } from "../../core/services/userPanel/put";
import toast from "react-hot-toast";
import { getUserProfile } from "../../core/services/userPanel/get";
import { Skeleton } from "@heroui/react";

const PersonalProfile = () => {
  const [submittedPercent, setSubmittedPercent] = useState(0);
  const [userProfile, setUserProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
      setSubmittedPercent(response.data.profileCompletionPercentage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("FName", data.name?.trim() || "");
    formData.append("LName", data.lastName?.trim() || "");
    formData.append("UserAbout", data.aboutMe?.trim() || "");
    formData.append("NationalCode", data.code?.trim() || "");
    formData.append("Gender", data.sex || "");
    formData.append("BirthDay", new Date(data.birthday).toISOString());
    formData.append("HomeAdderess", data.address?.trim() || "");
    formData.append("gmail", data.email?.trim() || "");
    formData.append("phoneNumber", data.phone?.trim() || "");

    try {
      const response = await putPersonalProfile(formData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "خطا در ثبت اطلاعات");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ارتباط با سرور");
    }
  };

  const getProgressInfo = (c) => {
    if (c < 50) return { clr: "#ffc619", p: "اطلاعات کاربری شما تکمیل نیست!" };
    if (c < 100) return { clr: "#3E98C7", p: "اطلاعات کاربری شما تکمیل نیست!" };
    return { clr: "#47C724", p: "اطلاعات کاربری شما تکمیل شد" };
  };

  const pc = getProgressInfo(submittedPercent);
  const isError = (field) => isSubmitted && errors[field];

  return (
    <div className="w-full h-full bg-[#fefdff] p-[30px] rounded-b-[16px] flex justify-center items-start">
      {isLoading ? (
        <div className="w-[70%] h-full flex flex-wrap gap-8">
          <div className="flex flex-col gap-2 w-[40%]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-[40%]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-full mt-[-10px]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-[86%] h-[93px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-[40%] mt-[-10px]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-[40%] mt-[-10px]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-[40%] mt-[-10px]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-[40%] mt-[-10px]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-full mt-[-10px]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-[86%] h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-full mt-[-10px]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-[86%] h-[93px] rounded-[16px]" />
          </div>
          <Skeleton className="w-[169px] h-[56px] rounded-[64px]" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[70%] h-full flex flex-wrap gap-8"
        >
          {/* Name */}
          <div className="flex flex-col gap-2 w-[40%] group">
            <div className="flex items-center justify-between">
              <label
                htmlFor="n"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                نام
              </label>
              {isError("name") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.name.message}
                </span>
              )}
            </div>
            <input
              {...register("name", {
                required: "نام الزامی است",
                minLength: { value: 3, message: "نام حداقل 3 کاراکتر" },
              })}
              defaultValue={userProfile.fName}
              id="n"
              placeholder="نام خود را وارد کنید"
              className={`w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 transition-all outline-0 ${isError("name") ? "border-2 border-red-500" : ""}`}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2 w-[40%] group">
            <div className="flex items-center justify-between">
              <label
                htmlFor="f"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                نام خانوادگی
              </label>
              {isError("lastName") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <input
              {...register("lastName", {
                required: "نام خانوادگی الزامی است",
                minLength: { value: 3, message: "حداقل 3 کاراکتر" },
              })}
              defaultValue={userProfile.lName}
              id="f"
              placeholder="نام خانوادگی خود را وارد کنید"
              className={`w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 transition-all outline-0 ${isError("lastName") ? "border-2 border-red-500" : ""}`}
            />
          </div>

          {/* About Me */}
          <div className="flex flex-col gap-2 w-full mt-[-10px] group">
            <div className="flex items-center justify-between w-[86%]">
              <label
                htmlFor="a"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                درباره من
              </label>
              {isError("aboutMe") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.aboutMe.message}
                </span>
              )}
            </div>
            <textarea
              {...register("aboutMe", {
                minLength: { value: 10, message: "حداقل ۱۰ کاراکتر" },
                maxLength: { value: 250, message: "حداکثر 250 کاراکتر" },
              })}
              defaultValue={userProfile.userAbout}
              id="a"
              placeholder="یک متن درباره خود بنویسید"
              className={`w-[86%] h-[93px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 text-right resize-none transition-all outline-0 ${isError("aboutMe") ? "border-2 border-red-500" : ""}`}
              dir="rtl"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2 w-[40%] mt-[-10px] group">
            <div className="flex items-center justify-between">
              <label
                htmlFor="p"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                شماره همراه
              </label>
              {isError("phone") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <input
              {...register("phone", {
                pattern: {
                  value: /^09[0-9]{9}$/,
                  message: "شماره همراه معتبر نیست",
                },
              })}
              defaultValue={userProfile.phoneNumber}
              id="p"
              placeholder="شماره همراه خود را وارد کنید"
              className={`w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 transition-all outline-0 ${isError("phone") ? "border-2 border-red-500" : ""}`}
            />
          </div>

          {/* National Code */}
          <div className="flex flex-col gap-2 w-[40%] mt-[-10px] group">
            <div className="flex items-center justify-between">
              <label
                htmlFor="c"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                کد ملی
              </label>
              {isError("code") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.code.message}
                </span>
              )}
            </div>
            <input
              {...register("code", {
                required: "کد ملی الزامی است",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "کد ملی باید ۱۰ رقم باشد",
                },
              })}
              defaultValue={userProfile.nationalCode}
              id="c"
              placeholder="کد ملی خود را وارد کنید"
              className={`w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 transition-all outline-0 ${isError("code") ? "border-2 border-red-500" : ""}`}
            />
          </div>

          {/* Birthday - DatePicker */}
          <div className="flex flex-col gap-2 w-[40%] mt-[-10px] group">
            <div className="flex items-center justify-between">
              <label
                htmlFor="b"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-[1.15]"
              >
                تاریخ تولد
              </label>
              {isError("birthday") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.birthday.message}
                </span>
              )}
            </div>
            <input
              defaultValue={userProfile.birthDay.split("T")[0]}
              type="date"
              {...register("birthday", { required: "تاریخ تولد الزامی است" })}
              id="b"
              className={`w-full h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 transition-all outline-0 ${isError("birthday") ? "border-2 border-red-500" : ""}`}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2 w-[40%] mt-[-10px]">
            <div className="flex items-center justify-between">
              <label
                className={`block whitespace-nowrap transition-all duration-200 cursor-pointer ${isError("sex") ? "text-red-500" : ""}`}
              >
                جنسیت
              </label>
              {isError("sex") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.sex.message}
                </span>
              )}
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register("sex", { required: "جنسیت را انتخاب کنید" })}
                  defaultChecked={userProfile.gender}
                  type="radio"
                  value="male"
                />
                مرد
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register("sex", { required: "جنسیت را انتخاب کنید" })}
                  defaultChecked={!userProfile.gender}
                  type="radio"
                  value="female"
                />
                زن
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 w-full mt-[-10px] group">
            <div className="flex items-center justify-between w-[86%]">
              <label
                htmlFor="e"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                ایمیل
              </label>
              {isError("email") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "ایمیل معتبر نیست",
                },
              })}
              defaultValue={userProfile.gmail}
              id="e"
              placeholder="ایمیل خود را وارد کنید"
              className={`w-[86%] h-[48px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 transition-all outline-0 ${isError("email") ? "border-2 border-red-500" : ""}`}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 w-full mt-[-10px] group">
            <div className="flex items-center justify-between w-[86%]">
              <label
                htmlFor="ad"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                آدرس سکونت
              </label>
              {isError("address") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.address.message}
                </span>
              )}
            </div>
            <textarea
              {...register("address", {
                minLength: { value: 10, message: "حداقل ۱۰ کاراکتر" },
                maxLength: { value: 250, message: "حداکثر 250 کاراکتر" },
              })}
              defaultValue={userProfile.homeAdderess}
              id="ad"
              placeholder="آدرس سکونت خود را وارد کنید"
              className={`w-[86%] h-[93px] rounded-[16px] bg-[#ecebec] text-[14px] text-[#272727] p-3 text-right resize-none transition-all outline-0 ${isError("address") ? "border-2 border-red-500" : ""}`}
              dir="rtl"
            />
          </div>

          <button
            type="submit"
            className="w-[169px] h-[56px] rounded-[64px] bg-[#3772ff] text-[20px] text-[#fefdff] cursor-pointer hover:bg-[#2a5fd8] transition-colors"
          >
            اعمال تغییرات
          </button>
        </form>
      )}

      {/* Progress Section */}
      <div className="w-[27%] h-[35%] border p-3">
        <h3 className="text-[16px] text-[#272727]">وضعیت اطلاعات حساب</h3>
        <div className="m-auto mt-[40px] h-[130px] w-[136px]">
          <CircularProgressbar
            value={submittedPercent}
            text={`${submittedPercent}%`}
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
        <p
          className="text-[14px] mt-[20px] text-center"
          style={{ color: pc.clr }}
        >
          {pc.p}
        </p>
      </div>
    </div>
  );
};

export default PersonalProfile;
