import React, { useContext, useState } from "react";

import Context from "./appcontext";

export default function User() {
  const { user } = useContext(Context);
  const [menu, setMenu] = useState(false);

  return (
    <div className="flex justify-between items-center border-2 border-gray-300 p-2 rounded-lg w-56 h-10">
      <div className="flex items-center gap-4 w-56">
        <div className="flex justify-center items-center bg-blue-400 p-2 rounded-2xl w-8 h-8 capitalize">
          {user?.[0] ?? "G"}
        </div>
        <div className="w-32 text-ellipsis text-sm truncate">
          {" "}
          {user ? user : "Guest"}
        </div>
      </div>
      <button className="relative flex justify-center items-center h-10">
        {menu && (
          <div className="absolute bg-red-600 -mt-20 -ml-16 p-2 rounded-md">
            <a className="text-black text-md hover:text-white" href="/login">
              {user == "" ? "Login" : "Logout"}
            </a>
          </div>
        )}
        <p className="-mt-3 text-2xl" onClick={() => setMenu(!menu)}>
          ...
        </p>
      </button>
    </div>
  );
}
