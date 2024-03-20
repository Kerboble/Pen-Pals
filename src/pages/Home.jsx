import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="home">
      {/* <Navbar className="navbar" /> */}
      <div className="home-container">
        <Navbar className="navbar" />
        <div className='content-container'>
        <Sidebar />
        <Chat />
        </div>
      </div>
    </div>
  )
}

export default Home