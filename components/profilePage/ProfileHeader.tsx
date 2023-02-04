import React from "react";
import { faker } from "@faker-js/faker";
import AvatarSkeleton from "../Skeleton/AvatarSkeleton";
import { motion } from "framer-motion";

import { UserData } from "../../typings";

type ProfileHeaderProps = {
  isShow: boolean;
  userData: UserData;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isShow, userData }) => {
  return (
    <header className="flex flex-wrap items-center p-4 md:py-8">
      <div className="md:w-3/12 md:ml-16">
        {userData.profileImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <img
              className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
              src={userData.profileImage}
              alt="profile"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AvatarSkeleton />
          </motion.div>
        )}
      </div>
      <div className="w-8/12 md:w-7/12 ml-4">
        <div className="md:flex md:flex-wrap md:items-center mb-4">
          <h2 className="text-3xl inline-block font-semibold md:mr-2 mb-2 sm:mb-0">
            {userData.username}
          </h2>

          <span
            className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6  text-xl transform -translate-y-2"
            aria-hidden="true"
          >
            <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
          </span>

          <div className="bg-blue-500 text-white hover:bg-blue-600 px-2 hover:text-white py-1 font-semibold text-sm rounded text-center sm:inline-block block cursor-pointer">
            Follow
          </div>
          {isShow && (
            <span className="text-base font-semibold text-gray-700">
              <button
                className="p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600 cursor-pointer"
                aria-label="Notifications"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </span>
          )}
        </div>

        <ul className="hidden md:flex space-x-8 mb-4">
          <li>
            <span className="font-semibold">{faker.random.numeric()}</span>
            posts
          </li>

          <li>
            <span className="font-semibold">{faker.random.numeric()}K</span>
            followers
          </li>
          <li>
            <span className="font-semibold">{faker.random.numeric()}</span>
            following
          </li>
        </ul>

        <div className="hidden md:block">
          <h1 className="font-semibold">{userData.company}</h1>
          <span className="bioclassName">{faker.company.name()}</span>
          <p>{faker.commerce.productDescription()}</p>
          <span>
            <strong>{faker.internet.domainName()}</strong>
          </span>
        </div>
      </div>

      <div className="md:hidden text-sm my-2">
        <h1 className="font-semibold">ByteWebster</h1>
        <span className="bioclassName">Internet company</span>
        <p>
          ByteWebster is a web development and coding blog website. Where we
          provide professional web projects🌍
        </p>
        <span>
          <strong>www.bytewebster.com</strong>
        </span>
      </div>
    </header>
  );
};
export default ProfileHeader;
