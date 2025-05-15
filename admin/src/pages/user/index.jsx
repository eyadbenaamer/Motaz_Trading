import { useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

import Input from "components/Input";
import Navbar from "components/navbar";
import OptionsBtn from "components/options-btn";
import SubmitBtn from "components/SubmitBtn";

import useFetchUser from "hooks/useFetchUser";
import axiosClient from "utils/AxiosClient";

import { ReactComponent as BoxIcon } from "assets/icons/box.svg";
import { ReactComponent as EditIcon } from "assets/icons/add-photo.svg";
import { ReactComponent as BillIcon } from "assets/icons/bill.svg";
import { ReactComponent as TransactionsIcon } from "assets/icons/summary.svg";

const User = () => {
  const [searchParams] = useSearchParams();
  const [user] = useFetchUser(searchParams.get("_id"));

  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isUserDeleted, setIsUserDeleted] = useState(false);

  const fileInput = useRef(null);

  const deleteUser = () => {
    const url = `/admin/delete_user?_id=${user?._id}`;
    axiosClient.delete(url).then(() => {
      document.body.style = null;
      setIsUserDeleted(true);
    });
  };

  const editUser = () => {
    const url = `admin/edit_user?_id=${user?._id}`;
    const formData = new FormData();
    for (const property in data) {
      formData.append(property, data[property]);
    }
    picture && formData.append("file", picture);
    axiosClient
      .patch(url, formData)
      .then((result) => {
        setMessage(result.data.message);
        setIsEditing(false);
      })
      .catch((error) => {
        setMessage(error.data?.message);
      });
  };

  return (
    <>
      {user === "not found" && <Navigate to="/not-found" replace />}
      {isUserDeleted && <Navigate to="/" replace />}
      <Navbar />
      <div className="container">
        <section className="col-span-9 px-3 py-8 flex flex-col gap-4">
          <h1 className="text-3xl w-full text-start text-primary font-bold">
            إدارة مستخدم
          </h1>
          <h2 className="text-xl pt-4 w-full text-start text-primary font-bold">
            المعلومات الأساسية
          </h2>
          <div className="bg-alt rounded-2xl shadow-md flex flex-col gap-4 text-center items-center p-4 max-w-xl w-full">
            <div className="w-full flex justify-between h-[60px]">
              <div className="p-4 font-bold text-lg text-right">{message}</div>
              <OptionsBtn
                deleteAction={deleteUser}
                setIsEditing={setIsEditing}
              />
            </div>

            <div className="relative">
              {isEditing && (
                <div
                  onClick={() => fileInput.current.click()}
                  className="w-7 absolute top-3 left-2 cursor-pointer circle bg-100"
                >
                  <EditIcon width={18} />
                </div>
              )}
              <div className="image-circle w-[160px]">
                <img src={file ?? user?.picture} alt="" />
                <input
                  accept=".ts, .mkv, image/*, image/heic, image/heif"
                  style={{ display: "none" }}
                  type="file"
                  ref={fileInput}
                  onChange={(e) => {
                    const reader = new FileReader();
                    if (e.target.files[0]) {
                      reader.readAsDataURL(e.target.files[0]);
                      reader.addEventListener("load", (e) =>
                        setFile(e.currentTarget.result)
                      );
                      setPicture(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
            <div
              dir="ltr"
              className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4"
            >
              <div className="text-left col-span-1">
                <Input
                  dir="rtl"
                  name="name"
                  label="Name الإسم"
                  setData={setData}
                  value={data?.name}
                  defaultValue={user?.name}
                  disabled={!isEditing}
                />
              </div>
              <div className="text-left col-span-1">
                <Input
                  name="email"
                  label="Email البريد الإلكتروني"
                  setData={setData}
                  value={data?.email}
                  defaultValue={user?.email}
                  disabled={!isEditing}
                />
              </div>
              <div className="text-left col-span-1">
                <Input
                  name="username"
                  label="Code الكود"
                  setData={setData}
                  value={data?.username}
                  defaultValue={user?.username}
                  disabled={!isEditing}
                />
              </div>
              <div className="text-left col-span-1">
                <label>Balance الرصيد</label>
                <div dir="rtl">{user?.balance} دينار</div>
              </div>
            </div>
            <div className="w-full h-[45px] flex justify-around items-center">
              {isEditing && (
                <>
                  <div className="w-fit">
                    <button
                      className="py-2 px-4 border-solid rounded-xl bg-gray-600 text-white"
                      onClick={() => {
                        setData(user);
                        setIsEditing(false);
                      }}
                    >
                      إلغاء الأمر
                    </button>
                  </div>
                  <div className="w-fit">
                    <SubmitBtn onClick={editUser}>تعديل</SubmitBtn>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-[200px] flex flex-col gap-4 py-3">
            <Link
              to={`${process.env.REACT_APP_APP_URL}/manage-inventories?_id=${user?._id}`}
              className="text-lg text-hover hover:underline transition w-full"
            >
              <div className="flex justify-between">
                <span>إدارة الشحنات</span>
                <BoxIcon className="w-7" />
              </div>
            </Link>
            <Link
              to={`${process.env.REACT_APP_APP_URL}/manage-invoices?_id=${user?._id}`}
              className="text-lg text-hover hover:underline transition w-full"
            >
              <div className="flex justify-between">
                <span>إدارة الفواتير</span>
                <BillIcon className="w-7" />
              </div>
            </Link>
            <Link
              to={`${process.env.REACT_APP_APP_URL}/manage-transactions?_id=${user?._id}`}
              className="text-lg text-hover hover:underline transition w-full"
            >
              <div className="flex justify-between">
                <span>إدارة المعاملات</span>
                <TransactionsIcon className="w-7" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default User;
