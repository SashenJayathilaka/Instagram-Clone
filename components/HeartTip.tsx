import React from "react";

type HeartIconProps = {};

const HeartTip: React.FC<HeartIconProps> = () => {
  return (
    <div className="heart_tip absolute top-[58px] bg-red-500 -translate-x-1/2 p-3 pl-[20px] rounded-lg">
      <div className="flex space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>

        <div className="text-white font-semibold">1</div>
      </div>
    </div>
  );
};
export default HeartTip;
