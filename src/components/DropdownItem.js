import React from 'react'
import './DropdownItem.css'
function DropdownItem({leftIcon, rightIcon, children, style ={} ,onMouseDown= ()=> {}}) {
    return (
        <div className='dropdownItem' style={style} onMouseDown={onMouseDown}>
            {leftIcon && <span className='dropdownItem__leftIcon'>{leftIcon}</span> }
            {children}
            <span className='dropdownItem__rightIcon'>{rightIcon}</span>
        </div>
    )
}

export default DropdownItem
