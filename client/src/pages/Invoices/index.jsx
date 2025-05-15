import { useEffect, useState } from "react";

import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Paginate from "components/Paginate";

import { useWindowWidth } from "hooks/useWindowWidth";

import axiosClient from "utils/AxiosClient";
import getFullTime from "utils/getFullTime";
import { Link } from "react-router-dom";

const Invoices = () => {
  const windowWidth = useWindowWidth();

  const [invoices, setInvoices] = useState(null);
  const [page, setPage] = useState(1);
  const [pagesCount, setPageCount] = useState(1);

  useEffect(() => {
    axiosClient(`/user/invoices?page=${page}`)
      .then((result) => {
        const data = result.data;
        setInvoices(data.invoices);
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
            الفواتير Invoices
          </h1>
          <div className="flex flex-col gap-4">
            {invoices?.length === 0 && <>لا توجد فواتير No Invoices.</>}
            {invoices?.map((invoice, i) => {
              const statusInArabic =
                invoice.status === "delivered"
                  ? "تم التوصيل"
                  : invoice.status === "pending"
                  ? "معلقة"
                  : invoice.status === "waiting delivery"
                  ? "بانتظار الوصول"
                  : "بانتظار التصنيع";

              return (
                <div
                  key={invoice._id}
                  className="bg-alt flex flex-wrap gap-3 rounded-lg p-2 shadow-md max-w-lg"
                >
                  <div className="w-full font-bold text-2xl text-primary">
                    Invoice الفاتورة {(page - 1) * 10 + i + 1}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <span className="text-primary">القيمة </span>
                    <span className="text-primary">Amount:</span>
                    {invoice.amount}
                    <span>دينار</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <span className="text-primary">الدفع </span>
                    <span className="text-primary">Payment:</span>
                    <span>
                      {invoice.payment === "paid" ? "تم الدفع" : "لم تُدفع"}
                    </span>
                    {invoice.payment}
                  </div>
                  <div>
                    <span className="text-primary">حالة الفاتورة Status: </span>
                    {statusInArabic} {invoice.status}
                  </div>
                  {invoice.attachments?.length > 0 && (
                    <div className="w-full">
                      <div className="text-primary">الملحقات Attachments:</div>
                      <div className="flex flex-wrap gap-3  ">
                        {invoice.attachments.map((attachment) => (
                          <Link className="link-hover" to={attachment.url}>
                            {attachment.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-1 flex-wrap">
                    <span className="text-primary">تاريخ الإصدار </span>
                    <span className="text-primary">Issued at:</span>
                    {getFullTime(invoice.createdAt)}
                  </div>
                </div>
              );
            })}
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
export default Invoices;
