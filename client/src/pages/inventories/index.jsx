import Navbar from "components/navbar";
import Sidebar from "components/sidebar";

import { useWindowWidth } from "hooks/useWindowWidth";

import Inventory from "./inventory";

const Inventories = () => {
  const windowWidth = useWindowWidth();

  return (
    <>
      {windowWidth <= 768 && <Navbar />}
      <div className="grid grid-cols-9 md:grid-cols-12">
        {windowWidth > 768 && (
          <div className="sidebar col-span-3">
            <Sidebar />
          </div>
        )}
        <section className="col-span-9 px-3 py-8">
          <h1 className="text-3xl w-full text-start text-primary font-bold mb-4">
            المخازن Inventory
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
      </div>
    </>
  );
};
export default Inventories;
