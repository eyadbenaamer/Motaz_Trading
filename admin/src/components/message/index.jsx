import { ReactComponent as CloseIcon } from "assets/icons/cross.svg";
import "./index.css";

const Message = (props) => {
  const { message, type, show, setShow } = props;

  return (
    <>
      {show && (
        <div className={`flex flex-col p-2 rounded-xl message ${type}`}>
          <button className="w-3 -translate-x-1" onClick={() => setShow(false)}>
            <CloseIcon />
          </button>
          {message}
        </div>
      )}
    </>
  );
};

export default Message;
