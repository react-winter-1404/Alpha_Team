import { Button, InputOTP } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowMoveUpLeftIcon,
  TimeQuarterPassIcon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
  SmartPhone02Icon,
} from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const RegisterForm = ({step,submitFuncOne,submitFuncTwo,submitFuncThree}) => {

  const [isHidenPass, setIsHidenPass] = useState(true);
  const [gmailInpValue, setGmailInpValue] = useState("");

  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerActive]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimer(180);
    setIsTimerActive(true);
    // اینجا API call برای ارسال مجدد کد
    console.log("Resending OTP...");
  };

  return (
    <div className="border border-red-600 w-full max-w-109 h-full flex flex-col gap-3 sm:gap-5 px-4 sm:px-0">
      <div className="w-full flex flex-col gap-4 sm:gap-6">
        <div className="flex gap-1.5 items-center text-2xl sm:text-3xl font-bold">
          <div className="">به آکادمی بحر خوش اومدی! </div>
          <div className="text-lg sm:text-[25px]">😍</div>
        </div>
        {step == 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="font-light text-sm sm:text-base text-muted">
              {" "}
              لطفا برای ثبت نام شماره همراه خود را وارد کنید تا برای شما کد
              تایید ارسال شود{" "}
            </div>
          </motion.div>
        )}
        {step == 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="font-light text-sm sm:text-base text-muted">
              {" "}
              لطفا کد ارسال شده به ایمیل{" "}
              <span className=" text-accent font-bold ">
                {gmailInpValue}
              </span>{" "}
              را وارد نمایید{" "}
            </div>
          </motion.div>
        )}
        {step == 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="font-light text-sm sm:text-base text-muted">
              لطفا اطلاعات شخصی حساب کاربری خود را وارد کنید{" "}
            </div>
          </motion.div>
        )}
      </div>
      {step == 1 && (
        <motion.div
          className="w-full flex flex-col gap-3 sm:gap-5"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Formik
            initialValues={{
              gmail: "",
              password: "",
              verifyCode: "",
              phoneNumber: "",
            }}
            validationSchema={Yup.object({
              gmail: Yup.string()
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
              setIsTimerActive(true);
              setGmailInpValue(values.gmail);
            }}
          >
            {() => (
              <Form className="border border-black w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
                <div className="flex flex-col gap-3 sm:gap-5">
                  <label
                    htmlFor="gmail"
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
                      id="gmail"
                      name="gmail"
                      type="text"
                      className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200"
                      placeholder="ایمیل خود را وارد کنید"
                    />
                  </div>
                  <ErrorMessage
                    name="gmail"
                    component="div"
                    className="text-xs text-red-600"
                  />
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
                >
                  ارسال کد تایید
                </Button>
              </Form>
            )}
          </Formik>

          <div className="w-full flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
            <div className="">حساب کاربری دارید؟</div>
            <div className="underline underline-offset-4">
              ورود به حساب کاربری
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
          <Formik
            onSubmit={(values) => {
                console.log(values);
                submitFuncTwo(values)
            }}
            initialValues={{
              gmail: "",
              password: "",
              verifyCode: "",
              phoneNumber: "",
            }}
            validationSchema={Yup.object({
              verifyCode: Yup.string()
                .required("لطفا کد تایید را وارد کنید")
                .length(6, "کد تایید باید ۶ رقمی باشد")
                .matches(/^[0-9]{6}$/, "کد تایید فقط باید شامل اعداد باشد"),
            })}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <>
                <Form className="border border-black w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
                  <div className="flex flex-col gap-3 sm:gap-5">
                    <label className="font-bold text-lg">کد تایید</label>

                    <InputOTP
                      className="flex-row-reverse justify-center"
                      maxLength={6}
                      isInvalid={errors.verifyCode && touched.verifyCode}
                      inputMode="numeric"
                      pattern="^[0-9]+$"
                      variant="secondary"
                      value={values.verifyCode}
                      onChange={(newValue) =>
                        setFieldValue("verifyCode", newValue)
                      }
                      name="verifyCode"
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

                    {errors.verifyCode && touched.verifyCode && (
                      <span className="text-xs text-red-600">
                        {errors.verifyCode}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
                  >
                    تایید
                  </Button>
                </Form>

                <div className="w-full flex justify-between text-xs sm:text-sm font-bold">
                  <div className="h-full flex gap-2 sm:gap-3 items-center text-accent">
                    <div className="bg-[rgba(55,114,255,0.231)] text-accent flex items-center gap-2 font-bold text-[10px] sm:text-xs px-3.5 py-1 rounded-full">
                      <HugeiconsIcon icon={TimeQuarterPassIcon} />
                      {formatTimer(timer)}
                    </div>
                    <div
                      onClick={() => {
                        if (timer === 0) {
                          resetTimer();
                        }
                      }}
                      className={`underline underline-offset-4 text-xs ${timer !== 0 && "text-foreground"} ${timer == 0 && "cursor-pointer"}`}
                    >
                      ارسال مجدد کد
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-[rgba(55,114,255,0.231)] text-accent font-bold text-[10px] sm:text-xs"
                  >
                    تغییر شماره همراه
                    <HugeiconsIcon icon={ArrowMoveUpLeftIcon} />
                  </Button>
                </div>
              </>
            )}
          </Formik>
        </motion.div>
      )}
      {step == 3 && (
        <motion.div
          className="w-full flex flex-col gap-3 sm:gap-5"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Formik
            onSubmit={(values) => {
              console.log(values);
              submitFuncThree(values);
            }}
            initialValues={{
              gmail: "",
              password: "",
              verifyCode: "",
              phoneNumber: "",
            }}
            validationSchema={Yup.object({
              phoneNumber: Yup.string()
                .required("لطفا شماره تماس خود را وارد کنید")
                .length(11, "شماره تماس معتبر نیست")
                .matches(/^09[0-9]{9}$/, "شماره تماس معتبر نیست"),
              password: Yup.string()
                .required("لطفا رمز عبور را وارد کنید")
                .min(8, "رمز عبور نمیتونه کمتر از ۸ کاراکتر باشه")
                .max(32, "رمز عبور نمیتواند بیشتر از ۳۲ کاراکتر باشد")
                .matches(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک داشته باشد")
                .matches(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد")
                .matches(/\d/, "رمز عبور باید حداقل یک عدد داشته باشد")
                .matches(
                  /[!@#$%^&*(),.?":{}|<>]/,
                  "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد",
                ),
            })}
          >
            <Form className="border border-black w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
              <div className="flex flex-col gap-3 sm:gap-5">
                <div className="w-full flex flex-col gap-1 sm:gap-1.5">
                  <label
                    htmlFor="phoneNumber"
                    className="font-bold text-sm sm:text-[16px] mr-0.5"
                  >
                    شماره همراه
                  </label>
                  <div className="h-10 sm:h-11.25 flex items-center gap-4 px-3 bg-surface-secondary rounded-xl ">
                    <HugeiconsIcon
                      icon={SmartPhone02Icon}
                      className="w-4 sm:w-5 text-default-foreground"
                    />
                    <Field
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200"
                      placeholder="شماره همراه خود را وارد کنید"
                    />
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className=" text-xs text-red-600 "
                  />
                </div>
                <div className="w-full flex flex-col gap-1 sm:gap-1.5">
                  <label
                    htmlFor="password"
                    className="font-bold text-sm sm:text-[16px] mr-0.5"
                  >
                    رمزعبور
                  </label>
                  <div className="h-10 sm:h-11.25 flex items-center gap-4 px-3 bg-surface-secondary rounded-xl ">
                    <HugeiconsIcon
                      icon={LockPasswordIcon}
                      className="w-5 sm:w-6 text-default-foreground"
                    />
                    <Field
                      id="password"
                      name="password"
                      type={isHidenPass ? "password" : "text"}
                      className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200"
                      placeholder="رمزعبور خود را وارد کنید"
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
                    name="password"
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
                ثبت اطلاعات
              </Button>
            </Form>
          </Formik>
        </motion.div>
      )}
    </div>
  );
};

export default RegisterForm;
