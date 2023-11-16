import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostInfo from "./PostInfo";
import PostImg from "./PostImg";

const PostItem = ({ data }) => {
  if (!data) return null;
  return (
    <div className="flex flex-col items-start font-secondFont">
      <PostImg
        className="w-full h-[202px] rounded-xl mb-5"
        url={data?.image}
        to={data.slug}
      ></PostImg>
      <PostCategory to={data.category.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle className={"mb-[15px] mt-[15px] text-lg"} to={data.slug}>
        {data?.title}
      </PostTitle>
      <PostInfo
        date={new Date(data.createdAt.seconds * 1000).toLocaleDateString(
          "VI-vi"
        )}
        name={data.user.fullname}
      ></PostInfo>
    </div>
  );
};

export default PostItem;
