"use client";

import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Context from "./components/appcontext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const QU = "https://www.omdbapi.com/?apikey=17d62319&s=";

const initialState = {
  searchText: "",
  setSearchText: (text: string) => {},
  setLoggedInUser: (text: string) => {},
  searchResult: [],
  user: "",
  loading: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contextState, setContextState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const username = params.get("user");

  useEffect(() => {
    if (username && username != "") {
      const check = localStorage.getItem(username);

      if (check) {
        setContextState({
          ...contextState,
          user: username,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSearchUpdate = async (text: string) => {
    setLoading(true);
    setContextState({
      ...contextState,
      loading,
    });
    const resp = await fetch(`${QU}${text}`);
    const { Search } = await resp.json();
    setLoading(false);
    setContextState({
      ...contextState,
      searchText: text,
      searchResult: Search,
      loading,
    });
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Context.Provider
          value={{
            ...contextState,
            setSearchText: handleSearchUpdate,
            loading,
          }}
        >
          <Suspense>{children}</Suspense>
        </Context.Provider>
      </body>
    </html>
  );
}
