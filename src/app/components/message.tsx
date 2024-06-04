import React from "react";

type Props = {};

import Bookmark from "./bookmark";
import Check from "./check";

export default function message({}: Props) {
  return (
    <div className="flex flex-col mb-8 p-4 border border-red-900 rounded-md">
      <div className="mb-8 text-2xl">
        Welcome to <span className="text-2xl text-red-600">Watchlists</span>
      </div>
      <div className="text-sm">
        Browse movies, add them to watchlists and share them with friends
      </div>
      <div className="flex text-sm">
        <p>Just click the </p>
        <Bookmark width={30} />
        <div className="flex text-sm">
          <p>to add a movie, the poster to see more details or</p>{" "}
          <Check width={30} fill={"green"} className="-mt-2" />
          <p>to mark the movie as watched.</p>
        </div>
      </div>
    </div>
  );
}
