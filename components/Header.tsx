import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase/firebase";
import PostModal from "./modal/PostModal";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <div className="shadow-sm border-b big-white sticky top-0 z-58">
        <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
          <div
            /* onClick={() => router.push("/")} */
            className="relative hidden lg:inline-grid w-24"
          >
            <img
              className="mt-4"
              src="https://i.postimg.cc/HsQWcQVm/Instagram-logo-svg.png"
              alt=""
            />
          </div>
          <div
            /* onClick={() => router.push("/")} */
            className="relative w-10  lg:hidden flex-shrink-0 cursor-pointer"
          >
            <img
              className="mt-6"
              src="https://i.postimg.cc/TPPWJkDg/5ecec78673e4440004f09e77.png"
              alt=""
            />
          </div>
          <div className="max-w-xs">
            <div className="relative mt-1 p-3 rounded-md">
              <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <HomeIcon
              /* onClick={() => router.push("/")}  */
              className="navBtn"
            />
            <div className="h-6 md:hidden cursor-pointer">
              <MenuIcon />
            </div>

            {user ? (
              <>
                <div className="relative navBtn">
                  <img
                    src="https://cdn.onlinewebfonts.com/svg/img_379476.png"
                    alt=""
                    className="navBtn w-5 h-5"
                  />
                  {/* <SendOutlinedIcon className="navBtn rotate-45" /> */}
                  <div className="absolute -top-1 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-ping text-white">
                    3
                  </div>
                </div>

                <AddCircleOutlineIcon
                  onClick={() => setOpen(true)}
                  className="navBtn"
                />
                <PeopleOutlineIcon className="navBtn" />
                <FavoriteBorderIcon className="navBtn" />

                <img
                  onClick={logout}
                  className="h-10 rounded-full cursor-pointer"
                  src={user?.photoURL as string}
                  alt=""
                />
              </>
            ) : (
              <button onClick={() => router.push("/auth/login")}>
                sign In
              </button>
            )}
          </div>
        </div>
      </div>
      <PostModal open={open} setOpen={setOpen} />
    </>
  );
};
export default Header;
