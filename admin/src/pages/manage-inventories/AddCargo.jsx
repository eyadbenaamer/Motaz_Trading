import { useState } from "react";

import Dialog from "components/dialog";
import Input from "components/Input";
import SubmitBtn from "components/SubmitBtn";
import RadioBtn from "components/RadioBtn";

import axiosClient from "utils/AxiosClient";

import { ReactComponent as AddIcon } from "assets/icons/add.svg";
import { useSearchParams } from "react-router-dom";

const AddCargo = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ location: "guangzhou" });
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const _id = searchParams.get("_id");

  const createCargo = () => {
    const url = `admin/create_cargo?_id=${_id}`;

    axiosClient
      .post(url, data)
      .then(() => {
        window.location.reload();
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
        <div className="rounded-lg p-5 h-[500px] bg-alt  container flex flex-col items-center gap-5 justify-between">
          <h1 className="text-2xl text-primary font-bold">إضافة شحنة جديدة</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
            <div>
              <label>حجم الشحنة</label>
              <div className="flex gap-1 items-center">
                <Input name="size" setData={setData} value={data.size} />
                cpm
              </div>
            </div>
            <div>
              <Input
                name="containerId"
                label="رقم الحاوية"
                setData={setData}
                value={data.containerId}
              />
            </div>
            <div>
              <Input
                dir="ltr"
                name="url"
                label="رابط التتبع"
                setData={setData}
                value={data.url}
              />
            </div>
            <div>
              <Input
                dir="ltr"
                className="w-full"
                name="providerUrl"
                label="رابط الشركة الناقلة"
                setData={setData}
                value={data.providerUrl}
              />
            </div>
            <div className="col-span-1 mb-4">
              <label htmlFor="isDisabled">المخزن</label>
              <div className="flex gap-3 flex-wrap">
                <RadioBtn
                  name="guangzhou"
                  id="guangzhou"
                  label="غوانزو"
                  onClick={() => setData({ ...data, location: "guangzhou" })}
                  checked={data.location === "guangzhou"}
                />
                <RadioBtn
                  name="benghazi"
                  id="benghazi"
                  label="بنغازي"
                  onClick={() => setData({ ...data, location: "benghazi" })}
                  checked={data.location === "benghazi"}
                />
                <RadioBtn
                  name="misurata"
                  id="misurata"
                  label="مصراتة"
                  onClick={() => setData({ ...data, location: "misurata" })}
                  checked={data.location === "misurata"}
                />
              </div>
            </div>
          </div>
          <SubmitBtn onClick={createCargo}>إضافة</SubmitBtn>
        </div>
      </Dialog>
    </>
  );
};

export default AddCargo;
