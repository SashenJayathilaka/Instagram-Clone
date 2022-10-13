import React, { useEffect, useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  addDoc,
  collection,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  doc,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";

type PostProps = {
  id: any;
  username: any;
  userImage: any;
  img: any;
  caption: any;
};

const Post: React.FC<PostProps> = ({
  id,
  username,
  userImage,
  img,
  caption,
}) => {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState(false);

  const sendComment = async (e: any) => {
    e.preventDefault();
    /*     setLoading(true); */

    try {
      await addDoc(collection(firestore, "posts", id, "comments"), {
        comment: comment,
        username: user?.displayName,
        userImage: user?.photoURL,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setComment("");
    /*  setLoading(false); */
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
    () => setHasLikes(likes.findIndex((like) => like.id === user?.uid) !== -1),
    [likes]
  );

  const likePost = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(doc(firestore, "posts", id, "likes", user?.uid!));
      } else {
        await setDoc(doc(firestore, "posts", id, "likes", user?.uid!), {
          username: user?.displayName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 object-contain
        border p-1 mr-3 cursor-pointer"
          src={userImage}
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <MoreHorizOutlinedIcon className="h-5 cursor-pointer" />
      </div>
      <img src={img} className="object-cover w-full" alt="" />
      {user && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLikes ? (
              <FavoriteOutlinedIcon
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={likePost} className="btn" />
            )}
            <ChatBubbleOutlineOutlinedIcon className="btn" />
            <img
              src="https://cdn.onlinewebfonts.com/svg/img_379476.png"
              alt=""
              className="btn w-5 h-5 mt-1"
            />
          </div>
          <BookmarkBorderOutlinedIcon className="btn" />
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

      {user && (
        <form className="flex items-center p-4">
          <TagFacesOutlinedIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            //disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};
export default Post;
