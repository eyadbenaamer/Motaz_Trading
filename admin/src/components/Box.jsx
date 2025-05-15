import React from "react";

const Box = ({ children, bg }) => {
  return (
    <div className={`bg-${bg} rounded-2xl shadow-md  py-8 px-2 aspect-square`}>
      {children}
    </div>
  );
};

export default Box;
