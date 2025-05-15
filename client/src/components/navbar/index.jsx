import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

import NavbarItem from "./NavbarItem";

import { logout } from "state";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { ReactComponent as MenuLogo } from "assets/icons/menu.svg";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as BoxIcon } from "assets/icons/box.svg";
import { ReactComponent as SummaryIcon } from "assets/icons/summary.svg";
import { ReactComponent as BillIcon } from "assets/icons/bill.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";

const Navbar = () => {
  const dispatch = useDispatch();

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      className={`sticky top-0 w-full flex flex-col bg-secondary py-4 overflow-hidden transition-all duration-300 ${
        isCollapsed ? "h-[450px]" : "h-[90px]"
      }`}
    >
      <div className="flex justify-between px-4 items-center">
        <Link className="px-2 py-4" to="/">
          <Logo width={40} />
        </Link>
        <div
          className="w-10"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          <MenuLogo className="text-white" />
        </div>
      </div>
      <div className="flex flex-col h-full justify-between">
        <span className="text-white text-center text-2xl font-bold mb-4">
          شركة معتز للتجارة
        </span>
        <ul className="flex flex-col gap-3 items-start px-2 py-4 w-[250px] center">
          <NavbarItem to="/dashboard" name="الرئيسية" englishName="Dashboard">
            <HomeIcon className="text-white" />
          </NavbarItem>
          <NavbarItem to="/inventory" name="المخازن" englishName="Inventory">
            <BoxIcon className="text-white" />
          </NavbarItem>
          <NavbarItem to="/invoices" name="الفواتير" englishName="Invoices">
            <BillIcon className="text-white" />
          </NavbarItem>
          <NavbarItem to="/summary" name="كشف حساب" englishName="Summary">
            <SummaryIcon className="text-white" />
          </NavbarItem>
        </ul>
        <div
          className="self-center cursor-pointer flex gap-2 p-2 text-white text-hover"
          onClick={() => {
            dispatch(logout());
          }}
        >
          تسجيل الخروج | Log out
          <LogoutIcon className="w-7 inline mr-2 -ml-1" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
