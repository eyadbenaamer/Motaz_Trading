import { useDispatch } from "react-redux";

import { clearSessionStorage } from "state";

import Form from "./Form";
import Header from "components/header";

import mainImage from "assets/main_expanded.png";

const Login = () => {
  const dispatch = useDispatch();

  // clear stored fields in signup and reset password pages
  dispatch(clearSessionStorage());

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
          <div className="auth flex flex-col gap-3 w-fit shadow-md rounded-xl p-4 px-16 bg-100">
            <h2 className="text-2xl font-bold">دخول لوحة التحكم</h2>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
