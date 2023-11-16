import { useDropDown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropDown();
  return (
    <>
      {show && (
        <div className="absolute left-0 w-full bg-white shadow-sm top-full">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
