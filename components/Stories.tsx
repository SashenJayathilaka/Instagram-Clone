import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import Story from "./Story";

type StoriesProps = {};

const Stories: React.FC<StoriesProps> = () => {
  const { data: session } = useSession();
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
    flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black"
    >
      {session && (
        <Story img={session?.user?.image!} username={session?.user?.name!} />
      )}

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
