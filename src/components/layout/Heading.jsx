import React from "react";

const Heading = ({ children }) => {
  return (
    <h2 className="relative heading text-[28px] font-semibold font-secondFont text-purple leading-9 mb-8">
      {children}
    </h2>
  );
};

export default Heading;
