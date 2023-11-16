import { Link } from "react-router-dom";

const PostInfo = ({ date, name, type = true, to = "/" }) => {
  return (
    <div
      className={`flex items-center text-sm font-semibold gap-x-2 text-grayScale ${
        type ? "text-grayScale" : "text-white"
      }`}
    >
      <span>{date}</span>
      <div
        className={`inline-block w-1 h-1 rounded-full ${
          type ? "bg-grayScale2" : "bg-white"
        } `}
      ></div>
      <Link to={`/author/${to}`}>
        <span>{name}</span>
      </Link>
    </div>
  );
};

export default PostInfo;
