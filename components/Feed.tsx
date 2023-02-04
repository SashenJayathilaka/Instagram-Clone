import { Session } from "next-auth";
import React from "react";

import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

type FeedProps = {
  session: Session;
};

const Feed: React.FC<FeedProps> = ({ session }) => {
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto
      ${!session && "!grid-cols-1 !max-w-3xl"}`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
};
export default Feed;
