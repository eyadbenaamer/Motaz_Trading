import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Lottie from "react-lottie";

import { ReactComponent as ShowPasswordIcon } from "assets/icons/eye.svg";
import { ReactComponent as HidePasswordIcon } from "assets/icons/hide.svg";
import tickAnimationData from "assets/icons/tick.json";
import crossAnimationData from "assets/icons/cross.json";

const PasswordInput = (props) => {
  const { setData, fieldValue, setIsValid, data, name, label } = props;

  const [inputType, setInputType] = useState("password");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [focused, setFocused] = useState(false);
  const [changed, setChanged] = useState(false);
  const [check, setCheck] = useState({ state: "", message: "" });

  const input = useRef(null);

  const verifyValue = () => {
    if (name === "password") {
      if (!fieldValue) {
        input.current.style.border = "solid 2px red";
        setData((prev) => ({ ...prev, password: fieldValue }));
        setCheck({ state: "fail", message: "هذا الحقل مطلوب" });
        return;
      }
      const isValid = fieldValue?.length >= 8 && fieldValue?.length <= 50;
      if (isValid) {
        setData((prev) => ({
          ...prev,
          [name]: fieldValue.trim(),
        }));
        input.current.style.border = "solid 2px green";
        setCheck({ state: "success" });
        return;
      }
      if (!isValid) {
        input.current.style.border = "solid 2px red";
        setData((prev) => ({ ...prev, [name]: fieldValue }));
        setCheck({
          state: "fail",
          message: "كلمة مرور غير صالحة",
        });
      }
      return;
    }
    if (name === "confirmPassword") {
      if (!input.current.value) {
        input.current.style.border = "solid 2px red";
        setCheck({ state: "fail", message: "هذا الحقل مطلوب" });
        return;
      }
      if (input.current.value === data.password) {
        input.current.style.border = "solid 2px green";
        setCheck({ state: "success" });
      } else {
        input.current.style.border = "solid 2px red";
        setCheck({ state: "fail", message: "كلمتا المرور غير متطابقتين" });
      }
    }
  };

  useEffect(
    () => setIsValid(check.state === "success" ? true : false),
    [check]
  );

  useEffect(() => {
    if (!focused && fieldValue && input.current) {
      verifyValue(input.current);
    }
  }, []);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className="flex gap-2 items-center">
        <div className="relative w-full">
          <input
            dir="ltr"
            tabIndex={1}
            ref={input}
            style={{
              border: "2px solid transparent",
              borderRadius: "8px",
              boxShadow: "0px 1px 3px 0px #00000026",
            }}
            className="pe-7 p-1"
            type={inputType}
            name={name}
            defaultValue={name === "password" ? data.password : ""}
            onFocus={(e) => {
              e.target.style.border = "solid 2px transparent";
              if (name === "password") {
                setShowPasswordForm(true);
              }
              if (!changed) {
                setChanged(true);
              }
              setFocused(true);
            }}
            onChange={(e) => {
              const value = e.target.value.trim();
              setData((prev) => ({ ...prev, [name]: value }));
              window.sessionStorage.setItem([e.target.name], value);
              if (!focused && changed) {
                verifyValue(e.target);
              }
            }}
            onBlur={(e) => {
              verifyValue(e.target);
              setFocused(false);
              setShowPasswordForm(false);
            }}
          />
          <button
            tabIndex={-1}
            className="absolute w-5 right-[5px] top-[8px]"
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
          >
            {inputType === "password" ? (
              <ShowPasswordIcon />
            ) : (
              "text" && <HidePasswordIcon />
            )}
          </button>
          {showPasswordForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute text-sm right-0 bottom-16 shadow-sm z-50 min-w-full bg-200 py-2 ps-2 rounded-xl"
            >
              <div>يجب أن تتكون من 8 أحرف على الأقل</div>
              <div>يجب ألا تتعدى 50 حرفًا</div>
            </motion.div>
          )}
        </div>
        <div className="w-10">
          {!focused && (
            <>
              {check.state === "fail" ? (
                <Lottie
                  width={36}
                  height={36}
                  options={{
                    loop: false,
                    autoplay: true,
                    animationData: crossAnimationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
              ) : check.state === "success" ? (
                <Lottie
                  width={24}
                  height={24}
                  options={{
                    loop: false,
                    autoplay: true,
                    animationData: tickAnimationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>

      <div className="text-[red] h-3 text-sm">
        {!focused ? check.message : ""}
      </div>
    </>
  );
};

export default PasswordInput;
