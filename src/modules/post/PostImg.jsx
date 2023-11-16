import { Link } from "react-router-dom";
const PostImg = ({ url = "", className = "", to = "" }) => {
  if (to)
    return (
      <Link to={`/${to}`} className="w-full">
        <div className={className}>
          <img
            src={url}
            alt=""
            className="object-cover w-full h-full rounded-inherit"
            loading="lazy"
          />
        </div>
      </Link>
    );
  return (
    <div className={className}>
      <img
        src={url}
        alt=""
        className="object-cover w-full h-full rounded-inherit"
        loading="lazy"
      />
    </div>
  );
};

export default PostImg;
