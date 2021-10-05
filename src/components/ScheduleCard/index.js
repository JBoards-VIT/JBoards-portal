import React from 'react'
import "./style.scss"

const ScheduleCard = () => {
    return (
        <div className="scheduleCard">
            <div className="scheduleCard__time">
                <p>09:00 AM</p>
            </div>
            <div className="scheduleCard__divider"></div>
            <div className="scheduleCard__details">
                <span>DWS Project</span>
                <p>Meeting Backend Team</p>
            </div>
        </div>
    )
}

export default ScheduleCard
