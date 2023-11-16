import { NavLink } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";
const Button = ({
  type = "button",
  children,
  disable,
  onClick = () => {},
  kind = true,
  className,
  classNameNormal,
  isLoading = false,
  ...props
}) => {
  const { to } = props;
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <button
          className={`rounded-lg ${
            kind ? "button" : "bg-[#fff] rounded-lg text-primary font-semibold"
          } px-5 py-3 block ${className} ${classNameNormal}`}
          type="type"
          {...props}
        >
          {child}
        </button>
      </NavLink>
    );
  }
  return (
    <button
      className={`rounded-lg ${
        kind ? "button" : "bg-[#fff] rounded-lg text-primary"
      } px-5 py-3 block ${className} ${classNameNormal} flex justify-center items-center`}
      onClick={onClick}
      type="type"
      disabled={disable}
      {...props}
    >
      {child}
    </button>
  );
};
/**
 * @required
 * @param {string} type
 *
 * @returns
 */
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  children: PropTypes.any,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default Button;
