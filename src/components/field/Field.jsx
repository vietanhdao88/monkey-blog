import React from "react";
import Input from "../input/Input";
import Label from "../label/Label";

const Field = ({ children }) => {
  return (
    <div className="flex flex-col mb-12 gap-x-5">
      {children}
      <></>
    </div>
  );
};

export default Field;
