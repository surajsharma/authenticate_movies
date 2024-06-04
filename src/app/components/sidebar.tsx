import { useRouter } from "next/navigation";
import User from "./user";
import Userlists from "./userlists";
import Context from "./appcontext";
import { useContext, useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useContext(Context);
  const [userData, setuserData] = useState<any>({});

  useEffect(() => {
    if (user != "") {
      const udata = localStorage.getItem(user);
      if (udata) {
        const data = JSON.parse(udata);
        setuserData(data);
      }
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center gap-4 border-gray-300 p-4 border-r w-64">
      <h1 className="font-bold text-3xl text-red-600">watchlists</h1>
      <input
        disabled
        className="border-gray-300 shadow mb-6 p-1 border focus:outline-none rounded-lg grayscale"
        placeholder="🔍 search"
      />
      <button
        onClick={() =>
          userData?.username
            ? router.push(`/?user=${userData.username}`)
            : router.push("/")
        }
        className="flex items-center bg-red-600 mb-2 p-2 rounded-lg w-56 h-8 text-white hover:grayscale"
      >
        <>🏠 Home</>
      </button>
      <div className="border-gray-300 mb-4 border border-b w-60 h-0"></div>

      <Userlists />
      <User />
    </div>
  );
}
