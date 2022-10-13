import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase/firebase";

type StoriesProps = {};

const Stories: React.FC<StoriesProps> = () => {
  const [user] = useAuthState(auth);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div
      className="
    flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm 
    overflow-x-scroll scrollbar-thin
    scrollbar-thumb-black"
    >
      {user && <Story img={user?.photoURL} username={user?.displayName} />}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};
export default Stories;
