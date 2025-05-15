import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAuthStatus, setProfile, setResetPasswordInfo } from "state";

import PasswordInput from "components/PasswordInput";
import SubmitBtn from "components/SubmitBtn";

import axiosClient from "utils/AxiosClient";
import { Link } from "react-router-dom";

const CreateNewPassword = () => {
  const { token, isPasswordReset } = useSelector(
    (state) => state.resetPasswordInfo
  );
  const [isValidInputs, setIsValidInputs] = useState({
    password: false,
    confirmPassword: false,
  });
  const [data, setData] = useState({ password: "" });
  const dispatch = useDispatch();
  const [authInfo, setAuthInfo] = useState({});

  const isDisabled = () => {
    for (const key in isValidInputs) {
      if (!isValidInputs[key]) {
        return true;
      }
    }
    return false;
  };

  const resetPassword = async () => {
    return await axiosClient
      .post(`reset_password/${token}`, { password: data.password })
      .then((response) => {
        setAuthInfo(response.data);
        dispatch(setResetPasswordInfo({ isPasswordReset: true }));
      })
      .catch((error) => {
        const { message, isExpired } = error.response.data;
        if (isExpired) {
          /*
          if token is expired then all reset password information will be reset
          which will redirect back to searh account wizard
          */
          dispatch(
            setResetPasswordInfo({ isCodeSent: false, token: null, message })
          );
        }
        dispatch(setResetPasswordInfo({ message }));
      });
  };

  const authenticateAfterReset = () => {
    const { profile, isVerified, token } = authInfo;
    localStorage.setItem("token", token);
    dispatch(setAuthStatus({ isVerified, email: "", isLoggedin: true }));
    dispatch(setProfile(profile));
    dispatch(setResetPasswordInfo(null));
  };
  return (
    <>
      {!isPasswordReset && (
        <>
          <h1 className="font-bold text-2xl text-primary mb-3">
            أنشئ كلمة مرور جديدة
          </h1>
          <PasswordInput
            setIsValid={(isValid) =>
              setIsValidInputs({ ...isValidInputs, password: isValid })
            }
            data={data}
            setData={setData}
            name={"password"}
            fieldValue={data.password}
            label={"كلمة المرور الجديدة"}
          />
          <PasswordInput
            setIsValid={(isValid) =>
              setIsValidInputs({ ...isValidInputs, confirmPassword: isValid })
            }
            data={data}
            setData={setData}
            name={"confirmPassword"}
            fieldValue={data.confirmPassword}
            label={"تأكيد كلمة المرور الجديدة"}
          />
          <div className="w-fit self-center mt-5">
            <SubmitBtn
              disabled={isDisabled()}
              tabIndex={1}
              onClick={async () => await resetPassword()}
            >
              إرسال
            </SubmitBtn>
          </div>
        </>
      )}
      {isPasswordReset && (
        <div className="flex flex-col gap-6">
          <h1 className="text-lg">تم إعادة تعيين كلمة المرور بنجاح!</h1>
          <Link
            className="w-full rounded-xl bg-primary p-2 text-center text-white"
            to="/dashboard"
            onClick={authenticateAfterReset}
          >
            الصفحة الرئيسية
          </Link>
        </div>
      )}
    </>
  );
};

export default CreateNewPassword;
