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
import upload from "../assets/gallery.png"

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
  const [groupPhotoURL, setGroupPhotoURL] = useState([]);
  const[fileName, setFileName] = useState(null)
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
    console.log(allChatUsers);

    

    try {
        const res = await getDoc(doc(db, 'groupChats', groupChatId));
        console.log(res.data)
        if (!res.exists()) {
          // create a chat in group chats collection
            await setDoc(doc(db, 'groupChats', groupChatId), {messages: []});

            console.log(addedUserObjects);
            const updates = addedUserObjects.map(user => {
              const userGroupRef = doc(db, 'userGroups', user.uid);
              return setDoc(userGroupRef,  {
                  [`${groupChatId}.groupInfo`]: {
                      groupId: groupChatId,
                      groupName: chatName,
                      photoURL: groupPhotoURL
                  },
                  [`${groupChatId}.date`]: serverTimestamp(),
              });
          });
          
          await Promise.all(updates);
          
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

  const  displayFileName = (e) => {
    const name = e.target.files[0].name
    const photoURL = e.target.files[0]
    setFileName(name)
    setGroupPhotoURL(photoURL)
  }

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

      <input className="input-form" style={{display:"none"}} type="file" id="file" onChange={displayFileName}/>
      <label htmlFor="file">
        <img src={upload} alt="upload-icon" className="avatar-upload-icon"/><span className="add-picture">{fileName ? fileName : "select a user photo"}</span>
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
