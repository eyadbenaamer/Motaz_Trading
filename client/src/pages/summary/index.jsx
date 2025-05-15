import { useEffect, useState } from "react";

import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Paginate from "components/Paginate";

import { useWindowWidth } from "hooks/useWindowWidth";

import axiosClient from "utils/AxiosClient";
import getFullTime from "utils/getFullTime";

const Summary = () => {
  const windowWidth = useWindowWidth();

  const [summary, setSummary] = useState(null);
  const [page, setPage] = useState(1);
  const [pagesCount, setPageCount] = useState(1);

  useEffect(() => {
    axiosClient(`/user/summary?page=${page}`)
      .then((result) => {
        const data = result.data;
        setSummary(data.transactions);
        setPageCount(data.pagesCount);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      {windowWidth <= 768 && <Navbar />}
      <div className="grid grid-cols-9 md:grid-cols-12">
        {windowWidth > 768 && (
          <div className="sidebar col-span-3">
            <Sidebar />
          </div>
        )}
        <section className="col-span-9 px-3 py-8 flex flex-col gap-4">
          <h1 className="text-3xl w-full text-start text-primary font-bold mb-4">
            كشف حساب Summary
          </h1>
          <div className="flex flex-col gap-4">
            {summary?.length === 0 && <>لا توجد معاملات No transactions.</>}
            {summary?.map((transaction, i) => (
              <div
                key={transaction._id}
                className="bg-alt flex flex-col gap-3 rounded-lg p-2 shadow-md max-w-lg"
              >
                <div className="font-bold text-2xl text-primary">
                  Transaction معاملة{(page - 1) * 10 + i + 1}
                </div>
                <div className="flex gap-1">
                  <span className="text-primary">الوصف Details: </span>
                  <span>{transaction.details}</span>
                </div>

                <div className="flex gap-1">
                  <span className="text-primary">النوع </span>
                  <span className="text-primary">type:</span>
                  <span>
                    {transaction.type === "withdraw" ? "خصم" : "إضافة"}
                  </span>
                  <span>{transaction.type}</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-primary">القيمة </span>
                  <span className="text-primary">Amount:</span>
                  {transaction.amount}
                  <span>دينار</span>
                </div>

                <div className="flex gap-1 items-center">
                  <div className="text-primary flex flex-col">
                    <span>balance after the transaction:</span>
                    <span>الرصيد بعد المعاملة </span>
                  </div>
                  {transaction.balance}
                  <span>دينار</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  <span className="text-primary">تاريخ الإصدار </span>
                  <span className="text-primary">Issued at:</span>
                  {getFullTime(transaction.createdAt)}
                </div>
              </div>
            ))}
          </div>
          <Paginate
            page={page}
            pagesCount={pagesCount}
            onPageChange={(currentPage) => setPage(currentPage)}
          />
        </section>
      </div>
    </>
  );
};
export default Summary;
