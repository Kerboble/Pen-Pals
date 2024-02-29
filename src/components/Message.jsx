import React from 'react'
import phil from "../assets/user(1).png"
import burningmac from "../assets/burning-laptop.webp"
function Message() {
  return (
    <div className="message owner">
        <div className="messageInfo">
            <img src={phil} alt="" />
            <span>Just Now</span>
        </div>
        <div className="messageContent">
            <p>Mac sucks</p>
            <img src={burningmac} alt="" className='chatImage'/>
        </div>
    </div>
  )
}

export default Message