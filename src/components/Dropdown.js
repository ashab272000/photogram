import React from 'react'
import './Dropdown.css'
function Dropdown(props) {

    return (
        <div className="dropdown">
            <div className="dropdown__pointer">
                
            </div>
            <div className="dropdown__pointer2">
                
            </div>
            <div className="dropdown__body">
                {props.children}
            </div>
        </div>
    )
}

export default Dropdown
