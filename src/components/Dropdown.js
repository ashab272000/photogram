import React from 'react'
import './Dropdown.css'
function Dropdown(props) {

    return (
        <div className="dropdown">
            <div className="dropdown__pointer">
                
            </div>
            {props.children}
        </div>
    )
}

export default Dropdown
