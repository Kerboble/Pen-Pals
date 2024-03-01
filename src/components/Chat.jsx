import React, { useContext } from 'react'
import online from "../assets/full-stop.png"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
        <div className="chatInfo">
        <img src={data.user.photoURL} alt="" className="userChat"/>
          <div className="userStatus">
            <span>{data.user?.displayName}</span>
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