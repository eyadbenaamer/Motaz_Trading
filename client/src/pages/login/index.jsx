import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearSessionStorage, setResetPasswordInfo } from "state";

import Form from "./Form";
import Header from "components/header";

import mainImage from "assets/main_expanded.png";

const Login = () => {
  const dispatch = useDispatch();

  // clear stored fields in signup and reset password pages
  dispatch(clearSessionStorage());
  dispatch(setResetPasswordInfo(null));

  return (
    <div
      style={{
        backgroundImage: `url(${mainImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Header trnasparent />
      <div className="flex h-[calc(100svh-60px)]">
        <div className="h-full flex flex-col justify-center p-4 items-center w-full">
          <div className="auth flex flex-col gap-3 shadow-md rounded-xl p-4 bg-100 w-fit px-16">
            <h2 className="text-2xl font-bold">تسجيل الدخول</h2>
            <Form />
            <div>
              ليس لديك حساب؟
              <Link to="/signup" className=" hover:underline text-hover">
                سجّل من هنا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
