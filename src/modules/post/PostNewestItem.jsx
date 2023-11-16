import PostCategory from "./PostCategory";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";
import PostImg from "./PostImg";

const PostNewestItem = ({ data }) => {
  return (
    <div
      className={`flex items-center gap-x-5 mb-8 pb-7 last:mb-0 last:pb-0 border border-b-black last:border-none`}
    >
      <PostImg
        className="flex-shrink-0 w-[180px] h-full rounded-lg"
        url={
          "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
        }
      ></PostImg>
      <div>
        <div className="font-secondFont">
          <PostCategory type={false}>Kiến thức</PostCategory>
          <PostTitle className={"mb-[10px] mt-[10px] text-lg"}>
            Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
          </PostTitle>
          <PostInfo date={"March 23"} name={"Adiez Le"}></PostInfo>
        </div>
      </div>
    </div>
  );
};

export default PostNewestItem;
