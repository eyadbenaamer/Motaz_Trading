import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import "./index.css";

const Header = ({ trnasparent }) => {
  const style = trnasparent ? "text-white" : "bg-300 shadow-lg";
  return (
    <header className={`sticky top-0 z-40 w-full ${style}`}>
      <div
        className={`container px-4 m-auto flex gap-3 items-center justify-between h-[60px] ${
          trnasparent ? "pt-4" : ""
        }`}
      >
        <Link to="/" className="font-bold text-2xl">
          شركة معتز للتجارة
        </Link>
        <Link to="/">
          <Logo width={60} />
        </Link>
      </div>
    </header>
  );
};
export default Header;
