const Label = ({ children, htmlFor = "", ...props }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="mb-5 text-xl font-semibold cursor-pointer"
      >
        {children}
      </label>
    </>
  );
};

export default Label;
