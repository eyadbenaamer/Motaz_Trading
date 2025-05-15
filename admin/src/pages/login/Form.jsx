import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setToken } from "state";

import SubmitBtn from "components/SubmitBtn";

import axiosClient from "utils/AxiosClient";

import { ReactComponent as ShowPasswordIcon } from "assets/icons/eye.svg";
import { ReactComponent as HidePasswordIcon } from "assets/icons/hide.svg";

const Form = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const submitButton = useRef(null);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [inputError, setInputError] = useState({ username: "", password: "" });
  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      submitButton.current.click();
    }
  };

  const submit = async () => {
    await axiosClient
      .post(`/admin/login`, data)
      .then((response) => {
        const { token } = response.data;
        // set all accounts info once login
        localStorage.setItem("token", token);

        dispatch(setToken(token));
      })
      .catch((error) => {
        const { message } = error.response.data;
        setMessage(message);
      });
  };

  return (
    <section className="flex flex-col gap-4 w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="col-span-1">
          <label htmlFor="username">اسم المستخدم</label>
          <input
            dir="ltr"
            style={{
              border: "2px solid transparent",
              borderRadius: "8px",
              boxShadow: "0px 1px 3px 0px #00000026",
            }}
            className="flex bg-200p-[4px]"
            type="text"
            name="username"
            autoFocus
            value={data.username}
            onChange={(e) => {
              if (e.target.value) {
                e.target.style.border = "2px solid transparent";
                setInputError({ ...inputError, username: "" });
              } else {
                e.target.style.border = "2px solid red";
                setInputError({ ...inputError, username: "هذا الحقل مطلوب" });
              }
              setData({ ...data, username: e.target.value });
            }}
            onKeyDown={handleEnterSubmit}
          />
          <div className="text-[red]">{inputError.username}</div>
        </div>
        <div className="col-span-1">
          <label htmlFor="password">كلمة المرور</label>
          <div className="relative w-full">
            <input
              style={{
                border: "2px solid transparent",
                borderRadius: "8px",
                boxShadow: "0px 1px 3px 0px #00000026",
              }}
              dir="ltr"
              className="pe-7 bg-200 p-[4px]"
              autoComplete="false"
              type={passwordInputType}
              name="password"
              value={data.password}
              onChange={(e) => {
                if (e.target.value) {
                  e.target.style.border = "2px solid transparent";
                  setInputError({ ...inputError, password: "" });
                } else {
                  e.target.style.border = "2px solid red";
                  setInputError({ ...inputError, password: "هذا الحقل مطلوب" });
                }
                setData({ ...data, password: e.target.value });
              }}
              onKeyDown={handleEnterSubmit}
            />
            <button
              className="absolute w-5 right-[5px] top-[8px]"
              onClick={() =>
                setPasswordInputType(
                  passwordInputType === "password" ? "text" : "password"
                )
              }
            >
              {passwordInputType === "password" ? (
                <ShowPasswordIcon />
              ) : (
                "text" && <HidePasswordIcon />
              )}
            </button>
          </div>
          <div className="text-[red]">{inputError.password}</div>
        </div>
      </div>
      {message && <div className="text-[red]">{message}</div>}
      <div className="self-center">
        <SubmitBtn
          ref={submitButton}
          onClick={async () => {
            await submit();
          }}
        >
          الدخول
        </SubmitBtn>
      </div>
    </section>
  );
};
export default Form;
