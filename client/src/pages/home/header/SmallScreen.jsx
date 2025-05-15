import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { ReactComponent as MenuLogo } from "assets/icons/menu.svg";

const SmallScreen = () => {
  const { hash } = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      setTimeout(() => {
        window.scrollTo({
          top: element?.offsetTop - 72,
          behavior: "smooth",
        });
      }, 500);
    } else {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 500);
    }
  }, [hash]);

  const handleClick = () => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element?.offsetTop - 72,
            behavior: "smooth",
          });
        }, 500);
      }
    }
    setIsCollapsed(false);
  };

  return (
    <header
      className={`sticky z-10 top-0 w-full flex flex-col bg-secondary overflow-hidden transition-all duration-300 ${
        isCollapsed ? "h-[300px]" : "h-[72px]"
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
      <div className="flex flex-col h-full w-fit text-center center">
        <span className="text-white text-center text-2xl font-bold mb-4">
          شركة معتز للتجارة
        </span>
        <nav>
          <ul className="flex flex-col gap-3 items-start px-2 py-4  center">
            <li className="w-full">
              <Link className="text-white text-hover" to="/dashboard">
                حسابي | Account
              </Link>
            </li>
            <li className="w-full">
              <Link
                className="text-white text-hover"
                to="#services"
                replace
                onClick={handleClick}
              >
                خدمات | Services
              </Link>
            </li>
            <li className="w-full">
              <Link
                className="text-white text-hover"
                to="#our-partners"
                replace
                onClick={handleClick}
              >
                شركاؤنا | Our Partners
              </Link>
            </li>
            <li className="w-full">
              <Link
                className="text-white text-hover"
                to="#contact-us"
                replace
                onClick={handleClick}
              >
                تواصل معنا | Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SmallScreen;
