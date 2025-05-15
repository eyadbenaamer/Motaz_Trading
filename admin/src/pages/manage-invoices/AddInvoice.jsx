import { useEffect, useState } from "react";

import Dialog from "components/dialog";
import Input from "components/Input";
import SubmitBtn from "components/SubmitBtn";
import RadioBtn from "components/RadioBtn";

import axiosClient from "utils/AxiosClient";

import { ReactComponent as AddIcon } from "assets/icons/add.svg";
import { useSearchParams } from "react-router-dom";
import DropZone from "components/dropzone";

const AddInvoice = ({ setInvoices }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    status: "pending",
    payment: "not paid",
    amount: 10,
  });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const _id = searchParams.get("_id");

  const createTransaction = () => {
    const url = `admin/create_invoice?_id=${_id}`;
    const formData = new FormData();
    for (const property in data) {
      formData.append(property, data[property]);
    }
    files?.map((file) => {
      formData.append("file", file);
    });
    axiosClient
      .post(url, formData)
      .then((result) => {
        if (result.data) {
          setInvoices((prev) => [result.data, ...prev]);
          setShow(false);
        }
      })
      .catch((error) => {
        setMessage(error.response?.data.message);
      });
  };

  useEffect(() => setFiles([]), [show]);

  return (
    <>
      <div
        onClick={() => setShow(true)}
        className="fixed bottom-8 left-6 circle bg-primary w-12 shadow-sm text-white cursor-pointer"
      >
        <AddIcon />
      </div>
      <Dialog preventCloseByClick show={show} setShow={setShow}>
        <div className="overflow-y-scroll rounded-xl p-5 bg-alt max-h-[95svh] container flex flex-col items-center gap-5 justify-between">
          <h1 className="text-2xl text-primary font-bold">
            إضافة فاتورة جديدة
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
            <div className="w-full items-center">
              <label>القيمة</label>
              <div className="flex gap-2 items-center">
                <Input name="amount" setData={setData} value={data.amount} />
                <span>دينار</span>
              </div>
            </div>
            <div>
              <label>الوصف</label>
              <textarea
                className="max-w-[400px] rounded-md p-2 bg-200 shadow-md overflow-y-scroll"
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
            <div>
              <label htmlFor="files">الملحقات</label>
              <DropZone files={files} setFiles={setFiles} />
            </div>
            <div className="col-span-1 mb-4">
              <label htmlFor="isDisabled">حالة الفاتورة</label>
              <div className="flex gap-3 flex-wrap">
                <RadioBtn
                  name="pending"
                  id="pending"
                  label="معلقة"
                  onClick={() => setData({ ...data, status: "pending" })}
                  checked={data.status === "pending"}
                />
                <RadioBtn
                  name="waiting manufacturing"
                  id="waiting manufacturing"
                  label="بانتظار التصنيع"
                  onClick={() =>
                    setData({ ...data, status: "waiting manufacturing" })
                  }
                  checked={data.status === "waiting manufacturing"}
                />
                <RadioBtn
                  name="waiting delivery"
                  id="waiting delivery"
                  label="بانتظار الوصول"
                  onClick={() =>
                    setData({ ...data, status: "waiting delivery" })
                  }
                  checked={data.status === "waiting delivery"}
                />
                <RadioBtn
                  name="delivered"
                  label="تم الوصول"
                  onClick={() => setData({ ...data, status: "delivered" })}
                  checked={data.status === "delivered"}
                />
              </div>
            </div>
            <div className="col-span-1 mb-4">
              <label htmlFor="isDisabled">حالة الدفع</label>
              <div className="flex gap-3 flex-wrap">
                <RadioBtn
                  name="not paid"
                  id="not paid"
                  label="لم تدفع"
                  onClick={() => setData({ ...data, payment: "not paid" })}
                  checked={data.payment === "not paid"}
                />
                <RadioBtn
                  name="paid"
                  id="paid"
                  label="دُفعت"
                  onClick={() => setData({ ...data, payment: "paid" })}
                  checked={data.payment === "paid"}
                />
              </div>
            </div>
          </div>
          <div className="self-start">{message}</div>
          <SubmitBtn onClick={createTransaction}>إضافة</SubmitBtn>
        </div>
      </Dialog>
    </>
  );
};

export default AddInvoice;
