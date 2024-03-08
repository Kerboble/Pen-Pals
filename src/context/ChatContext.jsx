import { createContext, useReducer, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider  = ({ children }) => {
  const INITIAL_STATE = {
    chatId: "null",
    user:{}
  };

  const chatReducer = (state, action) => {
    const {currentUser} = useContext(AuthContext)
    
    switch(action.type){
        case "CHANGE_USER":
            return {
                user:action.payload,
                chatId: 
                currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
            };
    }
};

const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

 

  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};