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
import axios from "../../axios"
import { format } from 'date-fns';
const Home = () => {
    const [date, setDate] = useState(new Date());
    const [projects, setProjects] = useState(null)
    const [schedules, setSchedules] = useState(null)
    useEffect(() => {
        document.title = "Home";
    }, [])
    useEffect(() => {
        const getProjects = () => {
            axios.get("/users/projects", {
                headers: {
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }).then((response) => {
                if (response.data.status === "success") {
                    setProjects(response.data.result.projects)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        getProjects()
    }, [])
    useEffect(() => {
        const getDeadlines = () => {
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }
            const data = {
                deadline: format(date, "yyyy-MM-dd")
            }
            axios.post("/users/get-deadlines", data, config).then((response) => {
                if (response.data.status === "success") {
                    setSchedules(response.data.result.deadlines)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        getDeadlines()
    }, [date])
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
                        {projects?.map((project) => (
                            <Link key={project._id} to={`/project/${project._id}`}>
                                <ProjectCard
                                    project={project}
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
                    <span>{format(date, "do MMMM")}</span>
                    {
                        schedules?.length > 0 ? schedules?.map((schedule, index) => (
                            <ScheduleCard
                                key={index}
                                schedule={schedule}
                            />
                        )) : (<p className="schedule_text">No Deadlines</p>)
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