import { useEffect, useState } from "react";

import CargosList from "./CargosList";
import Paginate from "components/Paginate";

import axiosClient from "utils/AxiosClient";

import { ReactComponent as DropupIcon } from "assets/icons/drop-up.svg";
import { ReactComponent as DropdownIcon } from "assets/icons/drop-down.svg";

const Inventory = (props) => {
  const { name, location } = props;

  const [inventory, setInventory] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axiosClient(`/user/inventory?location=${location}&page=${page}`)
      .then((result) => {
        if (result.data) {
          setInventory(result.data.inventory);
          setPagesCount(result.data.pagesCount);
          setCount(result.data.count);
        }
      })
      .catch((err) => {});
  }, [page]);

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className={`bg-alt rounded-xl p-4 shadow-md my-2 ${
          inventory.length > 0 ? "cursor-pointer text-hover" : ""
        } flex gap-2 items-center`}
      >
        <span>{name}</span>
        <span>({count})</span>
        {inventory.length > 0 && (
          <>
            {!show && <DropdownIcon />}
            {show && <DropupIcon />}
          </>
        )}
      </div>
      {inventory.length > 0 && (
        <div
          className={`${
            show ? "h-[600px]" : "h-[0px] py-0"
          } overflow-hidden transition-all duration-500 bg-alt p-4 rounded-lg flex flex-col gap-4`}
        >
          <div className="h-[500px] overflow-y-scroll py-4">
            <CargosList cargos={inventory} />
          </div>
          <Paginate
            page={page}
            pagesCount={pagesCount}
            onPageChange={(currentPage) => setPage(currentPage)}
          />
        </div>
      )}
    </>
  );
};

export default Inventory;
