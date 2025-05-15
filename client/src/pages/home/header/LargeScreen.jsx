import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as Logo } from "assets/icons/logo.svg";

const LargeScreen = () => {
  const { hash } = useLocation();

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
  };

  return (
    <header className="sticky z-10 top-0 bg-secondary px-4 h-[72px] flex items-center">
      <div className="flex justify-between px-4 items-center container">
        <Link to="/" className="flex items-center gap-2">
          <Logo width={40} />
          <span className="text-white text-2xl font-bold ">
            شركة معتز للتجارة
          </span>
        </Link>
        <nav>
          <ul className="flex gap-3 items-start px-2 py-4 text-white">
            <li>
              <Link className="text-white text-hover" to="/dashboard">
                حسابي Account
              </Link>
            </li>
            |
            <li>
              <Link
                className="text-white text-hover"
                to="#services"
                replace
                onClick={handleClick}
              >
                خدمات Services
              </Link>
            </li>
            |
            <li>
              <Link
                className="text-white text-hover"
                to="#our-partners"
                replace
                onClick={handleClick}
              >
                شركاؤنا Our Partners
              </Link>
            </li>
            |
            <li>
              <Link
                className="text-white text-hover"
                to="#contact-us"
                replace
                onClick={handleClick}
              >
                تواصل معنا Contact us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default LargeScreen;
