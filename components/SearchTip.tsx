import { faker } from "@faker-js/faker";
import React from "react";

type SearchTipProps = {
  searchValue: string;
};

const SearchTip: React.FC<SearchTipProps> = ({ searchValue }) => {
  return (
    <div className="search-tip absolute top-[70px] bg-white w-96 left-1/2 -translate-x-1/2 shadow-xl p-5 rounded-md">
      <div className="flex justify-between mb-5">
        <h3 className="font-bold text-sm">Recent</h3>
        <button className="text-blue-400 text-sm font-bold">clear all</button>
      </div>

      <div className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center">
          <div className="avatar">
            <div className="rounded-full w-14 h-14">
              <img
                src={faker.image.avatar()}
                alt={faker.name.firstName()}
                className="rounded-full p-[1.5px] border-blue-500 border-2"
              />
            </div>
          </div>
          <div className="pl-4">
            <div className="text-md font-semibold">
              {faker.name.firstName()}
            </div>
            <div className="text-gray-500">{faker.company.bs()}</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default SearchTip;
