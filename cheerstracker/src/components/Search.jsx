import React from 'react'
import { GoSearch } from "react-icons/go";


const Search = ({ setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='search_container'>
      <GoSearch className='search_icon' />
      <input
        type="text"
        className='search_input'
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Search