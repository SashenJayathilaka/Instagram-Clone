import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { firestore } from "../../firebase/firebase";

type CustomPostsProps = {
  img: string;
  userId: string;
  userDBId: string;
  id: string;
};

const CustomPosts: React.FC<CustomPostsProps> = ({
  img,
  userId,
  userDBId,
  id,
}) => {
  const [likes, setLikes] = useState<any[]>([]);

  useEffect(
    () =>
      onSnapshot(collection(firestore, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [firestore, id]
  );
  return (
    <>
      {userDBId === userId && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-1/3 p-px md:px-3"
        >
          <div className="post bg-gray-100 text-white relative pb-full md:mb-6">
            <img
              className="w-full h-full absolute left-0 top-0 object-cover cursor-pointer rounded-md"
              src={img}
              alt="image"
            />

            <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden cursor-pointer">
              <div className="flex justify-center items-center space-x-4 h-full">
                <span className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <p className="font-bold text-center">{likes.length}</p>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default CustomPosts;
