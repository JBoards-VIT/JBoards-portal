import { Avatar } from '@mui/material'
import React from 'react'
import "./style.scss"
import AvatarGroup from '@mui/material/AvatarGroup';

const ProjectCard = ({ name, color, members }) => {
    return (
        <div className="projectCard">
            <div className="projectCard__details">
                <Avatar sx={{ width: 40, height: 40, bgcolor: color, border: 0 }}>{name[0]}</Avatar>
                <h1>{name}</h1>
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
                        {Array.apply(0, Array(members)).map((x, i) => (
                            <Avatar key={String(i)} alt={String(i)} />
                        ))}
                    </AvatarGroup>
                </div>
                <span>{members} people</span>
            </div>
        </div>
    )
}

export default ProjectCard
