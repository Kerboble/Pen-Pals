import React, { useState } from 'react'
import Navbar from './Navbar'
import Search from "./Search"
import Chats from './Chats'

function Sidebar() {
  return (
    <div className='sidebar-container'>
      {/* <Navbar /> */}
    <div className="sidebar">
      <Search />
      <Chats />
    </div>
    </div>
  )
}

export default Sidebar


function NewSidebar() {
  return (
    <div>
    {/* <Navbar /> */}
    <div className="sidebar">
      <Chats />   {/* This will refer to both individual messages and group messages */}
    </div>
    </div>
  )
}



