import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "state";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="sticky top-0 w-full flex flex-col bg-secondary overflow-hidden transition-all duration-300 pb-4 h-[72px] z-50">
      <div className="container flex justify-between px-4 items-center">
        <Link className="px-2 py-4" to="/">
          <Logo width={40} />
        </Link>
        <div
          className="self-center cursor-pointer flex gap-2 p-2 text-white text-hover"
          onClick={() => {
            dispatch(logout());
          }}
        >
          تسجيل الخروج
          <LogoutIcon className="w-7 inline mr-2 -ml-1" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
