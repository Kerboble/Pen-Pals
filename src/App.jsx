import Register from "./pages/Register";
import React, { useContext } from "react";
import "./styles.scss"
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext";
import Errorpage from "./pages/Errorpage";

function App() {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)
  

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="*" element={<Errorpage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;