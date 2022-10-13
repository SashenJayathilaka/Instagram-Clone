import React from "react";

type IntroProps = {};

const Intro: React.FC<IntroProps> = () => {
  return (
    <>
      <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t z-0">
        <div className="flex flex-row mt-4 justify-center mr-16">
          <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
            <div className="flex">
              <button className="border-transparent text-gray-800 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="flex ml-2 mt-1">
              <h3 className="text-sm font-bold text-gray-800 mr-2">POSTS</h3>
            </div>
          </div>

          <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
            <div className="flex">
              <button className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="flex ml-2 mt-1">
              <h3 className="text-sm font-medium text-gray-700 mr-2">IGTV</h3>
            </div>
          </div>

          <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
            <div className="flex">
              <button className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
            <div className="flex ml-2 mt-1">
              <h3 className="text-sm font-medium text-gray-700 mr-2">SAVED</h3>
            </div>
          </div>

          <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
            <div className="flex">
              <button className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </button>
            </div>
            <div className="flex ml-2 mt-1">
              <h3 className="text-sm font-medium text-gray-700 mr-2">TAGGED</h3>
            </div>
          </div>
        </div>
      </ul>
    </>
  );
};
export default Intro;
