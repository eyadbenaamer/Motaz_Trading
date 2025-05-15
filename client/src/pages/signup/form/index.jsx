import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "state";

import Alert from "components/alert";
import SubmitBtn from "components/SubmitBtn";
import PasswordInput from "components/PasswordInput";
import Input from "./Input";
import EmailInput from "components/EmailInput";

import axiosClient from "utils/AxiosClient";

const Form = (props) => {
  const { setIsSignup } = props;
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [data, setData] = useState({
    name: sessionStorage.getItem("name") ?? "",
    email: sessionStorage.getItem("email") ?? "",
    password: sessionStorage.getItem("password") ?? "",
  });
  const [isValidInputs, setIsValidInputs] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const isDisabled = () => {
    for (const key in isValidInputs) {
      if (!isValidInputs[key]) {
        return true;
      }
    }
    return false;
  };

  const submit = async () => {
    await axiosClient
      .post(`signup`, data)
      .then(() => {
        dispatch(setAuthStatus({ email: data.email, isLoggedin: true }));
        setIsSignup(true);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setIsSignup(false);
      });
    setIsAlertOpened(true);
  };

  return (
    <>
      {isAlertOpened && (
        <div>
          <Alert
            type={"error"}
            message={message}
            isOpened={isAlertOpened}
            setIsOpened={setIsAlertOpened}
          />
        </div>
      )}
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="col-span-1">
            <Input
              setIsValid={(isValid) =>
                setIsValidInputs((prev) => ({ ...prev, name: isValid }))
              }
              fieldValue={data.name}
              name={"name"}
              label={"الإسم"}
              autoFocus={true}
              setData={setData}
            />
          </div>
          <div className="col-span-1">
            <EmailInput
              type="register"
              setIsValid={(isValid) =>
                setIsValidInputs((prev) => ({ ...prev, email: isValid }))
              }
              fieldValue={data.email}
              setData={setData}
            />
          </div>
          <div className="col-span-1 ">
            <PasswordInput
              setIsValid={(isValid) =>
                setIsValidInputs((prev) => ({ ...prev, password: isValid }))
              }
              data={data}
              setData={setData}
              name={"password"}
              fieldValue={data.password}
              label="كلمة المرور"
            />
          </div>
          <div className="col-span-1 ">
            <PasswordInput
              setIsValid={(isValid) =>
                setIsValidInputs((prev) => ({
                  ...prev,
                  confirmPassword: isValid,
                }))
              }
              data={data}
              setData={setData}
              name="confirmPassword"
              label="تأكيد كلمة المرور"
            />
          </div>
        </div>
        <div className=" self-center">
          <SubmitBtn
            tabIndex={1}
            disabled={isDisabled()}
            onClick={async () => await submit()}
          >
            أنشئ الحساب
          </SubmitBtn>
        </div>
      </section>
    </>
  );
};
export default Form;
