/* eslint-disable @next/next/no-img-element */
"use client";

import Grid from "./components/grid";
import Message from "./components/message";
import Search from "./components/search";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen">
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-col justify-center items-center p-8 border w-full">
          <Message />
          <Search />
          <Grid />
        </div>
      </div>
    </main>
  );
}
