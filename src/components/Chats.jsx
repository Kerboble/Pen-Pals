import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Modal, GroupChatForm } from './groupChatForm';


function Chats() {
  const [activeTab, setActiveTab] = useState('personal');
  
  return (
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
  );
}

function Messages() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

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
  );
}

function Groups() {
  const [chats, setChats] = useState([]); // Initialize with an empty array
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userGroups", currentUser.uid), (doc) => {
        console.log("Fetched chats:", doc.data());
        setChats(doc.data() || []); // Set to an empty array if doc.data() is undefined
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  console.log("Chats state:", chats); // Log the state of chats

  // Filter out null values for date before sorting
  const sortedChats = Object.entries(chats)?.filter(([key, value]) => value.date !== null)?.sort((a, b) => b[1].date - a[1].date) || [];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>New Group</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <GroupChatForm onClose={closeModal} />
      </Modal>
      <div className="chats">
      {sortedChats.map(chat => (
  <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
    <img src={chat[1].userInfo?.photoURL} alt="" className="userChat" />
    <div className="userChatInfo">
      <span>{chat[1].userInfo?.displayName}</span>
      <p>{chat[1].lastMessage?.text.slice(0, 20)}{chat[1].lastMessage?.text.length > 20 ? '...' : ''}</p>
    </div>
  </div>
))}

      </div>
    </>
  );
}





function Notes() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

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
  );
}

export default Chats;
