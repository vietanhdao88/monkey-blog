import { createContext, useContext, useState } from "react";

const DropDownContext = createContext();
function DropDownProvider(props) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const value = { show, toggle, setShow };
  return (
    <DropDownContext.Provider value={value}>
      {props.children}
    </DropDownContext.Provider>
  );
}
function useDropDown() {
  const context = useContext(DropDownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropDown, DropDownProvider };
