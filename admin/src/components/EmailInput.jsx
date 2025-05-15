import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";

import axiosClient from "utils/AxiosClient";

import tickAnimationData from "assets/icons/tick.json";
import crossAnimationData from "assets/icons/cross.json";
import { ReactComponent as LoadingIcon } from "assets/icons/loading-circle.svg";

const EmailInput = (props) => {
  const { value, setData, setIsValid, type } = props;
  const regex = /((\w)+.?)+@\w{1,}\.\w{2,}/gi;

  const [check, setCheck] = useState({ state: "", message: "" });
  const [focused, setFocused] = useState(false);
  const [changed, setChanged] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const input = useRef(null);

  const verifyValue = () => {
    if (!value) {
      input.current.style.border = "solid 2px red";
      setData((prev) => ({ ...prev, email: value }));
      setIsEmailChecked(true);
      setCheck({ state: "fail", message: "هذا الحقل مطلوب" });
      return;
    }
    const isValid = regex.test(value);
    if (isValid) {
      setData((prev) => ({
        ...prev,
        email: value.trim().toLowerCase(),
      }));

      // checking of email availability
      axiosClient(`check_email_availability/${type}/${value}`)
        .then((response) => {
          const { message } = response.data;
          input.current.style.border = "solid 2px green";
          setCheck({
            state: "success",
            message,
          });
          setIsEmailChecked(true);
        })
        .catch((error) => {
          setIsEmailChecked(true);
          setCheck({ state: "fail", message: error.response.data.message });
          input.current.style.border = "solid 2px red";
        });
      return;
    }
    if (!isValid) {
      input.current.style.border = "solid 2px red";
      setData((prev) => ({ ...prev, email: value }));
      setIsEmailChecked(true);
      setCheck({
        state: "fail",
        message: "بريد إلتكروني غير صالح",
      });
    }
  };

  useEffect(
    () => setIsValid(check.state === "success" ? true : false),
    [check]
  );

  useEffect(() => {
    if (!focused && value && input.current) {
      verifyValue(input.current);
    }
  }, [value]);

  return (
    <>
      <label htmlFor="email">البريد الإلتكروني</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          name="email"
          tabIndex={1}
          ref={input}
          defaultValue={value}
          style={{
            borderRadius: 8,
            boxShadow: "0px 1px 3px 0px #00000026",
            border: "solid 2px transparent",
          }}
          className="p-[4px] bg-200"
          onFocus={(e) => {
            e.target.style.border = "solid 2px transparent";
            setIsEmailChecked(false);
            setFocused(true);
            if (!changed) {
              setChanged(true);
            }
          }}
          onChange={(e) => {
            const value = e.target.value.trim();
            setData((prev) => ({ ...prev, email: value }));
            window.sessionStorage.setItem("email", value);
            if (!focused && changed) {
              verifyValue(e.target);
            }
          }}
          onBlur={() => {
            verifyValue();
            setFocused(false);
          }}
        />
        <div className="w-10">
          {!focused &&
            value &&
            (!isEmailChecked ? (
              <LoadingIcon />
            ) : (
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
            ))}
        </div>
      </div>
      <div
        className={`${
          check.state === "fail" ? "text-[red]" : "text-[green]"
        } h-7`}
      >
        {!focused && check.message}
      </div>
    </>
  );
};

export default EmailInput;
