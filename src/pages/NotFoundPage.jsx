import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "404 Page";
  }, []);
  return (
    <div className="flex flex-col flex-wrap items-center justify-center h-screen">
      <NavLink to={"/"}>
        <img src="/logo.png" alt="" className="mb-10" />
      </NavLink>
      <h1 className="mb-5 text-2xl font-medium text-primary">
        404 - Looks like you are lost.
      </h1>
      <p className="max-w-[800px] mb-10">
        Maybe this page used to exist or you just spelled something wrong.
        Chances are your spelled something wrong, so can you double check the
        URL?
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="px-5 py-3 text-white rounded-lg bg-primary"
      >
        Back to Home Page
      </button>
    </div>
  );
};

export default NotFoundPage;
