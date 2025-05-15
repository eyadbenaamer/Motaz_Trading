import Input from "components/Input";
import OptionsBtn from "components/options-btn";
import RadioBtn from "components/RadioBtn";
import SubmitBtn from "components/SubmitBtn";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "utils/AxiosClient";
import getFullTime from "utils/getFullTime";

const Transaction = (props) => {
  const { transaction, i, setTransactions } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    amount: transaction.amount,
    details: transaction.status,
  });
  const [searchParams] = useSearchParams({ page: "1" });
  const page = searchParams.get("page");
  const _id = searchParams.get("_id");

  const editTransaction = (transactionId) => {
    const url = `admin/edit_transaction?_id=${_id}`;
    let amount = transaction.amount;
    if (Math.abs(Number(data.amount)) !== NaN) {
      amount = Math.abs(Number(data.amount));
    }
    axiosClient
      .patch(url, {
        _id: transactionId,
        ...data,
        amount,
      })
      .then((result) => {
        setIsEditing(false);
      })
      .catch((error) => {});
  };

  const deleteTransaction = (transactionId) => {
    axiosClient
      .delete(
        `admin/delete_transaction?_id=${_id}&transactionId=${transactionId}&currentPage=${page}`
      )
      .then((result) => {
        if (result.data) {
          setTransactions(result.data.transactionsList);
        }
      })
      .catch((err) => setData(transaction));
  };

  return (
    <div
      key={transaction._id}
      className="bg-alt flex flex-wrap gap-3 rounded-md p-4 shadow-md max-w-lg"
    >
      <div className="w-full flex justify-between">
        <div className="font-bold text-2xl text-primary">
          معاملة {(page - 1) * 10 + i + 1}
        </div>
        <OptionsBtn
          deleteAction={() => deleteTransaction(transaction._id)}
          setIsEditing={setIsEditing}
        />
      </div>
      <div className="w-full items-center">
        <Input
          className="inline w-20"
          name="amount"
          label="القيمة"
          setData={setData}
          value={data.amount}
          disabled={!isEditing}
        />
        <span className="ms-2 inline">دينار</span>
      </div>
      <div className="w-full items-center">
        <label>الوصف</label>
        <textarea
          type="text"
          name={"details"}
          value={data.details}
          disabled={!isEditing}
          className={`max-w-[400px] rounded-md p-2 ${
            !isEditing ? "bg-transparent text-slate-700" : "bg-200 shadow-md"
          }`}
          onChange={(e) => {
            const value = e.target.value.trimLeft();
            setData((prev) => ({ ...prev, details: value }));
          }}
        >
          {transaction.details}
        </textarea>
      </div>
      <div className="w-full items-center">
        <label>النوع</label>
        <div>{transaction.type === "withdraw" ? "خصم" : "إضافة"}</div>
      </div>
      <div className="w-full items-center">
        <label>الرصيد بعد المعاملة</label>
        <div>{transaction.balance} دينار</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-primary font-bold">تاريخ الإصدار </div>
        <div>{getFullTime(transaction.createdAt)}</div>
      </div>
      <div className="w-full h-[45px] flex justify-around items-center">
        {isEditing && (
          <>
            <div className="w-fit">
              <button
                className="py-2 px-4 border-solid rounded-xl bg-gray-600 text-white"
                onClick={() => {
                  setData(transaction);
                  setIsEditing(false);
                }}
              >
                إلغاء الأمر
              </button>
            </div>
            <div className="w-fit">
              <SubmitBtn onClick={() => editTransaction(transaction._id)}>
                تعديل
              </SubmitBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transaction;
