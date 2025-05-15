import { useSearchParams } from "react-router-dom";

import Navbar from "components/navbar";
import Inventory from "./inventory";

import useFetchUser from "hooks/useFetchUser";
import AddCargo from "./AddCargo";

const ManageInventories = () => {
  const [searchParams] = useSearchParams();
  const [user] = useFetchUser(searchParams.get("_id"));

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="col-span-9 px-3 py-8">
          <h1 className="text-3xl w-full text-start text-primary font-bold mb-4">
            شحنات الزبون {user?.name}
          </h1>
          <Inventory
            location="guangzhou"
            name="مخزن غوانزو guangzhou Inventory"
          />
          <Inventory
            location="benghazi"
            name="مخزن بنغازي Benghazi Inventory"
          />
          <Inventory
            location="misurata"
            name="مخزن مصراتة Misurata Inventory"
          />
        </section>
        <AddCargo />
      </div>
    </>
  );
};
export default ManageInventories;
