import React, {useContext, useEffect, useState} from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Modal, GroupChatForm } from './groupChatForm'
import EmailVerification from './UpdateEmail'
import Settings from './Settings'
import group from '../assets/groups.svg'
import notes from '../assets/notesIcon.svg'
import settingsIcon from '../assets/settingsIcon.svg'
import messageIcon from '../assets/messageIcon.svg'
import SettingsModal from './SettingsModal'


function Chats() {
  const [activeTab, setActiveTab] = useState('settings');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  return(
    <div className='sidebar'>
      <div className='navbar-icons'>
        <button className='navIcon' onClick={() => setActiveTab('personal')}>
          <img className='navIcon' src={messageIcon}></img>
        </button>
        <button className='navIcon' onClick={() => setActiveTab('group')}>
          <img className='navIcon' src={group}></img>
        </button>
        <button className='navIcon' onClick={() => setActiveTab('notes')}>
          <img className='navIcon' src={notes}></img>
        </button>
        <button className='navIcon' onClick={openSettingsModal}>
          <img className='navIcon' src={settingsIcon}></img>
        </button>
      </div>
      <div>
        {activeTab === 'personal' && <Messages />}
        {activeTab === 'group' && <Groups />}
        {activeTab === 'notes' && <Notes />}
      </div>
      {isSettingsModalOpen && <SettingsModal onClose={closeSettingsModal} />}
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
      <button onClick={openModal}>New Group</button>
      <Modal className="groupModal"isOpen={isModalOpen} onClose={closeModal}>
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
function UserSettings() {
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
    <div>
      <Settings />
    </div>
  )
}


export default Chats