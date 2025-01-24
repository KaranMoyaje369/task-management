// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

const SearchBar = ({ onSearch, tasks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Debounce the search input to reduce the number of calls to onSearch
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedSearchTerm); // Trigger search with debounced term

    if (debouncedSearchTerm) {
      const filteredSuggestions = tasks.filter((task) =>
        task.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); // Show top 5 suggestions
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm, tasks, onSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="bg-yellow-300">${match}</span>`
    );
  };

  return (
    <div className="container mx-auto relative mb-6 flex items-center justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-8 py-3 rounded-full shadow-md outline-none"
        placeholder="Search tasks..."
      />
      <button
        className="absolute right-5 bg-blue-700 text-white font-bold p-1 rounded-full shadow-md top-1/2 transform -translate-y-1/2"
        onClick={() => onSearch(searchTerm)}
      >
        <AiOutlineSearch size={20} />
      </button>

      <button
        className="absolute right-14 bg-blue-700 text-white font-bold p-1 rounded-full shadow-md top-1/2 transform -translate-y-1/2"
        onClick={() => {
          setSearchTerm("");
          onSearch("");
        }}
      >
        <AiOutlineClose size={20} />
      </button>

      {suggestions.length > 0 && (
        <div className="absolute w-1/2 top-full bg-white border mt-1 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setSearchTerm(suggestion.name);
                setSuggestions([]);
              }}
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(suggestion.name, searchTerm),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
