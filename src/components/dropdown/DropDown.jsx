import React, { useState } from "react";
import { DropDownProvider, useDropDown } from "./dropdown-context.jsx";
import Select from "./Select.jsx";

const DropDown = ({
  placeholder = "Please select an option",
  children,
  ...props
}) => {
  return (
    <DropDownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropDownProvider>
  );
};

export default DropDown;
