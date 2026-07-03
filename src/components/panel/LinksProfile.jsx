import { useForm } from "react-hook-form";
import { putPersonalProfile } from "../../core/services/userPanel/put";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../core/services/userPanel/get";
import { Skeleton } from "@heroui/react";


const LinksProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({ mode: "onSubmit" });
  const [userProfile, setUserProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
      console.log(response.data);
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

    formData.append("TelegramLink", data.tel?.trim() || "");
    formData.append("LinkdinProfile", data.link?.trim() || "");
    formData.append("BirthDay", new Date(userProfile.birthDay).toISOString());
    console.log(formData);

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

  const isError = (field) => isSubmitted && errors[field];

  return (
    <div className="w-full h-[500px] py-10 px-5 ">
      {isLoading ? (
        <div className="w-[70%] h-full flex flex-col gap-8">
          <div className="flex flex-col gap-2 w-[60%]">
            <Skeleton className="w-16 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <div className="flex flex-col gap-2 w-[60%]">
            <Skeleton className="w-16 h-5 rounded-lg" />
            <Skeleton className="w-full h-[48px] rounded-[16px]" />
          </div>
          <Skeleton className="w-[169px] h-[56px] rounded-[64px]" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[70%] h-full flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2 w-[60%] group">
            <div className="flex items-center justify-between">
              <label
                htmlFor="n"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                تلگرام
              </label>
              {isError("tel") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.tel.message}
                </span>
              )}
            </div>
            <input
              {...register("tel", {
                pattern: {
                  value: /^(https?:\/\/)?(t\.me|telegram\.me)\/.+/,
                  message: "لینک تلگرام معتبر نیست",
                },
              })}
              defaultValue={userProfile.telegramLink}
              id="n"
              placeholder="لینک تلگرام خود را وارد کنید"
              className={`w-full h-[48px] rounded-[16px] bg-default text-[14px] p-3 transition-all outline-0 ${isError("tel") ? "border-2 border-red-500" : ""}`}
            />
          </div>

          <div className="flex flex-col gap-2 w-[60%] group">
            <div className="flex items-center justify-between">
              <label
                htmlFor="f"
                className="block whitespace-nowrap transition-all duration-200 cursor-pointer group-focus-within:scale-115"
              >
                لینکدین
              </label>
              {isError("link") && (
                <span className="text-red-500 text-xs whitespace-nowrap">
                  {errors.link.message}
                </span>
              )}
            </div>
            <input
              {...register("link", {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/.+/,
                  message: "لینک لینکدین معتبر نیست",
                },
              })}
              defaultValue={userProfile.linkdinProfile}
              id="f"
              placeholder="لینک لینکدین خود را وارد کنید"
              className={`w-full h-[48px] rounded-[16px] bg-default text-[14px] p-3 transition-all outline-0 ${isError("link") ? "border-2 border-red-500" : ""}`}
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
    </div>
  );
};

export default LinksProfile;
