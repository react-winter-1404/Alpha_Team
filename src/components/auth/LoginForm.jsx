import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LockPasswordIcon,
  ViewIcon,
  SecurityPasswordIcon,
  Mail02Icon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginForm = ({ submitFunction }) => {
  const { t } = useTranslation("auth");
  const [isHidenPass, setIsHidenPass] = useState(true);

  const validationSchema = Yup.object({
    phoneOrGmail: Yup.string()
      .required(t("errors.emailOrPhoneRequired"))
      .test("email-or-phone", t("errors.emailOrPhoneInvalid"), (value) => {
        if (!value) return false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^09[0-9]{9}$/;

        const isEmail = emailRegex.test(value);
        const isPhone = phoneRegex.test(value);

        if (isEmail) {
          const validDomains =
            /@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
          return validDomains.test(value);
        }

        if (isPhone) {
          return value.length === 11 && phoneRegex.test(value);
        }

        return false;
      }),
    password: Yup.string()
      .min(8, t("errors.passwordMin"))
      .required(t("errors.passwordRequired"))
      .max(32, t("errors.passwordMax"))
      .matches(/[a-z]/, t("errors.passwordLowercase"))
      .matches(/[A-Z]/, t("errors.passwordUppercase"))
      .matches(/\d/, t("errors.passwordNumber"))
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        t("errors.passwordSpecial"),
      ),
    rememberMe: Yup.boolean(),
  });

  return (
    <div className="w-full max-w-109 h-full flex flex-col gap-3 sm:gap-5 px-4 sm:px-0">
      <div className="w-full flex flex-col gap-4 sm:gap-6">
        <div className="flex gap-1.5 items-center text-2xl sm:text-3xl font-bold text-foreground">
          <div>{t("login.welcomeBack")}</div>
          <div className="text-lg sm:text-[25px]">👋</div>
        </div>
        <div className="font-light text-sm sm:text-base text-muted">
          {t("login.description")}
        </div>
      </div>

      <Formik
        onSubmit={submitFunction}
        initialValues={{ phoneOrGmail: "", password: "", rememberMe: false }}
        validationSchema={validationSchema}
      >
        <Form className="w-full flex flex-col gap-3 sm:gap-4.25 pt-0.5 mt-3 sm:mt-5">
          <div className="flex flex-col gap-3 sm:gap-5">
            <div className="w-full flex flex-col gap-1 sm:gap-1.5">
              <label
                htmlFor="phoneOrGmail"
                className="font-bold text-sm sm:text-[16px] mr-0.5 text-foreground"
              >
                {t("login.emailOrPhone")}
              </label>
              <div className="h-10 sm:h-11.25 flex items-center gap-4 px-3 bg-surface-secondary rounded-xl">
                <HugeiconsIcon
                  icon={Mail02Icon}
                  className="w-5 sm:w-6 text-default-foreground"
                />
                <Field
                  id="phoneOrGmail"
                  name="phoneOrGmail"
                  type="text"
                  className="w-full h-full outline-0 text-[10px] sm:text-xs focus:text-sm duration-200 bg-transparent text-foreground"
                  placeholder={t("login.emailOrPhonePlaceholder")}
                />
              </div>
              <ErrorMessage
                name="phoneOrGmail"
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

          <div className="flex justify-between items-center gap-2 sm:gap-0">
            <div className="flex mr-0.5 gap-1 sm:gap-1.5">
              <Field
                id="rememberMe"
                name="rememberMe"
                type="checkBox"
                className="accent-accent rounded-lg w-4 sm:w-4.75 h-4 sm:h-4.75"
              />
              <label
                htmlFor="rememberMe"
                className="font-bold text-xs sm:text-[13px] text-foreground"
              >
                {t("login.rememberMe")}
              </label>
            </div>
            <Button
              variant="secondary"
              className="bg-accent/20 text-accent font-bold text-[10px] sm:text-xs"
            >
              <HugeiconsIcon icon={SecurityPasswordIcon} />
              <Link to={'/Auth/ForgotPassword'}>{t("login.forgotPassword")}</Link>
            </Button>
          </div>

          <Button
            variant="primary"
            type="submit"
            className="w-full h-10 sm:h-11 font-bold text-sm sm:text-[16px]"
          >
            {t("login.submit")}
          </Button>
        </Form>
      </Formik>

      <div className="w-full flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-foreground">
        <div>{t("login.noAccount")}</div>
        <Link to={'/Auth/Register'} className="underline underline-offset-4 text-accent">{t("login.createAccount")}</Link>
      </div>
    </div>
  );
};

export default LoginForm;