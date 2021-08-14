import React from 'react'
import './DropdownItem.css'
function DropdownItem({leftIcon, rightIcon, children, onClick= ()=> {}}) {
    return (
        <div className='dropdownItem' onClick={onClick}>
            {leftIcon && <span className='dropdownItem__leftIcon'>{leftIcon}</span> }
            {children}
            <span className='dropdownItem__rightIcon'>{rightIcon}</span>
        </div>
    )
}

export default DropdownItem
