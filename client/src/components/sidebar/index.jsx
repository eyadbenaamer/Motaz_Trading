import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem";

import { logout } from "state";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as InventoryIcon } from "assets/icons/inventory.svg";
import { ReactComponent as SummaryIcon } from "assets/icons/summary.svg";
import { ReactComponent as BillIcon } from "assets/icons/bill.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <aside className="sticky top-0 h-screen flex flex-col justify-between bg-secondary py-4">
      <div>
        <Link
          to="/"
          className="flex gap-2 justify-center items-center text-white text-center font-bold text-lg px-2 py-4"
        >
          <span className="text-xl">شركة معتز للتجارة</span>
          <Logo width={60} />
        </Link>
        <ul className="flex flex-col gap-3 items-start px-2 py-4">
          <SidebarItem to="/dashboard" name="الرئيسية" englishName="Dashboard">
            <HomeIcon />
          </SidebarItem>
          <SidebarItem to="/inventory" name="المخازن" englishName="Inventory">
            <InventoryIcon />
          </SidebarItem>
          <SidebarItem to="/invoices" name="الفواتير" englishName="Invoices">
            <BillIcon />
          </SidebarItem>
          <SidebarItem to="/summary" name="كشف حساب" englishName="Summary">
            <SummaryIcon />
          </SidebarItem>
        </ul>
      </div>
      <div
        className="self-center cursor-pointer flex gap-2 p-2 text-white text-hover"
        onClick={() => {
          dispatch(logout());
        }}
      >
        تسجيل الخروج | Log out
        <LogoutIcon className="w-7 inline mr-2 -ml-1" />
      </div>
    </aside>
  );
};

export default Sidebar;
