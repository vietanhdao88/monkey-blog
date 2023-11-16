import React from "react";
import { Link } from "react-router-dom";

const PostTitle = ({ children, className, to = "" }) => {
  return (
    <>
      <h3 className={`font-semibold font-secondFont ${className}`}>
        <Link to={`/${to}`}>{children}</Link>
      </h3>
    </>
  );
};

export default PostTitle;
