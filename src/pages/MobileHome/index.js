import React, { useEffect, useState } from 'react'
import "./style.scss"
import Nav from "../../components/Nav"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider } from '@emotion/react';
import ButtonTheme from '../../themes/ButtonTheme';
import MobileProjectCard from '../../components/MobileProjectCard';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextFieldTheme from '../../themes/TextFieldTheme';
import ScheduleCard from '../../components/ScheduleCard';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
const MobileHome = () => {
    useEffect(() => {
        document.title = "Home"
    }, [])
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="mobileHome">
            <Nav />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <ThemeProvider theme={ButtonTheme}>
                            <TabList indicatorColor="primary" sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "primary.main"
                                }
                            }}
                                variant="fullWidth"
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Projects" value="1" />
                                <Tab label="Schedule" value="2" />
                            </TabList>
                        </ThemeProvider>
                    </Box>
                    <TabPanel value="1">{<Project />}</TabPanel>
                    <TabPanel value="2">{<Schedule />}</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

const Project = () => {
    return (
        <div className="projects">
            <div className="projects_list">
                {projects.map((project) => (
                    <Link key={project.name} to={`/project/${project.name}`}>
                        <MobileProjectCard
                            name={project.name}
                            color={project.colorCode}
                            members={project.members}
                        />
                    </Link>
                ))
                }
            </div>
            <ThemeProvider theme={ButtonTheme}>
                <Fab
                    sx={{
                        position: "absolute",
                        right: 25,
                        bottom: 25,
                    }}
                    color="primary"
                    aria-label="add"
                    LinkComponent={Link}
                    to="/project/addproject"
                >
                    <AddIcon />
                </Fab>
            </ThemeProvider>
        </div >

    )
}

const Schedule = () => {
    const [date, setDate] = useState(new Date())
    return (
        <div className="mobileSchedule">
            <ThemeProvider theme={TextFieldTheme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                        label="Date"
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                helperText="mm/dd/yyyy"
                                sx={{
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#75cfb8"
                                    }
                                }}
                            />
                        }
                    />
                </LocalizationProvider>
            </ThemeProvider>
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
    )
}

export default MobileHome
