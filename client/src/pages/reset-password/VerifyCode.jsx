import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubmitBtn from "components/SubmitBtn";

import { setResetPasswordInfo } from "state";
import axiosClient from "utils/AxiosClient";

const VerifyCode = () => {
  const { email } = useSelector((state) => state.resetPasswordInfo);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const sendCode = async () => {
    await axiosClient
      .post(`verify_reset_password`, { code, email })
      .then((response) => {
        const { token } = response.data;
        dispatch(setResetPasswordInfo({ token, message: "" }));
      })
      .catch(async (error) => {
        let { message } = error.response.data;
        if (message === "jwt expired") {
          axiosClient.post(`send_verification_code`, {
            type: "reset_password",
            email,
          });
          message = "انتهت صلاحية رمز التحقق، لقد قمنا بإرسال رمز تحقق آخر.";
        }
        dispatch(setResetPasswordInfo({ message }));
      });
  };
  const sendBtn = useRef(null);

  return (
    <>
      <h1>أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني</h1>
      <div className="flex flex-col items-center sm:items-start">
        <div className="border-2 my-3 rounded-lg p-2">
          <input
            className="w-20 text-xl font-bold"
            style={{ letterSpacing: 1 }}
            type="text"
            value={code}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendBtn.current.click();
              }
            }}
            onChange={(e) => {
              let codeArray = e.target.value.match(/[0-9]/g);
              let code = "";
              codeArray &&
                codeArray.map((digit) =>
                  code.length < 6 ? (code += digit) : ""
                );
              setCode(code);
            }}
          />
        </div>
        <SubmitBtn
          disabled={code?.length < 6}
          ref={sendBtn}
          onClick={async () => await sendCode()}
        >
          إرسال
        </SubmitBtn>
      </div>
    </>
  );
};

export default VerifyCode;
