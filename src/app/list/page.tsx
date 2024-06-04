"use client";

import Context from "../components/appcontext";
import Grid from "../components/grid";
import Sidebar from "../components/sidebar";

import React, { useContext, useEffect, useState } from "react";

export default function List() {
  const { user, setSearchText, searchText } = useContext(Context);
  const [userData, setuserData] = useState<any>({});

  useEffect(() => {
    if (searchText !== "") {
      setSearchText("");
    }
    if (user != "") {
      const dataString = localStorage.getItem(user);
      const udata = JSON.parse(dataString as string);
      if (udata) {
        setuserData(udata);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateListName = () => {
    const userInput = prompt("Enter new title for your list:");
    if (userInput !== null) {
      if (user != "") {
        const dataString = localStorage.getItem(user);
        const udata = JSON.parse(dataString as string);
        const { listName } = udata;

        if (udata) {
          setuserData({ ...udata, listName: userInput });
          localStorage.setItem(
            user,
            JSON.stringify({ ...udata, listName: userInput })
          );
        }
      }
      window.location.reload();
    }
  };

  return (
    <main className="flex w-full min-h-screen">
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-col justify-center items-center p-8 border w-full">
          <h1 className="flex text-xl">
            {userData.listName}
            <div className="hover:cursor-pointer" onClick={updateListName}>
              ✏️
            </div>
          </h1>
          <Grid list={userData.movies} showSeen={true} />
        </div>
      </div>
    </main>
  );
}
