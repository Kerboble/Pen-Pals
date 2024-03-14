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
        <button onClick={() => setActiveTab('personal')}>Messages</button>
        <button onClick={() => setActiveTab('group')}>Groups</button>
        <button onClick={() => setActiveTab('notes')}>Notes</button>
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

  console.log(chats)
  
  if(chats === undefined) {
    return ( 
    <>
      <div>
          You currently have no messages. Create a new message by searching for a user above.  
      </div>   
    </> 
    )
  } else if (Object.entries(chats).length === 0) {
    return ( <>
            <div>
          You currently have no messages. Create a new message by searching for a user above.  
        </div>   
</> )
  } else {
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
}

function Groups() {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext);
  const { dispatch } =  useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
    const unsub = onSnapshot(doc(db, "userGroups", currentUser.uid), (doc) => {
      setChats(doc.data());
      console.log(doc.data())
    });

    return () => {
      unsub()
    };
  };
    currentUser.uid && getChats();
  },[currentUser.uid])

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_GROUP", payload: u})
  }

  console.log(chats);
  const test3 = Object.entries(chats)
  console.log(test3)

  if(chats != undefined) {
    console.log(Object.entries(chats))
    const test = Object.entries(chats)
    const test2 = test[1]
    console.log(test2)
  // Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (
  // console.log(Object.entries(chats)[1])))
  console.log(test.length)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  

  if(chats === undefined) {
    return ( 
    <>
      <div>
          You currently have no messages. Create a new message by searching for a user above.  
      </div>   
    </> 
    )
  } else if (Object.entries(chats).length === 0) {
    return(
      <>
        <button onClick={openModal}>New Group</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <GroupChatForm onClose={closeModal} />
        </Modal> 
        <div>
          You are currently in no group chats. Create a new group above.  
        </div>   
      </>

    )
  } else {
    return (
      <>
        <button onClick={openModal}>New Group</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <GroupChatForm onClose={closeModal} />
        </Modal>    
        <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (
      <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].groupInfo)}>
        <img src={chat[1].groupInfo.photoURL} alt="" className="userChat" />
        <div className="userChatInfo">
          <span>{chat[1].groupInfo.groupName}</span>
          <p>{chat[1].lastMessage?.text.slice(0, 20)}{chat[1].lastMessage?.text.length > 20 ? '...' : ''}</p>
        </div>
      </div>
      ))}

    </div>
    </>
  )

  }
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

  
  if(chats === undefined) {
    return ( 
    <>
      <div>
          You currently have no notes.  
      </div>   
    </> 
    )
  } else {
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
}


export default Chats