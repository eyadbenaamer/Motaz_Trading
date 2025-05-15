import { useState, useRef } from "react";

import File from "./File";

import { ReactComponent as AddIcon } from "assets/icons/add.svg";

const DropZone = (props) => {
  const { files, setFiles } = props;
  const [isDragging, setIsDragging] = useState(false);

  const input = useRef(null);

  return (
    <>
      <input
        type="file"
        name="media"
        ref={input}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          setFiles((prev) => {
            let newArray = Array.of(...prev);
            newArray.push(file);
            return newArray;
          });
        }}
      />
      <div
        className="w-full min-h-[200px]"
        onDragEnterCapture={(e) => {
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <div className="flex flex-col items-start gap-3">
          {isDragging ? (
            <div
              style={{ borderRadius: 8 }}
              className="flex justify-center items-center w-full
            p-5 border-dashed border-[var(--primary-color)] border-2 bg-300 cursor-pointer min-h-[200px]"
            >
              أفلت الملفات هنا
            </div>
          ) : (
            <div
              style={{ borderRadius: 8 }}
              className="grid gap-2 w-full grid-cols-8
            p-5 border-solid border-[var(--primary-color)] border-2 bg-300 min-h-[200px]"
            >
              {files?.map((file, i) => (
                <div className="col-span-3 md:col-span-2" key={files[i].name}>
                  <File file={file} setFiles={setFiles} />
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => input.current.click()}
            className="bg-[var(--primary-color)] h-[50px] w-[50px] rounded-lg"
          >
            <AddIcon className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};
export default DropZone;
