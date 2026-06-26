import Steps from "../components/auth/Steps";
import { motion } from "framer-motion";
import RegisterForm from "../components/auth/RegisterForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  postRgisterDataStpOne,
  postRgisterDataStpThree,
  postRgisterDataStpTwo,
} from "../core/services/Auth/post";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const fetchRgisterStpOne = async (values) => {
    try {
      const response = await postRgisterDataStpOne(values);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const fetchRgisterStpTwo = async (values) => {
    try {
      const response = await postRgisterDataStpTwo(values);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setStep(3);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.message);
    }
  };
  const fetchRgisterStpThree = async (values) => {
    try{
    const response = await postRgisterDataStpThree(values);
    console.log(response.data);
    if (response.data.success) {
      toast.success("ثبت نام شما با موفقیت انجام شد!");
      navigate("/Auth/Login");
    }else{
      toast.error(response.data.message);
    }} catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="   w-full h-full flex flex-col-reverse sm:flex-row gap-5 sm:gap-0 ">
      <div className="  h-full w-full sm:w-[41.5%] flex flex-col justify-center sm:justify-start gap-10.75 lg:px-11.5 md:px-5 sm:px-0  sm:py-20.25 bg-default ">
        <div className=" absolute top-6 right-3 sm:top-0 sm:right-0 sm:relative  w-15 overflow-hidden sm:w-full h-11.75 flex items-center gap-1.5 px-1 ">
          <img src="/public/images/imageLogo.png" alt="" className=" h-full " />
          <img
            src="/public/images/textLogo.png"
            alt=""
            className=" h-[65%] mt-0.75 w-38 "
          />
        </div>
        <motion.div
          className="  w-full  flex "
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Steps
            step={step}
            stepsList={[
              { id: 1, describe: "وارد کردن ایمیل" },
              { id: 2, describe: "تایید کد ارسال شده به ایمیل" },
              { id: 3, describe: "وارد کردن اطلاعات حساب کاربری" },
            ]}
          />
        </motion.div>
      </div>
      <div className="  w-full sm:w-[58.5%] flex items-center pt-23 lg:pr-[calc(8.75%+1.5px)] px-4 ">
        <motion.div
          className="  w-full h-full flex justify-center lg:justify-start "
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <RegisterForm
            step={step}
            submitFuncOne={fetchRgisterStpOne}
            submitFuncTwo={fetchRgisterStpTwo}
            submitFuncThree={fetchRgisterStpThree}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
