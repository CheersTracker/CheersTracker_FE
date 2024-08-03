import React from 'react'
import { LuPencil } from "react-icons/lu";
import { Link } from 'react-router-dom';

const WriteBtn = () => {
  return (
    <Link to={'/post'}>
      <div className='write_btn'>
        <LuPencil className='write_pen' />
      </div>
    </Link>
  )
}

export default WriteBtn