/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { HomeIcon } from "@heroicons/react/solid";
import { modalState } from "../atoms/modalAtom";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Header() {
  const [open, setOpen] = useRecoilState(modalState);
  //const open = useRecoilValue(modalState);
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <div className="shadow-sm border-b big-white sticky top-0 z-58">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24"
        >
          <img
            className="mt-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            alt=""
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative w-10  lg:hidden flex-shrink-0 cursor-pointer"
        >
          <img
            className="mt-6"
            src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Black-Logo.wine.svg"
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
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-ping text-white">
                  3
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                onClick={signOut}
                className="h-10 rounded-full cursor-pointer"
                src={session.user.image}
                alt=""
              />
            </>
          ) : (
            <button onClick={signIn}>sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
