import React, { useEffect, useState } from "react";
import Post from "./Post";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

import PostSkeleton from "./Skeleton/Skeleton";

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPost = () => {
    try {
      setLoading(false);

      const fetchQuery = onSnapshot(
        query(collection(firestore, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      );

      fetchQuery;

      setTimeout(() => {
        setLoading(true);
      }, 1000);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [firestore]);

  return (
    <div>
      {loading ? (
        <>
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
        </>
      ) : (
        <>
          {[...Array(5)].map((_, i) => (
            <PostSkeleton key={i} loading={true} />
          ))}
        </>
      )}
    </div>
  );
};
export default Posts;
