import React, { useEffect, useState } from "react";
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
import db from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Moment from "react-moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import TelegramIcon from "@material-ui/icons/Telegram";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

type PostProps = {
  id: any;
  username: string;
  userImage: string;
  img: string;
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
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState<boolean>(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () => setHasLikes(likes.findIndex((like) => like.id! === user?.uid) !== -1),
    [likes]
  );

  const likePost = async () => {
    if (hasLikes) {
      await deleteDoc(doc(db, "posts", id, "likes", user?.uid!));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user?.uid!), {
        username: user?.displayName,
      });
    }
  };

  const sendComment = async (e: any) => {
    e.preventDefault();

    const commentToSend = comment;

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: user?.displayName,
      userImage: user?.photoURL,
      timestamp: serverTimestamp(),
    });
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
        <MoreHorizIcon className="h-5 cursor-pointer" />
      </div>
      <img src={img} className="object-cover w-full" alt="" />
      {user && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLikes ? (
              <FavoriteIcon
                onClick={likePost}
                className="btn text-red-500 cursor-pointer"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={likePost}
                className="btn cursor-pointer"
              />
            )}
            <ChatBubbleOutlineOutlinedIcon className="btn" />
            <TelegramIcon className="btn" />
          </div>
          <BookmarkBorderIcon className="btn" />
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
              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {user && (
        <form className="flex items-center p-4">
          <SentimentVerySatisfiedIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
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
