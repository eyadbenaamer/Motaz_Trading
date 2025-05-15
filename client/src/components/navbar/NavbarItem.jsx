import { Link, useLocation } from "react-router-dom";

const NavbarItem = (props) => {
  const { to, name, englishName, children } = props;
  const location = useLocation().pathname.slice(1);

  const isCurrentPage = to.slice(1) === location;

  return (
    <li className="w-full">
      <Link onClick={() => window.scrollTo({ top: 0 })} to={to}>
        <div className="bg-hovered flex gap-3 items-center justify-between px-3 py-2 rounded-xl">
          <span
            className={`${
              isCurrentPage ? "text-primary hover:text-white" : "text-white"
            }`}
          >
            {name} | {englishName}
          </span>
          <span className="w-7">{children}</span>
        </div>
      </Link>
    </li>
  );
};

export default NavbarItem;
