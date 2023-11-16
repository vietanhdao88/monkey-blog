import React from "react";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";
import PostCategory from "./PostCategory";
import PostImg from "./PostImg";

const PostNewestLarge = () => {
  return (
    <div>
      <PostImg
        url="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
        alt=""
        className="h-[400px] mb-4 rounded-xl"
      />
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle className={"mb-[10px] mt-[10px] text-[22px]"}>
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostInfo date={"March 23"} name={"Adiez Le"}></PostInfo>
    </div>
  );
};

export default PostNewestLarge;
