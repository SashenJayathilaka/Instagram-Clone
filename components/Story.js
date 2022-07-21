/* eslint-disable @next/next/no-img-element */
import React from "react";
function Story({ img, username }) {
  //console.log(username, "🚀🚀");
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2
        cursor-pointer object-contain hover:scale-110 
        transition-transform
        duration-200 ease-out"
        src={img}
        alt=""
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
