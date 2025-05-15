import DropZone from "components/dropzone";
import Input from "components/Input";
import OptionsBtn from "components/options-btn";
import RadioBtn from "components/RadioBtn";
import SubmitBtn from "components/SubmitBtn";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "utils/AxiosClient";
import getFullTime from "utils/getFullTime";

const Invoice = (props) => {
  const { invoice, i, setInvoices } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    amount: invoice.amount,
    status: invoice.status,
    details: invoice.details,
    payment: invoice.payment,
  });
  const [files, setFiles] = useState([]);

  const [searchParams] = useSearchParams({ page: "1" });
  const page = searchParams.get("page");
  const _id = searchParams.get("_id");

  const editInvoice = (invoiceId) => {
    const url = `admin/edit_invoice?_id=${_id}`;
    const formData = new FormData();
    for (const property in data) {
      formData.append(property, data[property]);
    }
    files?.map((file) => {
      formData.append("file", file);
    });
    formData.append("_id", invoiceId);
    axiosClient
      .patch(url, formData)
      .then((result) => {
        setIsEditing(false);
      })
      .catch((error) => {});
  };

  const deleteInvoice = (invoiceId) => {
    axiosClient
      .delete(
        `admin/delete_invoice?_id=${_id}&invoiceId=${invoiceId}&currentPage=${page}`
      )
      .then((result) => {
        if (result.data) {
          setInvoices(result.data.invoicesList);
        }
      })
      .catch((err) => {});
  };

  return (
    <div
      key={invoice._id}
      className="bg-alt flex flex-wrap gap-3 rounded-md p-4 shadow-md max-w-lg"
    >
      <div className="w-full flex justify-between">
        <div className="font-bold text-2xl text-primary">
          الفاتورة {(page - 1) * 10 + i + 1}
        </div>
        <OptionsBtn
          deleteAction={() => deleteInvoice(invoice._id)}
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
      <div>
        <label>الوصف</label>
        <textarea
          className={`max-w-[400px] rounded-md p-2 overflow-y-scroll ${
            isEditing ? "bg-200 shadow-md" : ""
          }`}
          type="text"
          name="details"
          value={data.details}
          onChange={(e) => {
            const value = e.target.value.trimLeft();
            setData((prev) => ({ ...prev, details: value }));
          }}
        >
          {data.details}
        </textarea>
      </div>
      {isEditing && (
        <div className="w-full">
          <DropZone files={files} setFiles={setFiles} />
        </div>
      )}
      <div className="w-full flex flex-col gap-3">
        <div className="col-span-1 mb-4">
          <label htmlFor="isDisabled">حالة الفاتورة</label>
          <div className="flex gap-3 flex-wrap">
            <RadioBtn
              disabled={!isEditing}
              name="pending"
              id="pending"
              label="معلقة"
              onClick={() => setData({ ...data, status: "pending" })}
              checked={data.status === "pending"}
            />
            <RadioBtn
              disabled={!isEditing}
              name="waiting manufacturing"
              id="waiting manufacturing"
              label="بانتظار التصنيع"
              onClick={() =>
                setData({ ...data, status: "waiting manufacturing" })
              }
              checked={data.status === "waiting manufacturing"}
            />
            <RadioBtn
              disabled={!isEditing}
              name="waiting delivery"
              id="waiting delivery"
              label="بانتظار الوصول"
              onClick={() => setData({ ...data, status: "waiting delivery" })}
              checked={data.status === "waiting delivery"}
            />
            <RadioBtn
              disabled={!isEditing}
              name="delivered"
              label="تم الوصول"
              onClick={() => setData({ ...data, status: "delivered" })}
              checked={data.status === "delivered"}
            />
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <label htmlFor="isDisabled">حالة الدفع</label>
        <div className="flex gap-3 flex-wrap">
          <RadioBtn
            disabled={!isEditing}
            name="not paid"
            id="not paid"
            label="لم تدفع"
            onClick={() => setData({ ...data, payment: "not paid" })}
            checked={data.payment === "not paid"}
          />
          <RadioBtn
            disabled={!isEditing}
            name="paid"
            id="paid"
            label="دُفعت"
            onClick={() => setData({ ...data, payment: "paid" })}
            checked={data.payment === "paid"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-primary font-bold">تاريخ الإصدار </div>
        <div>{getFullTime(invoice.createdAt)}</div>
      </div>
      <div className="w-full h-[45px] flex justify-around items-center">
        {isEditing && (
          <>
            <div className="w-fit">
              <button
                className="py-2 px-4 border-solid rounded-xl bg-gray-600 text-white"
                onClick={() => {
                  setData(invoice);
                  setIsEditing(false);
                }}
              >
                إلغاء الأمر
              </button>
            </div>
            <div className="w-fit">
              <SubmitBtn onClick={() => editInvoice(invoice._id)}>
                تعديل
              </SubmitBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Invoice;
