import React from "react";

const AuthorBox = ({ data }) => {
  console.log(data);
  return (
    <div className="author">
      <div className="author-image">
        <img src={data?.user?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{data?.user?.fullname}</h3>
        <p className="author-desc">
          {data?.user?.description ||
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus nulla, culpa distinctio officia iusto eligendi deleniti"}
        </p>
      </div>
    </div>
  );
};

export default AuthorBox;
