import React, { useEffect, useState } from "react";
import Post from "./Post";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [firestore]
  );
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userId={post.data().userId}
          username={post.data().username}
          userImage={post.data().profileImage}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};
export default Posts;
