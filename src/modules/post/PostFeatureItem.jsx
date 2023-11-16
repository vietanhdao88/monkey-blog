import PostCategory from "./PostCategory";
import PostImg from "./PostImg";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";

const PostFeatureItem = ({ data }) => {
  console.log(data);
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="relative w-full  text-white rounded-xl h-[272px]">
      <div className="rounded-lg overlay"></div>
      <PostImg url={data.image} className="w-full h-full rounded-lg"></PostImg>
      <div className="absolute inset-0 p-[20px]">
        <div className="flex items-center justify-between mb-4 font-secondFont">
          {data.category?.name && (
            <PostCategory to={data.category.slug}>
              {data.category.name}
            </PostCategory>
          )}

          <PostInfo
            name={data.user.fullname}
            date={formatDate}
            type={false}
            to={data.user?.fullname}
          ></PostInfo>
        </div>
        <PostTitle className={"text-[22px]"} to={data.slug}>
          {data.title}
        </PostTitle>
      </div>
    </div>
  );
};

export default PostFeatureItem;
