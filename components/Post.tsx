import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { firestore } from "../firebase/firebase";

type PostProps = {
  id: string;
  username: string;
  userImage: string;
  img: string;
  caption: string;
  userId: string;
};

const Post: React.FC<PostProps> = ({
  id,
  username,
  userImage,
  img,
  caption,
  userId,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const sendComment = async (e: any) => {
    e.preventDefault();

    if (comment) {
      setLoading(true);
      try {
        await addDoc(collection(firestore, "posts", id, "comments"), {
          comment: comment,
          username: session?.user?.name,
          userImage: session?.user?.image,
          timestamp: serverTimestamp(),
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      setComment("");
    } else {
      console.log("err");
    }
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firestore, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [firestore, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(firestore, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [firestore, id]
  );

  useEffect(
    () =>
      setHasLikes(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(
          doc(firestore, "posts", id, "likes", session?.user?.uid!)
        );
      } else {
        await setDoc(
          doc(firestore, "posts", id, "likes", session?.user?.uid!),
          {
            username: session?.user?.name,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = () => {
    if (session) {
      router.push({
        pathname: `profile/${userId}`,
        query: {
          userId: userId.toString(),
        },
      });
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white my-7 border rounded-sm"
    >
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 object-contain
        border p-1 mr-3 cursor-pointer"
          src={userImage}
          alt=""
          onClick={handleChangePage}
        />
        <p
          className="flex-1 font-bold cursor-pointer"
          onClick={handleChangePage}
        >
          {username}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>
      <img src={img} className="object-cover w-full" alt="" />
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLikes ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  onClick={likePost}
                  className="btn text-red-500"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={likePost}
                  className="btn"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="btn"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="btn -rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </motion.button>
          </div>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="btn"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </motion.button>
        </div>
      )}

      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center
            space-x-2 mb-3"
            >
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              <p className="pr-5 text-xs">
                {moment(
                  new Date(comment.data().timestamp?.seconds * 1000)
                ).fromNow()}
              </p>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>

          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate-spin text-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              //disabled={!comment.trim()}
              onClick={sendComment}
              className="font-semibold text-blue-400"
            >
              Post
            </motion.button>
          )}
        </form>
      )}
    </motion.div>
  );
};
export default Post;
