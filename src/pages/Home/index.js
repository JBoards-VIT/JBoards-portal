import React, { useEffect, useState } from 'react'
import Nav from "../../components/Nav"
import "./style.scss"
import ProjectCard from "../../components/ProjectCard"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import ScheduleCard from '../../components/ScheduleCard';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
const Home = () => {
    const [date, setDate] = useState(new Date());
    const projects = [
        {
            name: "DWS Project",
            colorCode: "#142d4c",
            members: 4,
        },
        {
            name: "IWP Project",
            colorCode: "#75cfb8",
            members: 4,
        },
        {
            name: "ISAA Project",
            colorCode: "#385170",
            members: 2,
        },
        {
            name: "IIP Project",
            colorCode: "#9fa2a6",
            members: 10,
        },
        {
            name: "AI Project",
            colorCode: "#403c49",
            members: 6,
        },
        {
            name: "PDC Project",
            colorCode: "#9fa2a6",
            members: 4,
        },
    ]
    const schedules = [
        {
            project_name: "DWS Project",
            name: "Meeting Backend Team",
            time: "09:00 AM",
            color: "#75cfb8"
        },
        {
            project_name: "DWS Project",
            name: "Meeting Backend Team",
            time: "09:00 AM",
            color: "#75cfb8"
        },
        {
            project_name: "DWS Project",
            name: "Meeting Backend Team",
            time: "09:00 AM",
            color: "#75cfb8"
        },
        {
            project_name: "DWS Project",
            name: "Meeting Backend Team",
            time: "09:00 AM",
            color: "#75cfb8"
        },
    ]
    useEffect(() => {
        document.title = "Home";
    }, [])
    return (
        <div className="home">
            <Nav />
            <div className="home__body">
                <div className="projects">
                    <div className="projects__head">
                        <h1>Project Teams</h1>
                    </div>
                    <div className="projects__content">
                        <Link to={`/project/addproject`}>
                            <AddProject />
                        </Link>
                        {projects.map((project) => (
                            <Link to={`/project/${project.name}`}>
                                <ProjectCard
                                    key={project.name}
                                    name={project.name}
                                    color={project.colorCode}
                                    members={project.members}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="schedule">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CalendarPicker
                            openTo="day"
                            date={date}
                            onChange={(newDate) => {
                                setDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <h1>Schedule</h1>
                    <span>{date.getDate()} {date.toLocaleString('default', { month: 'long' })}</span>
                    {
                        schedules.map((schedule, index) => (
                            <ScheduleCard
                                key={index}
                                name={schedule.name}
                                project_name={schedule.project_name}
                                color={schedule.color}
                                time={schedule.time}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const AddProject = () => (
    <div className="projectCard">
        <div className="addProject">
            <AddIcon fontSize="large" />
            <span>Add Project</span>
        </div>
    </div>
)

export default Home;