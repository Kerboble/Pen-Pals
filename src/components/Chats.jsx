import React from 'react'
import phil from "../assets/user(1).png"
function Chats() {
  return (
    <div className="chats">
       <div className="userChat">
        <img src={phil} alt="" className="userChat"/>
        <div className="userChatInfo">
          <span>Phil</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={phil} alt="" className="userChat"/>
        <div className="userChatInfo">
          <span>Phil</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={phil} alt="" className="userChat"/>
        <div className="userChatInfo">
          <span>Phil</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={phil} alt="" className="userChat"/>
        <div className="userChatInfo">
          <span>Phil</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats