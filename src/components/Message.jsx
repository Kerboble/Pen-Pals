import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../firebase";


function Message({message}) {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const date = new Date()
  const [msgSender, setMsgSender] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => doc.data());
        console.log(usersData);
        const sender = usersData.filter(user => user.uid === message.senderId)
        console.log(sender[0].uid)
        setMsgSender(sender[0]);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);



  
const ref = useRef();
console.log(message.date)

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