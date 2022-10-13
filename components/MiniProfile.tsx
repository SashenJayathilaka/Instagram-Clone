import React from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase/firebase";

type MiniProfileProps = {};

const MiniProfile: React.FC<MiniProfileProps> = () => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="w-16 h-16 rounded-full border p-[2px]"
        src={user?.photoURL as string}
        alt=""
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{user?.displayName}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button onClick={logout} className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  );
};
export default MiniProfile;
