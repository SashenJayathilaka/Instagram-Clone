import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { firestore } from "../../firebase/firebase";
import CustomPosts from "./CustomPosts";

type ProfileFeedProps = {
  userId: string;
  setUserData: Function;
};

const ProfileFeed: React.FC<ProfileFeedProps> = ({ userId, setUserData }) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
          setUserData(snapshot.docs);
        }
      ),
    [firestore]
  );

  return (
    <div className="flex flex-wrap -mx-px md:-mx-3">
      {posts.map((post) => (
        <CustomPosts
          id={post.id}
          img={post.data().image}
          userId={userId}
          userDBId={post.data().userId}
          key={post.id}
        />
      ))}
    </div>
  );
};
export default ProfileFeed;
