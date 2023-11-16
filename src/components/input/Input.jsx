import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { styled } from "styled-components";
// import PropTypes from "prop-types";

const InputStyled = styled.div`
  position: relative;
  input {
    padding: ${(props) =>
      props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
  }
  input::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Input = forwardRef(function Input1(
  { name, type = "text", hasIcon = false, children, control, ...props },
  ref
) {
  const { field } = useController({ name, control, defaultValue: "" });
  // const hasIcon = {children ? true : false}
  return (
    <InputStyled>
      <input
        id={name}
        type={type}
        {...field}
        {...props}
        className="w-full px-6 py-6 transition-all border border-gray-300 rounded-lg outline-none input bg-grayDark"
        ref={ref}
      />
      {children ? (
        <div className="absolute cursor-pointer right-5 top-2/4 -translate-y-2/4">
          {children}
        </div>
      ) : null}
    </InputStyled>
  );
});
// Input.propTypes = {
//   name: PropTypes.string.isRequired,
//   type: PropTypes.string(),
//   children: PropTypes.any,
//   control: PropTypes.any.isRequired,
// };
export default Input;
