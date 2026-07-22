import { useForm, Controller } from "react-hook-form";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";
import { putPersonalProfile } from "../../core/services/userPanel/put";
import toast from "react-hot-toast";
import { getUserProfile } from "../../core/services/userPanel/get";
import { Skeleton } from "@heroui/react";
import { useTranslation } from "react-i18next";
import ReactDatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// حل مشکل ایمپورت ماژول در Vite
const DatePicker = ReactDatePicker.default || ReactDatePicker;

const PersonalProfile = ({ progressPercent }) => {
  const { t } = useTranslation("panel");
  const [submittedPercent, setSubmittedPercent] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm({ mode: "onSubmit" });

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      if (response?.data) {
        const data = response.data;
        setUserProfile(data);
        setSubmittedPercent(data.profileCompletionPercentage || 0);

        reset({
          name: data.fName || "",
          lastName: data.lName || "",
          aboutMe: data.userAbout || "",
          phone: data.phoneNumber || "",
          code: data.nationalCode || "",
          birthday: data.birthDay ? new Date(data.birthDay) : "",
          sex: data.gender === true ? "male" : data.gender === false ? "female" : "",
          email: data.gmail || "",
          address: data.homeAdderess || "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("FName", data.name?.trim() || "");
    formData.append("LName", data.lastName?.trim() || "");
    formData.append("UserAbout", data.aboutMe?.trim() || "");
    formData.append("NationalCode", data.code?.trim() || "");
    formData.append("Gender", data.sex === "male");
    
    if (data.birthday) {
      const dateObj = data.birthday.toDate ? data.birthday.toDate() : new Date(data.birthday);
      formData.append("BirthDay", dateObj.toISOString());
    }
    
    formData.append("HomeAdderess", data.address?.trim() || "");
    formData.append("RecoveryEmail", data.email?.trim() || "");
    formData.append("phoneNumber", data.phone?.trim() || "");

    try {
      const response = await putPersonalProfile(formData);
      if (response?.data?.success) {
        toast.success(response.data.message);
        fetchUserProfile();
      } else {
        toast.error(response?.data?.message || "خطا در ثبت اطلاعات");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ارتباط با سرور");
    }
  };

  const getProgressInfo = (c) => {
    if (c < 50) return { clr: "#ffc619", p: t("dashboard.profileIncomplete") };
    if (c < 100) return { clr: "#3E98C7", p: t("dashboard.profileIncomplete") };
    return { clr: "#47C724", p: t("dashboard.profileComplete") };
  };

  const currentPercent = progressPercent || submittedPercent;
  const pc = getProgressInfo(currentPercent);
  const isError = (field) => isSubmitted && errors[field];

  return (
    <div className="w-full h-full bg-overlay p-[30px] rounded-b-[16px] flex flex-col md:flex-row justify-between items-start gap-6">
      {isLoading ? (
        <div className="w-full md:w-[70%] h-full flex flex-wrap gap-8">
          <div className="flex flex-col gap-2 w-full md:w-[40%]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[40%]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full md:w-[86%] h-[93px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[40%]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[40%]">
            <Skeleton className="w-20 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <Skeleton className="w-[169px] h-[56px] rounded-[64px]" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-[70%] h-full flex flex-wrap gap-8"
        >
          <div className="flex flex-col gap-2 w-full md:w-[40%] group">
            <div className="flex items-center justify-between">
              <label htmlFor="n" className="block whitespace-nowrap text-foreground cursor-pointer">
                {t("profile.name")} <span className="text-danger">*</span>
              </label>
              {isError("name") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.name.message}</span>
              )}
            </div>
            <input
              {...register("name", {
                required: t("profile.nameRequired"),
                minLength: { value: 3, message: t("profile.nameMin") },
              })}
              id="n"
              placeholder={t("profile.namePlaceholder")}
              className={`w-full h-[48px] rounded-[16px] bg-default text-foreground text-[14px] p-3 transition-all outline-0 ${
                isError("name") ? "border-2 border-danger" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 w-full md:w-[40%] group">
            <div className="flex items-center justify-between">
              <label htmlFor="f" className="block whitespace-nowrap text-foreground cursor-pointer">
                {t("profile.lastName")} <span className="text-danger">*</span>
              </label>
              {isError("lastName") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.lastName.message}</span>
              )}
            </div>
            <input
              {...register("lastName", {
                required: t("profile.lastNameRequired"),
                minLength: { value: 3, message: t("profile.lastNameMin") },
              })}
              id="f"
              placeholder={t("profile.lastNamePlaceholder")}
              className={`w-full h-[48px] rounded-[16px] bg-default text-foreground text-[14px] p-3 transition-all outline-0 ${
                isError("lastName") ? "border-2 border-danger" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 w-full group">
            <div className="flex items-center justify-between w-full md:w-[86%]">
              <label htmlFor="a" className="block whitespace-nowrap text-foreground cursor-pointer">
                {t("profile.aboutMe")}
              </label>
              {isError("aboutMe") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.aboutMe.message}</span>
              )}
            </div>
            <textarea
              {...register("aboutMe", {
                minLength: { value: 10, message: t("profile.aboutMeMin") },
                maxLength: { value: 250, message: t("profile.aboutMeMax") },
              })}
              id="a"
              placeholder={t("profile.aboutMePlaceholder")}
              className={`w-full md:w-[86%] h-[93px] rounded-[16px] bg-default text-foreground text-[14px] p-3 resize-none transition-all outline-0 ${
                isError("aboutMe") ? "border-2 border-danger" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 w-full md:w-[40%] group">
            <div className="flex items-center justify-between">
              <label htmlFor="p" className="block whitespace-nowrap text-foreground cursor-pointer">
                {t("profile.phone")}
              </label>
              {isError("phone") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.phone.message}</span>
              )}
            </div>
            <input
              {...register("phone", {
                pattern: {
                  value: /^09[0-9]{9}$/,
                  message: t("profile.phoneInvalid"),
                },
              })}
              id="p"
              placeholder={t("profile.phonePlaceholder")}
              className={`w-full h-[48px] rounded-[16px] bg-default text-foreground text-[14px] p-3 transition-all outline-0 ${
                isError("phone") ? "border-2 border-danger" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 w-full md:w-[40%] group">
            <div className="flex items-center justify-between">
              <label htmlFor="c" className="block whitespace-nowrap text-foreground cursor-pointer">
                {t("profile.nationalCode")} <span className="text-danger">*</span>
              </label>
              {isError("code") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.code.message}</span>
              )}
            </div>
            <input
              {...register("code", {
                required: t("profile.nationalCodeRequired"),
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: t("profile.nationalCodeInvalid"),
                },
              })}
              id="c"
              placeholder={t("profile.nationalCodePlaceholder")}
              className={`w-full h-[48px] rounded-[16px] bg-default text-foreground text-[14px] p-3 transition-all outline-0 ${
                isError("code") ? "border-2 border-danger" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 w-full md:w-[40%] group">
            <div className="flex items-center justify-between">
              <label htmlFor="b" className="block whitespace-nowrap text-foreground cursor-pointer">
                {t("profile.birthday")} <span className="text-danger">*</span>
              </label>
              {isError("birthday") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.birthday.message}</span>
              )}
            </div>
            <Controller
              control={control}
              name="birthday"
              rules={{ required: t("profile.birthdayRequired") }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value || ""}
                  onChange={(date) => onChange(date)}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  inputClass={`w-full h-[48px] rounded-[16px] bg-default text-foreground text-[14px] p-3 transition-all outline-none cursor-pointer ${
                    isError("birthday") ? "border-2 border-danger" : ""
                  }`}
                  placeholder="انتخاب تاریخ تولد"
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2 w-full md:w-[40%]">
            <div className="flex items-center justify-between">
              <label className={`block whitespace-nowrap text-foreground ${isError("sex") ? "text-danger" : ""}`}>
                {t("profile.gender")} <span className="text-danger">*</span>
              </label>
              {isError("sex") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.sex.message}</span>
              )}
            </div>
            <div className="flex gap-6 text-foreground items-center h-[48px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register("sex", { required: t("profile.genderRequired") })}
                  type="radio"
                  value="male"
                  className="accent-accent cursor-pointer"
                />
                {t("profile.male")}
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register("sex", { required: t("profile.genderRequired") })}
                  type="radio"
                  value="female"
                  className="accent-accent cursor-pointer"
                />
                {t("profile.female")}
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full group">
            <div className="flex items-center justify-between w-full md:w-[86%]">
              <label htmlFor="e" className="block whitespace-nowrap text-foreground cursor-pointer">
                {t("profile.email")}
              </label>
              {isError("email") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.email.message}</span>
              )}
            </div>
            <input
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("profile.emailInvalid"),
                },
              })}
              id="e"
              placeholder={t("profile.emailPlaceholder")}
              className={`w-full md:w-[86%] h-[48px] rounded-[16px] bg-default text-foreground text-[14px] p-3 transition-all outline-0 ${
                isError("email") ? "border-2 border-danger" : ""
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 w-full group">
            <div className="flex items-center justify-between w-full md:w-[86%]">
              <label htmlFor="ad" className="block whitespace-nowrap text-foreground cursor-pointer">
                {t("profile.address")}
              </label>
              {isError("address") && (
                <span className="text-danger text-xs whitespace-nowrap">{errors.address.message}</span>
              )}
            </div>
            <textarea
              {...register("address", {
                minLength: { value: 10, message: t("profile.addressMin") },
                maxLength: { value: 250, message: t("profile.addressMax") },
              })}
              id="ad"
              placeholder={t("profile.addressPlaceholder")}
              className={`w-full md:w-[86%] h-[93px] rounded-[16px] bg-default text-foreground text-[14px] p-3 resize-none transition-all outline-0 ${
                isError("address") ? "border-2 border-danger" : ""
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[145px] md:w-[169px] h-[41px] md:h-[56px] text-accent-foreground rounded-[64px] bg-accent text-[16px] md:text-[20px] cursor-pointer hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "..." : t("profile.applyChanges")}
          </button>
        </form>
      )}

      <div className="w-full md:w-[28%] border border-border p-5 rounded-2xl flex flex-col items-center">
        <h3 className="text-[16px] text-foreground w-full text-right">{t("dashboard.accountStatus")}</h3>
        <div className="my-6 h-[130px] w-[136px]">
          <CircularProgressbar
            value={currentPercent}
            text={`${currentPercent}%`}
            styles={buildStyles({
              pathColor: pc.clr,
              textColor: pc.clr,
              trailColor: "transparent",
              strokeLinecap: "round",
              textSize: "34px",
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
        <p className="text-[14px] text-center font-medium" style={{ color: pc.clr }}>
          {pc.p}
        </p>
      </div>
    </div>
  );
};

export default PersonalProfile;