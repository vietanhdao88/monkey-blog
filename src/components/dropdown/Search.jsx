import React from "react";
import { useDropDown } from "./dropdown-context";

const Search = ({ placeholder, ...props }) => {
  const { onChange } = useDropDown();
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-4 border border-gray-200 rounded outline-none"
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Search;
