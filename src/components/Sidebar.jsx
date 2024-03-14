import React, { useState } from 'react'
import Navbar from './Navbar'
import Search from "./Search"
import Chats from './Chats'

function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar


function NewSidebar() {
  return (
    <div className="sidebar">
      <Chats />   {/* This will refer to both individual messages and group messages */}
    </div>
  )
}



