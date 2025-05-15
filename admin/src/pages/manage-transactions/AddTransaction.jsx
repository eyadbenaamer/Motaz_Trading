import { useState } from "react";

import Dialog from "components/dialog";
import Input from "components/Input";
import SubmitBtn from "components/SubmitBtn";
import RadioBtn from "components/RadioBtn";

import axiosClient from "utils/AxiosClient";

import { ReactComponent as AddIcon } from "assets/icons/add.svg";
import { useSearchParams } from "react-router-dom";

const AddTransaction = ({ setTransactions }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [type, setType] = useState("withdraw");
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const _id = searchParams.get("_id");

  const createTransaction = () => {
    const url = `admin/create_transaction?_id=${_id}`;
    const amount = type === "withdraw" ? data.amount * -1 : data.amount;
    axiosClient
      .post(url, { ...data, amount })
      .then((result) => {
        if (result.data) {
          setTransactions((prev) => [result.data, ...prev]);
          setShow(false);
        }
      })
      .catch((error) => {
        setMessage(error.response?.data.message);
      });
  };

  return (
    <>
      <div
        onClick={() => setShow(true)}
        className="fixed bottom-8 left-6 circle bg-primary w-12 shadow-sm text-white cursor-pointer"
      >
        <AddIcon />
      </div>
      <Dialog preventCloseByClick show={show} setShow={setShow}>
        <div className="rounded-lg p-5 h-[500px] sm:h-[400px] bg-alt  container flex flex-col items-center gap-5 justify-between">
          <h1 className="text-2xl text-primary font-bold">
            إضافة معاملة جديدة
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
            <div className="w-full items-center">
              <label>القيمة</label>
              <div className="flex gap-2 items-center">
                <Input name="amount" setData={setData} value={data.amount} />
                <span className="">دينار</span>
              </div>
            </div>
            <div className="w-full items-center">
              <label>الوصف</label>
              <textarea
                type="text"
                name={"details"}
                value={data.details}
                className="max-w-[400px] rounded-md p-2 bg-200 shadow-md"
                onChange={(e) => {
                  const value = e.target.value.trimLeft();
                  setData((prev) => ({ ...prev, details: value }));
                }}
              >
                {data.details}
              </textarea>
            </div>
            <div className="col-span-1 mb-4">
              <label htmlFor="isDisabled">النوع</label>
              <div className="flex gap-3 flex-wrap">
                <RadioBtn
                  name="withdraw"
                  id="withdraw"
                  label="خصم"
                  onClick={() => setType("withdraw")}
                  checked={type === "withdraw"}
                />
                <RadioBtn
                  name="deposit"
                  id="deposit"
                  label="إضافة"
                  onClick={() => setType("deposit")}
                  checked={type === "deposit"}
                />
              </div>
            </div>
          </div>
          <SubmitBtn onClick={createTransaction}>إضافة</SubmitBtn>
        </div>
      </Dialog>
    </>
  );
};

export default AddTransaction;
