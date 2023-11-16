import { NavLink, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import { useAuth } from "../../contexts/auth-context";

const menuLink = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Blog",
    to: "/blog",
  },
  {
    name: "Contact",
    to: "/contact",
  },
];
const Header = () => {
  const navigate = useNavigate();

  const { userInfo } = useAuth();
  const getLastName = (name) => {
    if (!name) return null;
    const length = name.split(" ").length;
    return name.split(" ")[length - 1];
  };
  return (
    <header>
      <div className="py-10 page-container">
        <div className="flex items-center justify-between">
          <NavLink to={"/"}>
            <img
              src="/logo.png"
              alt=""
              className="object-cover h-[66px] max-w-[50px]"
            />
          </NavLink>
          <ul className="flex items-center justify-center ml-10 gap-x-5">
            {menuLink.length > 0 &&
              menuLink.map((item) => (
                <NavLink key={item.name} to={item.to}>
                  {item.name}
                </NavLink>
              ))}
          </ul>
          <div className="flex items-center border border-gray-300 rounded-lg focus:border-primary max-w-[320px] ml-auto w-full mr-5 px-6 py-3">
            <input
              type="text"
              placeholder="Search posts..."
              className="flex-1  outline-none pr-[30px]"
            />
            <span className="pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <Button
              type="button"
              classNameNormal="max-w-[150px] w-full"
              to={"/sign-up"}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              type="button"
              classNameNormal="max-w-[150px] w-full"
              to={"/dashboard"}
            >
              DashBoard
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
