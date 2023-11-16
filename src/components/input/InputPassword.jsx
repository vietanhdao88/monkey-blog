import React, { Fragment, useState } from "react";
import Input from "./Input";
import EyeIcon from "../icons/EyeIcon";
import EyeCloseIcon from "../icons/EyeCloseIcon";

const InputPassword = ({ control }) => {
  const [toggle, setToggle] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        placeholder="Enter your password"
        type={toggle ? "text" : "password"}
        name="password"
        control={control}
      >
        {toggle ? (
          <EyeIcon onClick={() => setToggle(false)}></EyeIcon>
        ) : (
          <EyeCloseIcon onClick={() => setToggle(true)}></EyeCloseIcon>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPassword;
