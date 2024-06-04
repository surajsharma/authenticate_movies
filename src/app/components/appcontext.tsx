import { createContext } from "react";

interface ContextProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchResult: any[];
  user: string;
  setLoggedInUser: (text: string) => void;
  loading: boolean;
}

const Context = createContext<ContextProps>({
  searchText: "",
  setSearchText: () => {},
  searchResult: [],
  user: "",
  loading: false,
  setLoggedInUser: () => {},
});

export default Context;
