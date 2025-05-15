import { useSelector } from "react-redux";

import { ReactComponent as LoadingIcon } from "assets/icons/laoding-app.svg";

const Loading = () => {
  return (
    <div
      style={{ zIndex: 1000 }}
      className={`h-full w-full fixed flex items-center justify-center`}
    >
      <LoadingIcon width={200} />
    </div>
  );
};

export default Loading;
