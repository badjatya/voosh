"use client";
import { createContext, useState, useContext } from "react";

// Creating the search context
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
	const [searchValue, setSearchValue] = useState("");
	return (
		<SearchContext.Provider value={{ searchValue, setSearchValue }}>
			{children}
		</SearchContext.Provider>
	);
};

// Custom hook to use the search context
export const useSearch = () => useContext(SearchContext);
