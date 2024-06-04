import React, { useContext, useEffect, useState } from "react";
import Context from "./appcontext";

export default function Search() {
  const [localSearchText, setLocalSearchText] = useState("");
  const { setSearchText } = useContext(Context);

  const debouncedSearchText = React.useRef("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchText(event.target.value);
    debouncedSearchText.current = event.target.value;
  };

  return (
    <div className="flex mb-8">
      <input
        className="border-gray-300 mb-6 p-1 border focus:outline-none rounded-tl-lg rounded-bl-lg w-full h-8 grayscale"
        placeholder="🔍 type and click search"
        onChange={handleSearchChange}
        value={localSearchText}
      />
      <button
        onClick={() => setSearchText(debouncedSearchText.current)}
        className="flex items-center bg-red-600 mb-2 p-2 rounded-tr-lg rounded-br-lg h-8 text-white hover:grayscale"
      >
        <>Search</>
      </button>
    </div>
  );
}
