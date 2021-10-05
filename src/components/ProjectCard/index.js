import { Avatar } from '@mui/material'
import React from 'react'
import "./style.scss"
import AvatarGroup from '@mui/material/AvatarGroup';

const ProjectCard = () => {
    return (
        <div className="projectCard">
            <div className="projectCard__details">
                <Avatar sx={{ width: 40, height: 40, bgcolor: "#142d4c", border: 0 }}>D</Avatar>
                <h1>DWS Project</h1>
            </div>
            <div className="projectCard__members">
                <div>
                    <AvatarGroup
                        sx={{
                            "& .MuiAvatar-root.MuiAvatarGroup-avatar": {
                                width: 30,
                                height: 30,
                                fontSize: 16,
                                border: 1,
                            }
                        }}
                        max={3}
                    >
                        <Avatar alt="Remy Sharp" />
                        <Avatar alt="Travis Howard" />
                        <Avatar alt="Travis Howard" />
                        <Avatar alt="Travis Howard" />
                    </AvatarGroup>
                </div>
                <span>3 people</span>
            </div>
        </div>
    )
}

export default ProjectCard
