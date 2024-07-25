import React from 'react'
import { GoSearch } from "react-icons/go";


const Search = () => {
  return (
    <div className='search_container'>
        <GoSearch className='search_icon' />
        <input type="text" className='search_input' />
    </div>
  )
}

export default Search