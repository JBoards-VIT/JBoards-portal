import React from 'react'
import { Avatar } from '@mui/material'
import "./style.scss"

const MobileProjectCard = () => {
    return (
        <div className="mobileProjectCard">
            <div className="mobileProjectCard__avatar">
                <Avatar sx={{ width: 40, height: 40, bgcolor: "#142d4c", border: 0 }}>D</Avatar>
            </div>
            <div className="mobileProjectCard__details">
                <p>DWS Project</p>
                <span>3 people</span>
            </div>
        </div>
    )
}

export default MobileProjectCard
