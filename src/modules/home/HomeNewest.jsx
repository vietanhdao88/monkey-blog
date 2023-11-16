import PostItem from "../post/PostItem";
import PostNewestLarge from "../post/PostNewestLarge";
import PostNewestItem from "../post/PostNewestItem";
import Heading from "../../components/layout/Heading";

const HomeNewest = () => {
  return (
    <div className="mt-[60px] page-container">
      <Heading>Newest Update</Heading>
      <div className="grid grid-cols-2 gap-x-10">
        <PostNewestLarge></PostNewestLarge>
        <div className="px-5 py-5 rounded-lg bg-additon">
          <PostNewestItem></PostNewestItem>
          <PostNewestItem></PostNewestItem>
          <PostNewestItem></PostNewestItem>
        </div>
      </div>
      <div className="flex items-center w-full mt-14 gap-x-10">
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
      </div>
    </div>
  );
};

export default HomeNewest;
