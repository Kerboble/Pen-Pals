import React from 'react'
import upload from "../assets/gallery.png"
import paperclip from "../assets/paper-clip.png"
function Input() {
  return (
    <div className="chat-input">
       <input type="text" placeholder='write a message'/>
       <div className="send">
            <img src={paperclip} alt="" />
            <input type="file" style={{display:"none"}} id="file" />
            <label htmlFor="file">
                <img src={upload} alt="" />
            </label>
            <button>send</button>
       </div>
    </div>
  )
}

export default Input