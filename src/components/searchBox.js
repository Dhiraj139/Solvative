import React, { forwardRef, useState } from "react";
import "./SearchBox.css";

const SearchBox = forwardRef(({ onSearch }, ref) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(inputValue);
    }
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        className="search-box"
        placeholder="Search places..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        ref={ref}
      />
      <div className="keyboard-shortcut">Ctrl + /</div>
    </div>
  );
});

export default SearchBox;
