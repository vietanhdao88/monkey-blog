import React from "react";
import { Link } from "react-router-dom";

const PostCategory = ({ children, type = true, to = "/" }) => {
  return (
    <div
      className={`py-1 px-[10px] rounded-xl text-grayScale inline-block cursor-pointer ${
        type ? "bg-additon" : "bg-white"
      }`}
    >
      <Link to={`/category/${to}`}>{children}</Link>
    </div>
  );
};

export default PostCategory;
