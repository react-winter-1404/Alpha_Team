import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
  SmartPhone02Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const ForgotPasswordForm = ({ step, submitFuncOne, submitFuncTwo }) => {
  const [isHidenPass, setIsHidenPass] = useState(true);
  const [isHidenAgainPass, setIsHidenAgainPass] = useState(true);
  //   const [gmailInpValue, setGmailInpValue] = useState("");

  return (
    <>
      {step == 1 && (
        <motion.div
          className="w-full flex flex-col gap-3 sm:gap-5"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="border border-red-600 w-full max-w-109 h-full flex flex-col gap-3 sm:gap-5 px-4 sm:px-0">
            <div className="w-full flex flex-col gap-4 sm:gap-6">
              <div className="flex gap-1.5 items-center text-2xl sm:text-3xl font-bold">
                <div className="">فراموشی رمزعبور؟</div>
                <div className="text-lg sm:text-[25px]">🔐</div>
              </div>

              <div className="font-light text-sm sm:text-base text-muted">
                اگر رمزعبور خود را فراموش کرده‌اید ایمیل خود را وارد کنید تا
                لینک صفحه تغییر رمزعبور برای شما ارسال شود
              </div>
            </div>

            <Formik
              initialValues={{
                email: "",
                newPassword: "",
                resetValue: "",
                baseUrl: "https://localhost:5173/resetpassword",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("ایمیل معتبر نیست")
                  .required("ایمیل الزامی است")
                  .matches(
                    /@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/,
                    "ایمیل وارد شده معتبر نیست",
                  ),
              })}
              onSubmit={(values) => {
                console.log(values);
                submitFuncOne(values);
              }}
            >
              {() => (
                <Form className="border border-black w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
                  <div className="flex flex-col gap-3 sm:gap-5">
                    <label
                      htmlFor="email"
                      className="font-bold text-sm sm:text-[16px] mr-0.5"
                    >
                      ایمیل
                    </label>
                    <div className="h-10 sm:h-11.25 flex items-center gap-4 px-3 bg-surface-secondary rounded-xl">
                      <HugeiconsIcon
                        icon={SmartPhone02Icon}
                        className="w-4 sm:w-5 text-default-foreground"
                      />
                      <Field
                        id="email"
                        name="email"
                        type="text"
                        className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200"
                        placeholder="ایمیل خود را وارد کنید"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-xs text-red-600"
                    />
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
                  >
                    ارسال لینک
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="w-full flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
              <div className="">رمزعبور خود فراموش نکردید؟</div>
              <div className="underline underline-offset-4">
                ورود به حساب کاربری
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {step == 2 && (
        <motion.div
          className="w-full flex flex-col gap-3 sm:gap-5"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="border border-red-600 w-full max-w-109 h-full flex flex-col gap-3 sm:gap-5 px-4 sm:px-0">
            <div className="w-full flex flex-col gap-4 sm:gap-6">
              <div className="flex gap-1.5 items-center text-2xl sm:text-3xl font-bold">
                <div className="">رمزعبور جدید</div>
                <div className="text-lg sm:text-[25px]">🔓</div>
              </div>

              <div className="font-light text-sm sm:text-base text-muted">
                رمزعبور جدید خود را وارد کنید
              </div>
            </div>

            <Formik
              onSubmit={(values) => {
                console.log(values);
                submitFuncTwo(values);
              }}
              initialValues={{
                email: "",
                newPassword: "",
                resetValue: "",
              }}
              validationSchema={Yup.object({
                newPassword: Yup.string()
                  .required("لطفا رمز عبور را وارد کنید")
                  .min(8, "رمز عبور نمیتونه کمتر از ۸ کاراکتر باشه")
                  .max(32, "رمز عبور نمیتواند بیشتر از ۳۲ کاراکتر باشد")
                  .matches(
                    /[a-z]/,
                    "رمز عبور باید حداقل یک حرف کوچک داشته باشد",
                  )
                  .matches(
                    /[A-Z]/,
                    "رمز عبور باید حداقل یک حرف بزرگ داشته باشد",
                  )
                  .matches(/\d/, "رمز عبور باید حداقل یک عدد داشته باشد")
                  .matches(
                    /[!@#$%^&*(),.?":{}|<>]/,
                    "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد",
                  ),
                resetValue: Yup.string()
                  .required("لطفا تکرار رمز عبور را وارد کنید")
                  .oneOf(
                    [Yup.ref("newPassword")],
                    "رمز عبور و تکرار آن مطابقت ندارند",
                  ),
              })}
            >
              <Form className="border border-black w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
                <div className="flex flex-col gap-3 sm:gap-5">
                  <div className="w-full flex flex-col gap-1 sm:gap-1.5">
                    <label
                      htmlFor="newPassword"
                      className="font-bold text-sm sm:text-[16px] mr-0.5"
                    >
                      رمزعبور جدید
                    </label>
                    <div className="h-10 sm:h-11.25 flex items-center gap-4 px-3 bg-surface-secondary rounded-xl ">
                      <HugeiconsIcon
                        icon={LockPasswordIcon}
                        className="w-5 sm:w-6 text-default-foreground"
                      />
                      <Field
                        id="newPassword"
                        name="newPassword"
                        type={isHidenPass ? "password" : "text"}
                        className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200"
                        placeholder="رمزعبور جدید خود را وارد کنید"
                      />

                      <HugeiconsIcon
                        onClick={() => {
                          setIsHidenPass(!isHidenPass);
                        }}
                        icon={isHidenPass ? ViewIcon : ViewOffIcon}
                        className="w-5 sm:w-6 text-default-foreground cursor-pointer"
                      />
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className=" text-xs text-red-600 "
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 sm:gap-1.5">
                    <label
                      htmlFor="resetValue"
                      className="font-bold text-sm sm:text-[16px] mr-0.5"
                    >
                      تکرار رمزعبور
                    </label>
                    <div className="h-10 sm:h-11.25 flex items-center gap-4 px-3 bg-surface-secondary rounded-xl ">
                      <HugeiconsIcon
                        icon={LockPasswordIcon}
                        className="w-5 sm:w-6 text-default-foreground"
                      />
                      <Field
                        id="resetValue"
                        name="resetValue"
                        type={isHidenAgainPass ? "password" : "text"}
                        className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200"
                        placeholder="رمزعبور جدید خود را دوباره وارد کنید"
                      />

                      <HugeiconsIcon
                        onClick={() => {
                          setIsHidenAgainPass(!isHidenAgainPass);
                        }}
                        icon={isHidenAgainPass ? ViewIcon : ViewOffIcon}
                        className="w-5 sm:w-6 text-default-foreground cursor-pointer"
                      />
                    </div>
                    <ErrorMessage
                      name="resetValue"
                      component="div"
                      className=" text-xs text-red-600 "
                    />
                  </div>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
                >
                  تایید رمزعبور
                </Button>
              </Form>
            </Formik>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
