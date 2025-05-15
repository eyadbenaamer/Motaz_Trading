import { useEffect, useState } from "react";

import Navbar from "components/navbar";
import UsersList from "./UsersList";
import Paginate from "components/Paginate";

import axiosClient from "utils/AxiosClient";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  useEffect(() => {
    axiosClient(`/admin/get_users?&page=${page}`)
      .then((result) => {
        if (result.data) {
          if (result.data.users?.length > 0) {
            setUsers(result.data.users);
          } else {
            setUsers(null);
          }
          setPagesCount(result.data.pagesCount);
        }
      })
      .catch((err) => {});
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="flex flex-col items-center gap-8 px-3 py-8">
          <h1 className="text-4xl w-full text-start text-primary font-bold mb-4">
            لوحة التحكم
          </h1>
          <h1 className="text-3xl w-full text-start text-primary font-bold mb-4">
            قائمة المستخدمين
          </h1>
          {users === null && <div className="w-full">لا يوجد مستخدمين.</div>}
          {users && <UsersList page={page} users={users} />}
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
export default Home;
