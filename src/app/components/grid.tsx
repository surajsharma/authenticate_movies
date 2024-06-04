import React, { useEffect, useState } from "react";
import Movie from "./movie";
import Context from "./appcontext";

type Props = { list?: []; showSeen?: boolean };

export default function Grid({ list, showSeen }: Props) {
  const { searchResult, loading, searchText } = React.useContext(Context);
  const [movies, setMovies] = useState<any>([]);

  useEffect(() => {
    if (list && list.length > 0) {
      setMovies(list);
    } else {
      setMovies(searchResult);
    }
  }, [searchResult, list]);

  return (
    <>
      <div className="relative flex flex-wrap justify-start gap-6 p-2 h-80 overflow-x-hidden overflow-y-scroll">
        {loading && <p>Loading...</p>}
        {!loading &&
          movies &&
          movies.map((movie: any) => (
            <Movie
              movie={movie}
              key={movie?.imdbID}
              showSeen={showSeen ?? false}
              seen={movie?.seen}
            />
          ))}
        {searchText != "" && !movies && !loading && <p>Nothing found!</p>}
        <div className="border-white mb-4 border border-b w-full h-0"></div>
      </div>
    </>
  );
}
