import { ReactComponent as CloseIcon } from "assets/icons/cross.svg";

const File = (props) => {
  const { file, setFiles } = props;
  return (
    <div
      className="rounded-lg border-2 border-[var(--primary-color)] aspect-square p-[6px] text-xs"
      style={{ overflowWrap: "anywhere" }}
      dir="ltr"
    >
      <button
        className="w-5 circle bg-slate-50 z-10 right-2 top-2 border-2 border-[var(--primary-color)]"
        onClick={() => {
          setFiles((prev) => {
            let newArray = prev.filter((product) => product != file);
            return newArray;
          });
        }}
      >
        <CloseIcon stroke="var(--primary-color)" />
      </button>
      <div>{file.name}</div>
    </div>
  );
};

export default File;
