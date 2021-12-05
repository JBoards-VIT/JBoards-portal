import React from 'react'
import "./style.scss"

const ScheduleCard = ({ schedule }) => {
    return (
        <div className="scheduleCard">
            <div className="scheduleCard__time">
                <p>{schedule.deadline}</p>
            </div>
            <div className="scheduleCard__divider" style={{ backgroundColor: "#" }}></div>
            <div className="scheduleCard__details">
                <span>{schedule.project}</span>
                <p>{schedule.title}</p>
            </div>
        </div>
    )
}

export default ScheduleCard
