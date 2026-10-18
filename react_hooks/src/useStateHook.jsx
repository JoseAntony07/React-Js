import React from 'react'
import { useState } from "react";


const SearchBox = () => { // search text
  const [search, setSearch] = useState("");

  return (
    <input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Search products"
    />
  );
}

export default SearchBox

// Typing updates the state, and React displays the current value.

