import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "components/navbar";
import Invoice from "./Invoice";
import AddInvoice from "./AddInvoice";
import Paginate from "components/Paginate";

import axiosClient from "utils/AxiosClient";
import useFetchUser from "hooks/useFetchUser";

const ManageInvoices = () => {
  const [invoices, setInvoices] = useState(null);
  const [pagesCount, setPageCount] = useState(1);

  const [searchParams] = useSearchParams({ page: "1" });
  const page = searchParams.get("page");
  const _id = searchParams.get("_id");
  const [user] = useFetchUser(searchParams.get("_id"));

  useEffect(() => {
    axiosClient(`/admin/get_invoices?_id=${_id}&page=${page}`)
      .then((result) => {
        const data = result.data;
        setInvoices(data.invoices);
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
            فواتير الزبون {user?.name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {invoices?.length === 0 && <>لا توجد فواتير No Invoices.</>}
            {invoices?.map((invoice, i) => (
              <div key={invoice._id} className="col-span-1">
                <Invoice i={i} setInvoices={setInvoices} invoice={invoice} />
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
      <AddInvoice setInvoices={setInvoices} />
    </>
  );
};
export default ManageInvoices;
