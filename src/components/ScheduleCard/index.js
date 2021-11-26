import React from 'react'
import "./style.scss"

const ScheduleCard = ({ name, project_name, color, time }) => {
    return (
        <div className="scheduleCard">
            <div className="scheduleCard__time">
                <p>{time}</p>
            </div>
            <div className="scheduleCard__divider" style={{ backgroundColor: color }}></div>
            <div className="scheduleCard__details">
                <span>{project_name}</span>
                <p>{name}</p>
            </div>
        </div>
    )
}

export default ScheduleCard
