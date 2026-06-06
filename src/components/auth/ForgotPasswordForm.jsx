import { Button, InputOTP } from "@heroui/react";
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
import { Link } from "react-router-dom";

const ForgotPasswordForm = ({ step, submitFuncOne, submitFuncTwo }) => {
  const [isHidenPass, setIsHidenPass] = useState(true);
  const [isHidenAgainPass, setIsHidenAgainPass] = useState(true);
    const [gmailInpValue, setGmailInpValue] = useState("");





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
          <div className=" w-full max-w-109 h-full flex flex-col gap-3 sm:gap-5 px-4 sm:px-0">
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
                gmail: "",
                newPassword: "",
                newPassword1: "",
                resetValue: "",
                baseUrl:  `${window.location.origin}/resetpassword`,
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
                setGmailInpValue(values.email);
              }}
            >
              {() => (
                <Form className=" w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
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
              <Link to={"/Auth/Login"} className="underline underline-offset-4">
                ورود به حساب کاربری
              </Link>
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
          <div className=" w-full max-w-109 h-full flex flex-col gap-3 sm:gap-5 px-4 sm:px-0">
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
                gmail:gmailInpValue,
                newPassword: "",
                newPassword1: "",
                resetValue: "",
                baseUrl: "",
              }}
              validationSchema={Yup.object({
                newPassword1: Yup.string()
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
                newPassword: Yup.string()
                  .required("لطفا تکرار رمز عبور را وارد کنید")
                  .oneOf(
                    [Yup.ref("newPassword1")],
                    "رمز عبور و تکرار آن مطابقت ندارند",
                  ),
                resetValue: Yup.string()
                .required("لطفا کد تایید را وارد کنید")
                .length(6, "کد تایید باید ۶ رقمی باشد")
                .matches(/^[0-9]{6}$/, "کد تایید فقط باید شامل اعداد باشد"),
              })}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form className=" w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
                  <div className="flex flex-col gap-3 sm:gap-5">
                    <div className="w-full flex flex-col gap-1 sm:gap-1.5">
                      <label
                        htmlFor="newPassword1"
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
                          id="newPassword1"
                          name="newPassword1"
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
                        name="newPassword1"
                        component="div"
                        className=" text-xs text-red-600 "
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1 sm:gap-1.5">
                      <label
                        htmlFor="newPassword"
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
                          id="newPassword"
                          name="newPassword"
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
                        name="newPassword"
                        component="div"
                        className=" text-xs text-red-600 "
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:gap-5">
                      <label className="font-bold text-lg">کد تایید</label>

                      <InputOTP
                        className="flex-row-reverse justify-center"
                        maxLength={6}
                        isInvalid={errors.resetValue && touched.resetValue}
                        inputMode="numeric"
                        pattern="^[0-9]+$"
                        variant="secondary"
                        value={values.resetValue}
                        onChange={(newValue) =>
                          setFieldValue("resetValue", newValue)
                        }
                        name="resetValue"
                      >
                        <InputOTP.Group className="gap-2 flex-row-reverse">
                          <InputOTP.Slot
                            index={0}
                            className="h-12 w-12 rounded-xl border-2 border-default-200 focus:border-primary text-lg font-bold"
                          />
                          <InputOTP.Slot
                            index={1}
                            className="h-12 w-12 rounded-xl border-2 border-default-200 focus:border-primary text-lg font-bold"
                          />
                          <InputOTP.Slot
                            index={2}
                            className="h-12 w-12 rounded-xl border-2 border-default-200 focus:border-primary text-lg font-bold"
                          />
                        </InputOTP.Group>
                        <InputOTP.Separator className="mx-2 text-xl text-muted" />
                        <InputOTP.Group className="gap-2 flex-row-reverse">
                          <InputOTP.Slot
                            index={3}
                            className="h-12 w-12 rounded-xl border-2 border-default-200 focus:border-primary text-lg font-bold"
                          />
                          <InputOTP.Slot
                            index={4}
                            className="h-12 w-12 rounded-xl border-2 border-default-200 focus:border-primary text-lg font-bold"
                          />
                          <InputOTP.Slot
                            index={5}
                            className="h-12 w-12 rounded-xl border-2 border-default-200 focus:border-primary text-lg font-bold"
                          />
                        </InputOTP.Group>
                      </InputOTP>

                      {errors.resetValue && touched.resetValue && (
                        <span className="text-xs text-red-600">
                          {errors.resetValue}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
                  >
                    تایید
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
