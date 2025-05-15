import { useRef } from "react";

import { ReactComponent as CloseIcon } from "assets/icons/cross.svg";
import useCloseWidget from "hooks/useCloseWidget";

const Dialog = (props) => {
  const { show, setShow, children, preventCloseByClick } = props;
  const prompt = useRef(null);
  useCloseWidget(prompt, setShow, preventCloseByClick);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setShow(false);
    }
  });

  return (
    show && (
      <dialog
        aria-busy={true}
        className="text-inherit w-full fixed top-0 bg-[#00000063] h-[100dvh] flex items-center justify-center z-[100]"
      >
        <section className="relative dialog h-fit rounded-xl px-2">
          <button
            className="absolute top-4 left-5 cursor-pointer w-5 text-black"
            onClick={() => setShow(false)}
          >
            <CloseIcon className="text-hover" />
          </button>
          <div ref={prompt} className="dialog">
            {children}
          </div>
        </section>
      </dialog>
    )
  );
};

export default Dialog;
