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
        </div >
    )
}

const Project = () => {
    return (
        <div className="projects">
            <MobileProjectCard />
            <MobileProjectCard />
            <MobileProjectCard />
            <MobileProjectCard />
            <MobileProjectCard />
            <MobileProjectCard />
        </div>

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
            <ScheduleCard />
            <ScheduleCard />
        </div>
    )
}

export default MobileHome
