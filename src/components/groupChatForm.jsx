import React, { useContext, useEffect, useState } from 'react';
import { 
    addDoc, 
    collection, 
    doc,
    getDocs, 
    getDoc, 
    serverTimestamp, 
    setDoc, 
    updateDoc
} from 'firebase/firestore';
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="close-button">X</button>
        {children}
      </div>
    </div>
  );
};



export const GroupChatForm = ({ onClose }) => {
  const [chatName, setChatName] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [addedUserObjects, setAddedUserObjects] = useState([]);

  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => doc.data());
        console.log(usersData);
        setAllUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chatName === '') {
      alert('Please enter a chat name.');
      return;
    }

    console.log(addedUsers)
    const groupChatId = [currentUser.uid, ...addedUserObjects.map((u) => u.uid)].sort().join('_');
    console.log(groupChatId)

    const allChatUsers = [currentUser];
    allChatUsers.push(addedUserObjects);
    console.log(allChatUsers)

    

    try {
        const res = await getDoc(doc(db, 'chats', groupChatId));
        console.log(res.data)
        if (!res.exists()) {
            await setDoc(doc(db, 'chats', groupChatId), {messages: []});

            const updates = addedUserObjects.forEach(user => {
                const userGroupRef = doc(db, 'userGroups', user.uid);
                return setDoc(userGroupRef,  {
                    [`${groupChatId}.groupInfo`]: {
                        members: addedUserObjects.map((u) => ({ uid: u.uid, displayName: u.displayName, photoURL: u.photoURL})),
                    },
                    [`${groupChatId}.date`]: serverTimestamp(),
                });
            });
            console.log(updates)

            await Promise.all(updates);
            }
        } catch (error) {
      console.error("Error creating group chat: ", error);
    }
  };
  const addUserToChat = (user) => {
    if (!addedUsers.includes(user)) {
        setAddedUsers([...addedUsers, user]);
    }
    console.log(addedUsers)
  };

  const addUserObjectToChat = (user) => {
    const isUserAdded = addedUserObjects.some(addedUser => addedUser.uid === user.uid);

    if (!isUserAdded) {
        setAddedUserObjects([...addedUserObjects, user]);
    }
  }

  const removeUserObjectFromChat = user => {
    setAddedUserObjects(addedUserObjects.filter(u => u !== user))
  }

  const removeUserFromChat = (user) => {
    setAddedUsers(addedUsers.filter(u => u !== user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Chat Name:
        <input
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
      </label>

      <div className='user-selection'>
        <div className="all-users">
            <h4>All Users</h4>
            {allUsers.map(user => (
                <div key={user.uid} 
                onClick={() => {addUserToChat(user.displayName);
                addUserObjectToChat(user)}
                }>{user.displayName}</div>
            ))}
        </div>

        <div className="addedUsers">
            <h4>Added Users</h4>
            {addedUsers.map(user =>
                <div key={user} onClick={() => {removeUserFromChat(user);
                removeUserObjectFromChat(user)}
                }>{user}</div>)}
        </div>
      </div>
      <button type="submit">Create Group</button>
    </form>
  );
};
