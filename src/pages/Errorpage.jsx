import React from 'react'
import logo from "../assets/pen.png"
import errorImage from "../assets/8-g3n8SYb16g9sN9K.png"

function Errorpage() {
  return (
    <div className="error-background">
        <div className='error-container'>
            <div className="error-picture">
                <img src={errorImage} alt="" />
            </div>    
            <div className="error-description">
                <span><img src={logo} alt="" />PenPals</span>
                <p>Oh wow, you managed to find yourself in the post apocalyptic world, lets take you back home.</p>
            </div>
        </div>
    </div>
  )
}

export default Errorpage