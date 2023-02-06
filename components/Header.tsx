import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import HeartTip from "./HeartTip";
import PostModal from "./modal/PostModal";
import SearchTip from "./SearchTip";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [heartTipOpen, setHartTipOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setHartTipOpen(false);
    }, 20000);
  }, [heartTipOpen]);

  return (
    <>
      <div className="shadow-sm border-b bg-white sticky top-0 z-58">
        <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
          <div
            onClick={() => router.push("/")}
            className="relative hidden lg:inline-grid w-24"
          >
            <img
              className="mt-4  cursor-pointer"
              src="https://i.postimg.cc/HsQWcQVm/Instagram-logo-svg.png"
              alt=""
            />
          </div>
          <div
            onClick={() => router.push("/")}
            className="relative w-10  lg:hidden flex-shrink-0 cursor-pointer"
          >
            <img
              className="mt-6 cursor-pointer"
              src="https://i.postimg.cc/TPPWJkDg/5ecec78673e4440004f09e77.png"
              alt=""
            />
          </div>
          <div className="max-w-xs">
            <div className="relative mt-1 p-3 rounded-md">
              <div
                onMouseLeave={() => !searchValue && setIsOpen(false)}
                onMouseEnter={() => setIsOpen(true)}
              >
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  onMouseLeave={() => !searchValue && setIsOpen(false)}
                  onMouseEnter={() => setIsOpen(true)}
                >
                  <SearchTip searchValue={searchValue} />
                </motion.div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="navBtn"
              onClick={() => router.push("/")}
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>

            <div className="h-6 md:hidden cursor-pointer">
              <MenuIcon />
            </div>

            {session ? (
              <>
                <div className="relative navBtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="navBtn"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                    />
                  </svg>

                  <div className="absolute -top-1 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-ping text-white">
                    3
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    onClick={() => setOpen(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="navBtn"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.button>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="navBtn"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="navBtn"
                  onClick={() => setHartTipOpen(true)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                {heartTipOpen && <HeartTip />}

                <img
                  onClick={() => signOut()}
                  className="h-10 rounded-full cursor-pointer"
                  src={session?.user?.image as string}
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
