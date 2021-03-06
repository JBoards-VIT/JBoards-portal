import React from 'react'
import { Avatar } from '@mui/material'
import "./style.scss"

const MobileProjectCard = ({ project }) => {
    return (
        <div className="mobileProjectCard">
            <div className="mobileProjectCard__avatar">
                <Avatar sx={{ width: 40, height: 40, bgcolor: "#142d4c", border: 0 }}>{project.name[0]}</Avatar>
            </div>
            <div className="mobileProjectCard__details">
                <p>{project.name}</p>
                <span>{project.members.length} people</span>
            </div>
        </div>
    )
}

export default MobileProjectCard
