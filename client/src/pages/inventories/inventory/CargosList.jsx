import { Link } from "react-router-dom";

import getFullTime from "utils/getFullTime";

const CargosList = ({ cargos }) => {
  return (
    <div className="flex flex-col gap-2">
      {cargos.map((cargo, i) => (
        <div
          key={cargo._id}
          className="bg-300 flex flex-wrap gap-3 rounded-md p-2 shadow-sm"
        >
          <div>
            <span className="text-primary">حجم الشحنة size: </span>
            <span dir="ltr">{cargo.size} cpm</span>
          </div>
          {cargo.containerId && (
            <div className="flex gap-1">
              <div className="text-primary">رقم الحاوية</div>
              <div className="text-primary">container number: </div>
              <div>{cargo.containerId}</div>
            </div>
          )}
          <Link
            className="transition hover:underline text-blue-500 underline-offset-4"
            to={cargo.url}
          >
            رابط التتبع Track URL
          </Link>
          <Link
            className="transition hover:underline text-blue-500 underline-offset-4"
            to={cargo.providerUrl}
          >
            رابط الشركة الناقلة Provider URL
          </Link>
          <div className="flex gap-1 flex-wrap">
            <span className="text-primary">تاريخ الإصدار </span>
            <span className="text-primary">Issued at:</span>
            {getFullTime(cargo.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CargosList;
