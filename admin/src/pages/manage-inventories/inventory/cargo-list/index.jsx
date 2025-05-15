import Cargo from "./Cargo";

const CargosList = (props) => {
  const { inventory } = props;

  return (
    <div className="grid grid-cols-2 gap-2">
      {inventory.map((cargo, i) => (
        <Cargo cargo={cargo} i={i} />
      ))}
    </div>
  );
};

export default CargosList;
