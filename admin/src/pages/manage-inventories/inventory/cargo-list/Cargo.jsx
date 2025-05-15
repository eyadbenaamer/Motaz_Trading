import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { InventoryContext } from "..";

import OptionsBtn from "components/options-btn";
import Input from "components/Input";
import SubmitBtn from "components/SubmitBtn";

import getFullTime from "utils/getFullTime";
import axiosClient from "utils/AxiosClient";

const Cargo = (props) => {
  const { cargo, i } = props;
  const { setCount, setInventory, page, location } =
    useContext(InventoryContext);
  const [searchParams] = useSearchParams();
  const _id = searchParams.get("_id");
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    size: cargo.size,
    url: cargo.url,
    providerUrl: cargo.providerUrl,
    containerId: cargo.containerId,
    status: cargo.status,
    location,
  });

  const editCargo = (cargoId) => {
    const url = `admin/edit_cargo?_id=${_id}`;
    axiosClient
      .patch(url, { ...data, _id: cargoId })
      .then((result) => {
        setIsEditing(false);
      })
      .catch((error) => {});
  };

  const deleteCargo = (cargoId) => {
    axiosClient
      .delete(
        `admin/delete_cargo?_id=${_id}&cargoId=${cargoId}&location=${location}&currentPage=${page}`
      )
      .then((result) => {
        if (result.data) {
          setInventory(result.data.cargoList);
          setCount((prev) => {
            if (prev != 0) {
              return prev - 1;
            }
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <div
      key={cargo._id}
      className="col-span-2 sm:col-span-1 bg-300 flex flex-col gap-3 rounded-md p-2 shadow-sm"
    >
      <div className="w-full flex justify-between">
        <div className="font-bold text-2xl text-primary">
          الشحنة {(page - 1) * 10 + i + 1}
        </div>
        <OptionsBtn
          deleteAction={() => deleteCargo(cargo._id)}
          setIsEditing={setIsEditing}
        />
      </div>
      <div className="flex gap-1 items-center">
        <Input
          dir="ltr"
          className="w-16"
          name="size"
          label="حجم الشحنة"
          setData={setData}
          value={data.size}
          disabled={!isEditing}
        />
        cpm
      </div>
      <div className="flex gap-1 items-center">
        <Input
          dir="ltr"
          className="w-20"
          name="containerId"
          label="رقم الحاوية"
          setData={setData}
          value={data.containerId}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Input
          dir="ltr"
          className="w-full"
          name="url"
          label="رابط التتبع"
          setData={setData}
          value={data.url}
          disabled={!isEditing}
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
          disabled={!isEditing}
        />
      </div>
      <div className="flex gap-3 flex-col">
        <span className="text-primary font-bold">تاريخ الإصدار </span>
        <span>{getFullTime(cargo.createdAt)}</span>
      </div>
      <div className="flex justify-around h-[45px]">
        {isEditing && (
          <>
            <div className="w-fit">
              <button
                className="py-2 px-4 border-solid rounded-xl bg-gray-600 text-white"
                onClick={() => {
                  setData(cargo);
                  setIsEditing(false);
                }}
              >
                إلغاء الأمر
              </button>
            </div>
            <div className="w-fit self-center">
              <SubmitBtn onClick={() => editCargo(cargo._id)}>تعديل</SubmitBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cargo;
