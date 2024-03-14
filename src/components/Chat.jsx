import React, { useContext } from 'react'
import online from "../assets/full-stop.png"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

function Chat() {
  const { data } = useContext(ChatContext);
  const chatTitle = data.isGroupChat ? data.groupInfo.groupName : data.user.displayName;
  const chatImage = data.isGroupChat ? data.groupInfo.photoURL : data.user.photoURL;

  return (
    <div className="chat">
        <div className="chatInfo">
        <img src={chatImage} alt="" className="userChat"/>
          <div className="userStatus">
            <span>{chatTitle}</span>
            {!data.isGroupChat && (
              <span className='onlineStatus'>Online <img className='online-icon' src={online}/></span>
            )}
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