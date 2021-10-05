import React, { useEffect, useState } from 'react'
import Nav from "../../components/Nav"
import "./style.scss"
import ProjectCard from "../../components/ProjectCard"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import ScheduleCard from '../../components/ScheduleCard';
import TextField from '@mui/material/TextField';

const Home = () => {
    const [date, setDate] = useState(new Date());
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
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
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
                    <ScheduleCard />
                    <ScheduleCard />
                    <ScheduleCard />
                    <ScheduleCard />
                    <ScheduleCard />
                    <ScheduleCard />
                </div>
            </div>
        </div>
    )
}

export default Home;