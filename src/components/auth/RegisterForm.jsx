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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterForm = ({
  step,
  submitFuncOne,
  submitFuncTwo,
  submitFuncThree,
}) => {
  const { t } = useTranslation("auth");
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
    console.log("Resending OTP...");
  };

  return (
    <div className="w-full max-w-109 h-full flex flex-col gap-3 sm:gap-5 px-4 sm:px-0">
      <div className="w-full flex flex-col gap-4 sm:gap-6">
        <div className="flex gap-1.5 items-center text-2xl sm:text-3xl font-bold text-foreground">
          <div>{t("register.welcome")}</div>
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
              {t("register.step1Desc")}
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
              {t("register.step2Desc")}
              <span className="text-accent font-bold">
                {gmailInpValue}
              </span>
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
              {t("register.step3Desc")}
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
                .email(t("errors.emailInvalid"))
                .required(t("errors.emailRequired"))
                .matches(
                  /@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/,
                  t("errors.emailDomainInvalid"),
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
              <Form className="w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
                <div className="flex flex-col gap-3 sm:gap-5">
                  <label
                    htmlFor="gmail"
                    className="font-bold text-sm sm:text-[16px] mr-0.5 text-foreground"
                  >
                    {t("register.email")}
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
                      className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200 bg-transparent text-foreground"
                      placeholder={t("register.emailPlaceholder")}
                    />
                  </div>
                  <ErrorMessage
                    name="gmail"
                    component="div"
                    className="text-xs text-danger"
                  />
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
                >
                  {t("register.sendCode")}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="w-full flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-foreground">
            <div>{t("register.hasAccount")}</div>
            <Link to={"/Auth/Login"} className="underline underline-offset-4 text-accent">
              {t("register.loginLink")}
            </Link>
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
              console.log({
                ...values,
                verifyCode: Number(values.verifyCode),
              });
              submitFuncTwo({
                ...values,
                verifyCode: Number(values.verifyCode),
              });
            }}
            initialValues={{
              gmail: `${gmailInpValue}`,
              password: "",
              verifyCode: "",
              phoneNumber: "",
            }}
            validationSchema={Yup.object({
              verifyCode: Yup.string()
                .required(t("errors.verifyCodeRequired"))
                .length(6, t("errors.verifyCodeLength"))
                .matches(/^[0-9]{6}$/, t("errors.verifyCodeNumbers")),
            })}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <>
                <Form className="w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
                  <div className="flex flex-col gap-3 sm:gap-5">
                    <label className="font-bold text-lg text-foreground">{t("register.verifyCode")}</label>

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
                      <span className="text-xs text-danger">
                        {errors.verifyCode}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
                  >
                    {t("register.confirm")}
                  </Button>
                </Form>

                <div className="w-full flex justify-between text-xs sm:text-sm font-bold">
                  <div className="h-full flex gap-2 sm:gap-3 items-center text-accent">
                    <div className="bg-accent/20 text-accent flex items-center gap-2 font-bold text-[10px] sm:text-xs px-3.5 py-1 rounded-full">
                      <HugeiconsIcon icon={TimeQuarterPassIcon} />
                      {formatTimer(timer)}
                    </div>
                    <div
                      onClick={() => {
                        if (timer === 0) {
                          resetTimer();
                        }
                      }}
                      className={`underline underline-offset-4 text-xs ${timer !== 0 ? "text-foreground" : "text-accent cursor-pointer"}`}
                    >
                      {t("register.resendCode")}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-accent/20 text-accent font-bold text-[10px] sm:text-xs"
                  >
                    {t("register.changeEmail")}
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
              gmail: `${gmailInpValue}`,
              password: "",
              verifyCode: "",
              phoneNumber: "",
            }}
            validationSchema={Yup.object({
              phoneNumber: Yup.string()
                .required(t("errors.phoneRequired"))
                .length(11, t("errors.phoneLength"))
                .matches(/^09[0-9]{9}$/, t("errors.phoneInvalid")),
              password: Yup.string()
                .required(t("errors.passwordRequired"))
                .min(8, t("errors.passwordMin"))
                .max(32, t("errors.passwordMax"))
                .matches(/[a-z]/, t("errors.passwordLowercase"))
                .matches(/[A-Z]/, t("errors.passwordUppercase"))
                .matches(/\d/, t("errors.passwordNumber"))
                .matches(
                  /[!@#$%^&*(),.?":{}|<>]/,
                  t("errors.passwordSpecial"),
                ),
            })}
          >
            <Form className="w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
              <div className="flex flex-col gap-3 sm:gap-5">
                <div className="w-full flex flex-col gap-1 sm:gap-1.5">
                  <label
                    htmlFor="phoneNumber"
                    className="font-bold text-sm sm:text-[16px] mr-0.5 text-foreground"
                  >
                    {t("register.phoneNumber")}
                  </label>
                  <div className="h-10 sm:h-11.25 flex items-center gap-4 px-3 bg-surface-secondary rounded-xl">
                    <HugeiconsIcon
                      icon={SmartPhone02Icon}
                      className="w-4 sm:w-5 text-default-foreground"
                    />
                    <Field
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200 bg-transparent text-foreground"
                      placeholder={t("register.phoneNumberPlaceholder")}
                    />
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-xs text-danger"
                  />
                </div>
                <div className="w-full flex flex-col gap-1 sm:gap-1.5">
                  <label
                    htmlFor="password"
                    className="font-bold text-sm sm:text-[16px] mr-0.5 text-foreground"
                  >
                    {t("login.password")}
                  </label>
                  <div className="h-10 sm:h-11.25 flex items-center gap-4 px-3 bg-surface-secondary rounded-xl">
                    <HugeiconsIcon
                      icon={LockPasswordIcon}
                      className="w-5 sm:w-6 text-default-foreground"
                    />
                    <Field
                      id="password"
                      name="password"
                      type={isHidenPass ? "password" : "text"}
                      className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200 bg-transparent text-foreground"
                      placeholder={t("login.passwordPlaceholder")}
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
                    className="text-xs text-danger"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
              >
                {t("register.submitInfo")}
              </Button>
            </Form>
          </Formik>
        </motion.div>
      )}
    </div>
  );
};

export default RegisterForm;