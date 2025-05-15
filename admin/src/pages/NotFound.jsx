import { ReactComponent as NotFoundPicture } from "assets/not-found.svg";
import Header from "components/header";
import PrimaryBtn from "components/PrimaryBtn";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Header />
      <div
        className="container flex flex-col items-center p-3 text-2xl text-center justify-center"
        style={{ height: "calc(100vh - 45px)" }}
      >
        <div className="w-full min-[425px]:w-[400px] sm:w-[500px] text-[transparent]">
          <NotFoundPicture />
        </div>
        <div className="py-14">
          <div className="mb-6">عذرًا. هذه الصفحة غير موجودة.</div>
          <Link to="/">
            <PrimaryBtn onClick={() => {}}>الصفحة الرئيسية</PrimaryBtn>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
