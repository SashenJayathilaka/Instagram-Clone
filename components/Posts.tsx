import React, { useEffect, useState } from "react";
import Post from "./Post";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

import PostSkeleton from "./Skeleton/Skeleton";

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    setTimeout(() => {
      if (posts) {
        setLoading(true);
      } else return;
    }, 2000);
  }, [posts]);

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
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
          <PostSkeleton loading={true} />
        </>
      )}
    </div>
  );
};
export default Posts;
