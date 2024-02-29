import React from 'react'
import phil from "../assets/user(1).png"
import online from "../assets/full-stop.png"
import Messages from './Messages'
import Input from './Input'
function Chat() {
  return (
    <div className="chat">
        <div className="chatInfo">
        <img src={phil} alt="" className="userChat"/>
          <div className="userStatus">
            <span>Phil</span>
            <span className='onlineStatus'>Online <img className='online-icon' src={online}/></span>
          </div>
        </div>
        <hr />
      <Messages />
      <hr />
      <Input />
    </div>
  )
}

export default Chat