import React, { useState } from 'react'
import "./style.scss"
import Box from '@mui/material/Box';
import Editable from "../Editable"
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LabelIcon from '@mui/icons-material/Label';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from "@emotion/react";
import ChipTheme from "../../themes/ChipTheme";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";
import { changeCardTitle, changeCardDesc, changeCardDate, addCardLabel, deleteCardLabel, addCardTask, deleteCardTask, toggleCardTask } from "../../redux/actions/Board";
import axios from "../../axios"
import { format } from "date-fns"

const CardInfo = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [labelColor, setLabelColor] = useState("primary");
    const [progress, setProgress] = React.useState((props?.card?.tasks.filter((task) => task.completed === true).length / props?.card?.tasks.length) * 100);
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: window.innerWidth <= 769 ? "90vw" : "30vw",
        bgcolor: 'background.paper',
        boxShadow: 24,
        maxHeight: "95vh",
        overflowY: "auto",
        p: window.innerWidth <= 769 ? 1 : 4,
    };
    const closeButtonStyle = {
        position: 'absolute',
        top: '5px',
        right: '5px',
    }
    const editableStyle = {
        width: "280px",
    }
    const changeProgress = (progress) => {
        setProgress(progress);
    }
    const handleToggle = (event, taskId, cardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            taskId,
            cardId
        }
        axios.post("/kanban/card/tasks/toggle", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(toggleCardTask(response.data.result.completed, taskId, taskId, props?.boardId))
                changeProgress(response.data.result.progress);
            }
        }).catch((error) => {
            console.log(error)
        })
    };
    const deleteTask = (taskId, cardId, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            taskId,
            cardId
        }
        axios.post("/kanban/card/tasks/delete", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(deleteCardTask(taskId, cardId, boardId))
                changeProgress(response.data.result.progress)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const addTask = (title, cardId, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            title,
            cardId
        }
        axios.post("/kanban/card/tasks/add", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(addCardTask(response.data.result.task, cardId, boardId))
                changeProgress(response.data.result.progress)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const ChangeCardTitle = (title, cardId, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            title,
            cardId
        }
        axios.post("/kanban/card/update/title", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(changeCardTitle(title, cardId, boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const ChangeCardDesc = (description, cardId, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            description,
            cardId
        }
        axios.post("/kanban/card/update/description", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(changeCardDesc(description, cardId, boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const ChangeCardDeadline = (deadline, cardId, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const dateString = format(deadline, "yyyy-MM-dd")
        const data = {
            deadline: dateString,
            cardId
        }
        axios.post("/kanban/card/update/deadline", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(changeCardDate(deadline, cardId, boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const AddCardLabel = (label, cardId, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            title: label.text,
            color: label.color,
            cardId
        }
        axios.post("/kanban/card/labels/add", data, config).then((response) => {
            if (response.data.status === "success") {
                console.log(response.data.result)
                dispatch(addCardLabel(response.data.result, cardId, boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const RemoveCardLabel = (labelId, cardId, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            labelId,
            cardId
        }
        axios.post("/kanban/card/labels/delete", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(deleteCardLabel(labelId, cardId, boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const colors = [
        {
            name: "success",
            color: "#75cfb8"
        },
        {
            name: "primary",
            color: "#142d4c"
        },
        {
            name: "secondary",
            color: "#385170"
        },
        {
            name: "warning",
            color: "#9fa2a6"
        },
        {
            name: "info",
            color: "#f1f8fa"
        },
    ]
    return (
        <Box {...props} ref={ref} sx={modalStyle}>
            <div className="cardInfo custom-scroll">
                {window.innerWidth <= 769 && (
                    <IconButton style={closeButtonStyle} onClick={props.close}>
                        <CloseIcon />
                    </IconButton>
                )}
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <TitleIcon />
                        Title
                    </div>
                    <div className="cardInfo_box_body">
                        <Editable
                            hasValue={props?.card?.title ? true : false}
                            text={props?.card?.title || "Add Title"}
                            label="Title"
                            editStyle={editableStyle}
                            onSubmit={(value) => ChangeCardTitle(value, props?.card?._id, props?.boardId)}
                        />
                    </div>
                </div>
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <FormatListBulletedIcon />
                        Description
                    </div>
                    <div className="cardInfo_box_body">
                        <Editable
                            hasValue={props?.card?.description ? true : false}
                            text={props?.card?.description || "Add Description"}
                            label="Description"
                            editStyle={editableStyle}
                            onSubmit={(value) => ChangeCardDesc(value, props?.card?._id, props?.boardId)}
                        />
                    </div>
                </div>
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <CalendarTodayIcon />
                        Deadline Date
                    </div>
                    <div className="cardInfo_box_body">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                value={props?.card?.deadlineDate ? new Date(props?.card?.deadlineDate) : new Date()}
                                onChange={(newDate) => {
                                    ChangeCardDeadline(newDate, props?.card?._id, props?.boardId);
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
                    </div>
                </div>
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <LabelIcon />
                        Labels
                    </div>
                    <ThemeProvider theme={ChipTheme}>
                        <div className="cardInfo_box_colors">
                            {props?.card?.labels && props?.card?.labels.map((label, index) => (
                                <Chip
                                    key={label._id}
                                    label={label.title}
                                    color={label.color}
                                    onDelete={() => RemoveCardLabel(label._id, props?.card?._id, props?.boardId)}
                                />
                            ))}
                        </div>
                    </ThemeProvider>
                    <div className="cardInfo_box_colors">
                        {
                            colors.map((color) => (
                                <li
                                    onClick={() => setLabelColor(color.name)}
                                    key={color.name}
                                    style={{ backgroundColor: color.color }}
                                    className={color.name === labelColor ? "active" : ""}
                                />
                            ))
                        }
                    </div>
                    <div className="cardInfo_box_body">
                        <Editable
                            hasValue={false}
                            label="Label Title"
                            text="Add Label"
                            editStyle={editableStyle}
                            onSubmit={(value) => AddCardLabel(
                                {
                                    text: value,
                                    color: labelColor
                                },
                                props?.card?._id,
                                props?.boardId
                            )}
                        />
                    </div>
                </div>
                <div className="cardInfo_box">
                    <div className="cardInfo_box_title">
                        <TaskAltIcon />
                        Tasks
                    </div>
                    <div className="cardInfo_box_progress-bar">
                        <LinearProgress variant="determinate" value={progress} />
                    </div>
                    {props?.card?.tasks && <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {props?.card?.tasks?.map((task, index) => {
                            const labelId = `checkbox-list-label-${index}`;
                            return (
                                <ListItem
                                    key={task._id}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id, props?.card?._id, props?.boardId)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={(event) => handleToggle(event, task._id, props?.card?._id)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={task.completed}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={task.title} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    }
                    <div className="cardInfo_box_body">
                        <Editable
                            hasValue={false}
                            text="Add Task"
                            label="Task Title"
                            editStyle={editableStyle}
                            onSubmit={(value) => addTask(value, props?.card?._id, props?.boardId)}
                        />
                    </div>
                </div>
            </div>
        </Box>
    )
})

export default CardInfo
