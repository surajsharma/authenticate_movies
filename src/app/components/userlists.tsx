import React, { useContext, useEffect, useState } from "react";
import Context from "./appcontext";
import { useRouter } from "next/navigation";

export default function Userlists() {
  const [userData, setuserData] = useState<any>({});
  const { user } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (user != "") {
      const udata = localStorage.getItem(user);

      if (udata) {
        const data = JSON.parse(udata);
        setuserData(data);
      }
    }
  }, [user]);

  function gotoList() {
    userData?.username && router.push(`/list?user=${userData?.username}`);
  }

  return (
    <div className="flex flex-col w-56 h-80">
      {user && (
        <>
          <div className="mb-3 font-bold">My Lists</div>
          <div className="flex flex-col gap-2 overflow-scroll no-scrollbar">
            {
              <button
                onClick={() => gotoList()}
                className="flex items-center gap-2 border-2 border-gray-300 hover:bg-red-400 p-2 rounded-lg w-56 h-8 text-gray-900"
              >
                <div className="flex justify-center items-center bg-gray-400 p-2 rounded-2xl w-6 h-6 text-ellipsis truncate capitalize">
                  {userData?.listName?.[0] ?? ""}
                </div>
                {userData?.listName}
              </button>
            }
          </div>
        </>
      )}
    </div>
  );
}
