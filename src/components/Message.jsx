import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { collection } from 'firebase/firestore'
import { db } from "../firebase";


function Message({message}) {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const date = new Date()
  
const ref = useRef();
console.log(message.date)

const msgSender = collection(db, message.senderId);
console.log(msgSender)
// const senderImg = 

useEffect(() => {
  ref.current?.scrollIntoView({behavior: "smooth"});
}, [message])


  if(!data.isGroupChat) {
    return (
      <div ref={ref}
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        <div className="messageInfo">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          <span>{message.date.toDate().toLocaleTimeString()}</span>
        </div>
        <div className="messageContent">
          {message.text !== "" ? <p>{message.text}</p> : null}
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
    )
  } else {

    return (
      <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={ msgSender.photoURL }
          alt=""
        />
        <span>{message.date.toDate().toLocaleTimeString()}</span>
      </div>
      <div className="messageContent">
        {message.text !== "" ? <p>{message.text}</p> : null}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
    )
  }
}

export default Message