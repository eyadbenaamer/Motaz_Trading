import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Box from "components/Box";

import { useWindowWidth } from "hooks/useWindowWidth";
import { useSelector } from "react-redux";

import { ReactComponent as BoxIcon } from "assets/icons/box.svg";
import { ReactComponent as MoneyIcon } from "assets/icons/money.svg";

const Dashboard = () => {
  const windowWidth = useWindowWidth();
  const profile = useSelector((state) => state.profile);
  const { name, username, email, cargoCount, balance } = profile;

  return (
    <>
      {windowWidth <= 768 && <Navbar />}
      <div className="grid grid-cols-9 md:grid-cols-12">
        {windowWidth > 768 && (
          <div className="sidebar col-span-3">
            <Sidebar />
          </div>
        )}
        <section className="flex flex-col col-span-9 items-center gap-8 px-3 py-8">
          <h1 className="text-3xl w-full text-start text-primary font-bold mb-4">
            الصفحة الرئيسية Dashboard
          </h1>
          <div className="bg-alt rounded-2xl shadow-md flex flex-col gap-4 text-center items-center w-fit py-8 px-4">
            <div className="image-circle w-[160px]">
              <img src={profile?.picture} alt="" />
            </div>
            <div
              dir="ltr"
              className="font-bold text-xl text-primary w-full flex gap-1"
            >
              <span>Name الإسم: </span>
              <span className="text-black">{name}</span>
            </div>
            <div
              dir="ltr"
              className="font-bold text-xl text-primary text-left w-full"
            >
              <span>Email البريد الإلكتروني: </span>
              <span className="text-black">{email}</span>
            </div>
            {username && (
              <div
                dir="ltr"
                className="font-bold text-xl text-primary text-left w-full"
              >
                <span>Code الكود: </span>
                <span className="text-black">{username}</span>
              </div>
            )}
          </div>
          <div className="flex justify-around w-full flex-wrap gap-6">
            <Box bg="alt">
              <div className="flex flex-col min-w-[200px] items-center justify-center h-full gap-3">
                <MoneyIcon className="text-primary w-12" />
                <div className="font-bold">الرصيد</div>
                <div className="font-bold">Balance</div>
                <div
                  className={`${
                    balance < 0
                      ? "text-red-500"
                      : balance > 0
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {balance} دينار
                </div>
              </div>
            </Box>
            <Box bg="alt">
              <div className="flex flex-col min-w-[200px] items-center justify-center h-full gap-3">
                <BoxIcon className="text-primary w-12" />
                <div className="font-bold">إجمالي عدد الشحنات</div>
                <div className="font-bold">Total number of shipments</div>
                <div>{cargoCount}</div>
              </div>
            </Box>
          </div>
        </section>
      </div>
    </>
  );
};
export default Dashboard;
