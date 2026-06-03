import LoginForm from "../components/auth/LoginForm";
import Steps from "../components/auth/Steps";
import { motion } from "framer-motion";
import { postLogin } from "../core/services/Auth/post";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  // const navigate = useNavigate();

  const fetchLogin = async (values) => {
    try {
      const response = await postLogin(values);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        if (response.data.token) {
          // navigate('/');
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("isLogin", true);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" border  w-full h-full flex flex-col-reverse sm:flex-row gap-5 sm:gap-0 ">
      <div className=" border h-full w-full sm:w-[41.5%] flex flex-col justify-center sm:justify-start gap-10.75 lg:px-11.5 md:px-5 sm:px-0  sm:py-20.25 bg-surface-secondary ">
        <div className=" absolute top-6 right-3 sm:top-0 sm:right-0 sm:relative border w-15 overflow-hidden sm:w-full h-11.75 flex items-center gap-1.5 px-1 ">
          <img src="/public/images/imageLogo.png" alt="" className=" h-full " />
          <img
            src="/public/images/textLogo.png"
            alt=""
            className=" h-[65%] mt-0.75 w-38 "
          />
        </div>
        <motion.div
          className=" border border-blue-600  w-full  flex "
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Steps
            step={1}
            stepsList={[{ id: 1, describe: "وارد کردن شماره همراه یا ایمیل" }]}
          />
        </motion.div>
      </div>
      <div className=" border w-full sm:w-[58.5%] flex items-center pt-23 lg:pr-[calc(8.75%+1.5px)] px-4 ">
        <motion.div
          className=" border border-blue-600  w-full h-full flex justify-center lg:justify-start "
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <LoginForm submitFunction={fetchLogin} />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
