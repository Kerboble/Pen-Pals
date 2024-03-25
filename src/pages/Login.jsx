import React, { useState } from 'react';
import loginPhoto from "../assets/login-photo.png";
import pen from "../assets/pen.png";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { CircleLoader } from "react-spinners";  //Don't forget to have them run npm i react spinners or whatever the command was

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setLoading(true);  // Set loading to true when starting login process
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1 second delay after login; you can adjust as needed.
    }
   };
   

  return (
    <div className="form-container">
      <img src={loginPhoto} className='login-photo' />
      <div className="form-wrapper">
        <span className="logo"><img src={pen} className='pen-logo' />PenPals</span>
        <span className="title">Login</span>
        <form action="" onSubmit={handleSubmit}>
          <input className="input-form " type="email" placeholder="email" />
          <input className="input-form " type="password" placeholder="password" />
          <button className="signup-button" type="submit">
            {loading ? <CircleLoader color={"#262b15"} loading={loading} /> : "Login"}
          </button>
          {err && <span>error</span>}
        </form>
        <p className="have-account">Don't have an account? <Link className="link-style" to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
