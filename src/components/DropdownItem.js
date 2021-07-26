import React from 'react'
import './DropdownItem.css'
function DropdownItem({leftIcon, rightIcon, children}) {
    return (
        <div className='dropdownItem'>
            {leftIcon && <span className='dropdownItem__leftIcon'>{leftIcon}</span> }
            {children}
            <span className='dropdownItem__rightIcon'>{rightIcon}</span>
        </div>
    )
}

export default DropdownItem
