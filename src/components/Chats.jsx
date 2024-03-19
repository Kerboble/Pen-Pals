import React, {useContext, useEffect, useState} from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Modal, GroupChatForm } from './groupChatForm'


function Chats() {
  const [activeTab, setActiveTab] = useState('personal');
  return(
    <div>
      <div>
        <button class='messages-button' onClick={() => setActiveTab('personal')}>Messages</button>
        <button class='group-button' onClick={() => setActiveTab('group')}>Groups</button>
        <button class='notes-button' onClick={() => setActiveTab('notes')}>Notes</button>
      </div>
      <div>
        {activeTab === 'personal' && <Messages />}
        {activeTab === 'group' && <Groups />}
        {activeTab === 'notes' && <Notes />}
      </div>
    </div>
  )
}

function Messages() {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext);
  const { dispatch } =  useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });

    return () => {
      unsub()
    };
  };
    currentUser.uid && getChats();
  },[currentUser.uid])

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }

  console.log(Object.entries(chats))
  
  
  return (
    <div className="chats">
    {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).filter(chat => chat[1].userInfo.displayName !== currentUser.displayName).map(chat => (
    <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
      <img src={chat[1].userInfo.photoURL} alt="" className="userChat" />
      <div className="userChatInfo">
        <span>{chat[1].userInfo.displayName}</span>
        <p>{chat[1].lastMessage?.text.slice(0, 20)}{chat[1].lastMessage?.text.length > 20 ? '...' : ''}</p>
      </div>
    </div>
  ))}
</div>
  )
}

function Groups() {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext);
  const { dispatch } =  useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());

    });

    return () => {
      unsub()
    };
  };
    currentUser.uid && getChats();
  },[currentUser.uid])

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }

  console.log(Object.entries(chats))
Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (
console.log(chat[1].userInfo)))

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <>
      <button class='newgroup-button' onClick={openModal}>New Group</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <GroupChatForm onClose={closeModal} />
      </Modal>    
      <div className="chats">
    {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (
    <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
      <img src={chat[1].userInfo.photoURL} alt="" className="userChat" />
      <div className="userChatInfo">
        <span>{chat[1].userInfo.displayName}</span>
        <p>{chat[1].lastMessage?.text.slice(0, 20)}{chat[1].lastMessage?.text.length > 20 ? '...' : ''}</p>
      </div>
    </div>
    ))}
    </div>
    </>
  )
}

function Notes() {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext);
  const { dispatch } =  useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });

    return () => {
      unsub()
    };
  };
    currentUser.uid && getChats();
  },[currentUser.uid])

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }

  console.log(Object.entries(chats))
  
  
  return (
    <div className="chats">
  {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).filter(chat => chat[1].userInfo.displayName === currentUser.displayName).map(chat => (
    <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
      <img src={chat[1].userInfo.photoURL} alt="" className="userChat" />
      <div className="userChatInfo">
        <span>{chat[1].userInfo.displayName}</span>
        <p>{chat[1].lastMessage?.text.slice(0, 20)}{chat[1].lastMessage?.text.length > 20 ? '...' : ''}</p>
      </div>
    </div>
  ))}
</div>
  )
}


export default Chats