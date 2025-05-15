import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import Form from "./form";
import Header from "components/header";

import { setResetPasswordInfo } from "state";

import mainImage from "assets/main_expanded.png";

const Signup = () => {
  const [isSignedup, setIsSignedup] = useState(false);
  const dispatch = useDispatch();

  // clear stored fields in reset page
  dispatch(setResetPasswordInfo(null));

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${mainImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {isSignedup && <Navigate to={"/verify-account"} />}
      <Header trnasparent />
      <div className="flex justify-center items-center w-full h-[calc(100svh-60px)]">
        <div className="auth flex flex-col gap-3 w-fit my-5 mx-auto shadow-md rounded-xl p-4 bg-300 border">
          <h2 className="text-2xl font-bold">إنشاء حساب</h2>
          <Form setIsSignup={setIsSignedup} />
          <div>
            لديك حساب؟
            <Link
              tabIndex={1}
              to="/login"
              className=" hover:underline text-hover"
            >
              سجل الدخول من هنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
