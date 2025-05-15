import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "components/navbar";
import Transaction from "./Transaction";
import Paginate from "components/Paginate";

import axiosClient from "utils/AxiosClient";
import useFetchUser from "hooks/useFetchUser";
import AddTransaction from "./AddTransaction";

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [pagesCount, setPageCount] = useState(1);

  const [searchParams] = useSearchParams({ page: "1" });
  const page = searchParams.get("page");
  const _id = searchParams.get("_id");
  const [user] = useFetchUser(searchParams.get("_id"));

  useEffect(() => {
    axiosClient(`/admin/get_transactions?_id=${_id}&page=${page}`)
      .then((result) => {
        const data = result.data;
        setTransactions(data.transactions);
        setPageCount(data.pagesCount);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="col-span-9 px-3 py-8 flex flex-col gap-4">
          <h1 className="text-3xl w-full text-start text-primary font-bold mb-4">
            معاملات الزبون {user?.name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {transactions?.length === 0 && (
              <>لا توجد معاملات No Transactions.</>
            )}
            {transactions?.map((transaction, i) => (
              <div key={transaction._id} className="col-span-1">
                <Transaction
                  i={i}
                  setTransactions={setTransactions}
                  transaction={transaction}
                />
              </div>
            ))}
          </div>
          <Paginate
            page={page}
            pagesCount={pagesCount}
            onPageChange={(currentPage) =>
              searchParams.set("page", currentPage)
            }
          />
        </section>
      </div>
      <AddTransaction setTransactions={setTransactions} />
    </>
  );
};
export default ManageTransactions;
