import { useRef, useState } from "react";

import Dialog from "components/dialog";
import RedBtn from "components/RedBtn";

import useCloseWidget from "hooks/useCloseWidget";

import { ReactComponent as OptionsIcon } from "assets/icons/more.svg";
import { ReactComponent as TrashIcon } from "assets/icons/trash-basket.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";

const OptionsBtn = (props) => {
  const { deleteAction, setIsEditing } = props;

  const [show, setShow] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const menu = useRef(null);
  useCloseWidget(menu, setShow);

  return (
    <div className="relative">
      <div
        className="cursor-pointer circle w-12"
        onClick={() => setShow(!show)}
      >
        <OptionsIcon className="text-slate-700" />
      </div>
      {show && (
        <div
          ref={menu}
          className="absolute top-10 left-0 shadow-md rounded-md bg-100 w-[120px] overflow-hidden"
        >
          <div
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="bg-hover-alt p-2 flex justify-around items-center cursor-pointer text-hover"
          >
            <span>حذف</span>
            <TrashIcon width={22} />
          </div>
          <Dialog show={isDialogOpen} setShow={setIsDialogOpen}>
            <div className="bg-200 p-6 rounded-lg shadow-md">
              <div className="w-full py-4">هل أنت متأكد من عملية الحذف؟</div>
              <div className="flex justify-between mt-2">
                <button
                  className="py-1 px-4 border-solid rounded-xl bg-gray-600 text-white"
                  onClick={() => setIsDialogOpen(false)}
                >
                  إلغاء الأمر
                </button>
                <RedBtn onClick={deleteAction}>حذف</RedBtn>
              </div>
            </div>
          </Dialog>

          <div
            onClick={() => {
              setIsEditing(true);
              setShow(!show);
            }}
            className="bg-hover-alt p-2 flex justify-around items-center cursor-pointer text-hover"
          >
            <span>تعديل</span>
            <EditIcon width={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsBtn;
