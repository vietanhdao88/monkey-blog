import { NavLink } from "react-router-dom";

const Authentication = ({ children }) => {
  return (
    <div className="max-w-[800px] w-full mx-auto my-20 min-h-screen">
      <div className="w-full mx-auto">
        <NavLink to={"/"}>
          <img
            src="../public/logo.png"
            alt=""
            className="w-[120px] h-[155px] object-cover mx-auto"
          />
        </NavLink>
        <h2 className="text-[40px] font-semibold text-center text-primary mt-7">
          Monkey Blogging
        </h2>
      </div>
      {children}
    </div>
  );
};

export default Authentication;
