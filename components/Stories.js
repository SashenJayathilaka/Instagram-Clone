import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Story from "./Story";
import { auth } from "../firebase";

function Stories() {
  const [user] = useAuthState(auth);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
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
}

export default Stories;
