import React from "react";
import Button from "../../components/button/Button";

const HomeBanner = () => {
  return (
    <div
      className="min-h-[520px]"
      style={{
        background: "linear-gradient(155deg, #00B4AA 6.67%, #A4D96C 84.1%)",
      }}
    >
      <div className="flex items-center justify-between p-10">
        <div className="max-w-[450px]">
          <h1 className="text-5xl font-bold text-white mb-7">
            Monkey Blogging
          </h1>
          <p className="w-full mb-12 text-base font-normal leading-7 text-justify text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </p>
          <Button type="button" to={"/sign-up"} kind={false}>
            Get Started
          </Button>
        </div>
        <div>
          <img src="/banner.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
