import { Avatar } from '@mui/material'
import React from 'react'
import "./style.scss"
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';

const ProjectCard = ({ project }) => {
    return (
        <div className="projectCard">
            <div className="projectCard__details">
                <Avatar sx={{ width: 40, height: 40, bgcolor: "#75cfb8", border: 0 }}>{project.name[0]}</Avatar>
                <h1>{project.name}</h1>
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
                        {project.members.map((member) => (
                            <Tooltip key={member._id} title={member.name}>
                                <Avatar alt={member.name} />
                            </Tooltip>
                        ))}
                    </AvatarGroup>
                </div>
                <span>{project.members.length} people</span>
            </div>
        </div>
    )
}

export default ProjectCard
