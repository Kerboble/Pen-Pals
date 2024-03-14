import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Attach from "../assets/paper-clip.png"

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const messageData = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        null,
        (err) => console.error(err),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          messageData.img = downloadURL;
          await sendMessage(messageData);
        }
      );
    } else {
      await sendMessage(messageData)
    }
  };

  const sendMessage = async (messageData) => {
    const chatCollection = data.isGroupChat ? 'groupChats' : 'chats';
    await updateDoc(doc(db, chatCollection, data.chatId), {
      messages: arrayUnion(messageData),
    });

    if(!data.isGroupChat) {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"] : { text },
        [data.chatId+".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"] : { text },
        [data.chatId+".date"]: serverTimestamp(),
      });
    } else {
      const users = data.groupInfo.users;

      console.log(users);
      users.forEach((user) => 
      updateDoc(doc(db, "userGroups", user), {
        [data.chatId + ".lastMessage"] : { text },
        [data.chatId+".date"]: serverTimestamp(),
      })
      );
    }

    setText('');
    setImg(null);
  }

  const  handleFile = (e) => {
    console.log(e.target.files)
    const img = e.target.files[0]
    setImg(img)
  }

  const deleteSendingPhoto = () =>{
    setImg(null)
  }

  return (
    <div className="chat-input">
      {img ? 
      <div className="sending-photo-container">
        <img src={URL.createObjectURL(img)} alt="" className="sending-image" /> 
        <button onClick={deleteSendingPhoto} className="delete-sending-photo">x</button>
      </div>
      
      : 
      null}
    <input
      type="text"
      placeholder="type a message...."
      onChange={(e) => setText(e.target.value)}
      value={text}
    />
    <div className="send">
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        onChange={handleFile}
        placeholder="hello"
      />
      <label htmlFor="file">
        <img src={Attach} alt=""/>
      </label>
      <button onClick={handleSend}>Send</button>
    </div>
  </div>
  )
}

export default Input