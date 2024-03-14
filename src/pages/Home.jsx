import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
function Home() {
  return (
    <div className="home">
      <div className="home-container">
        {/* <Navbar /> */}
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home