import React, { useState, useEffect, useContext } from "react";

import Bookmark from "./bookmark";
import Check from "./check";

import Image from "next/image";
import Context from "./appcontext";

const RU = "https://www.omdbapi.com/?apikey=17d62319&i=";

type Props = {
  movie: any;
  showSeen: boolean;
  seen: boolean;
};

export default function Movie({ movie, showSeen, seen }: Props) {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState<any>({});
  const [localSeen, setLocalSeen] = useState<boolean>(false);

  const { user } = useContext(Context);
  const [userData, setuserData] = useState<any>({});

  useEffect(() => {
    if (user != "") {
      const udata = localStorage.getItem(user);

      if (udata) {
        const data = JSON.parse(udata);
        setuserData(data);
      }

      if (Object.keys(movie).includes("seen")) {
        setLocalSeen(movie.seen);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const emotionRating = (r: number) => {
    if (r >= 90 && r <= 100) return "😎";
    else if (r >= 60 && r < 90) return "😊";
    else if (r >= 40 && r < 60) return "😐";
    else if (r >= 20 && r < 40) return "🤢";
    else return "🤮";
  };

  const isUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  const openMovieDetails = async (imdbID: string) => {
    const resp = await fetch(`${RU}${imdbID}`);
    const data = await resp.json();

    setMovieDetails(data);
    setModalOpen(true);
  };

  const addToPersonalList = (movie: any) => {
    const movieToAdd = { ...movie, seen: false };

    if (user !== "") {
      const dataString = localStorage.getItem(user);
      const udata = JSON.parse(dataString as string);

      const existingMovieIndex = udata.movies.findIndex(
        (m: any) => m.imdbID === movie.imdbID
      );

      if (existingMovieIndex !== -1) {
        udata.movies.splice(existingMovieIndex, 1);
        alert("movie removed from personal list!");
      } else {
        udata.movies.push(movieToAdd);
        alert("movie added to personal list!");
      }

      const newUserData = JSON.stringify(udata);
      localStorage.setItem(user, newUserData);
    }
  };

  const toggleSeen = (movie: any) => {
    const movieToAdd = { ...movie, seen: !movie.seen };
    setLocalSeen(!localSeen);
    if (user != "") {
      const dataString = localStorage.getItem(user);
      const udata = JSON.parse(dataString as string);
      const { movies } = udata;

      const newMovies = [
        ...movies.filter((m: any) => m.imdbID != movie.imdbID),
        movieToAdd,
      ];

      const newUserData = JSON.stringify({ ...udata, movies: newMovies });
      localStorage.setItem(user, newUserData);
    }
  };

  useEffect(() => {
    const getRating = async () => {
      setLoading(true);
      const resp = await fetch(`${RU}${movie.imdbID}`);
      const { Ratings } = await resp.json();

      Ratings &&
        Ratings.forEach((rating: any) => {
          if (rating.Source == "Internet Movie Database")
            setRating(parseInt(rating.Value.split("/")[0]) * 10);
          if (rating.Source == "Rotten Tomatoes")
            setRating(parseInt(rating.Value.split("%")[0]));
          if (rating.Source == "Metacritic")
            setRating(parseInt(rating.Value.split("/")[0]));
        });
    };

    getRating();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-col flex-wrap flex-shrink border-gray-200 shadow w-28">
      <div className="relative flex flex-col items-end">
        {user && (
          <div className="z-10 absolute flex justify-between w-28">
            <div className="hover:cursor-pointer">
              <Bookmark
                onClick={() => !showSeen && addToPersonalList(movie)}
                width={30}
                className={`${
                  !showSeen ? "opacity-70" : "opacity-0"
                } -mt-1 -ml-2 outline-black hover:fill-red-600`}
              />
            </div>

            {showSeen && (
              <Check
                width={30}
                fill={localSeen ? "green" : "white"}
                className="-mt-2 hover:cursor-pointer"
                onClick={() => toggleSeen(movie)}
              />
            )}
          </div>
        )}
        <div
          className="flex justify-center items-center w-full h-44"
          onClick={() => openMovieDetails(movie.imdbID)}
        >
          {isUrl(movie.Poster) ? (
            <>
              <Image src={movie.Poster} alt="image" fill={true} />
              {"Loading..."}
            </>
          ) : (
            <p className="mt-20 mb-8 text-center">No Image Found!</p>
          )}
        </div>
      </div>
      <div className="flex-col flex-wrap items-stretch p-1">
        <div className="text-right flex-1 mb-2">
          {!loading ? (
            <div className="flex justify-end text-lg">
              <p className="font-bold">
                {rating && emotionRating(rating)}
                {rating && rating}
              </p>
              <p className="text-xs">/100</p>
            </div>
          ) : (
            <p className="text-xs">loading...</p>
          )}
        </div>
        <div className="flex-1">
          <div className="font-bold text-ellipsis text-xs">{movie.Title}</div>
          <div className="w-28 text-xs">{movie.Year}</div>
        </div>
      </div>
      {modalOpen && (
        <div className="z-50 fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity duration-300 overflow-y-auto ease-in-out">
          <div className="flex justify-center items-center px-4 pt-4">
            <div
              onClick={() => setModalOpen(false)}
              className="top-0 left-0 fixed bg-transparent p-16 w-full h-full overflow-auto"
            >
              <div className="bg-white shadow-lg mx-auto rounded-lg w-[500px] transform transition-all duration-300 ease-in-out">
                <div className="flex justify-between items-start border-gray-200 p-4 border-b rounded-top">
                  <h3 className="font-medium text-gray-900 text-xl">
                    Movie Details
                  </h3>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="text-gray-400 focus:outline-none bg-gray-300 rounded-full w-8 h-8 hover:text-gray-700"
                  >
                    ❌
                  </button>
                </div>
                <div className="flex md:flex-row flex-col">
                  <div className="p-2 w-80">
                    {isUrl(movie.Poster) && (
                      <Image
                        src={movie.Poster}
                        alt="image"
                        fill={false}
                        width={300}
                        height={400}
                      />
                    )}
                  </div>
                  <div className="p-4 w-full">
                    <h2 className="font-medium text-gray-900 text-xl">
                      {movie.Title}
                    </h2>
                    <p className="mb-2 text-gray-700">
                      Released: {movieDetails?.Released}
                    </p>
                    <p className="mb-2 text-gray-700">
                      Genre: {movieDetails?.Genre}
                    </p>
                    <p className="mb-2 text-gray-700">
                      Language: {movieDetails?.Language}
                    </p>
                    <p className="mb-2 text-gray-700">
                      Rated: {movieDetails?.Rated}
                    </p>
                    <p className="text-gray-700">{movieDetails?.Plot}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
