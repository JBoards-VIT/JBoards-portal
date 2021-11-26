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
import { useDispatch, useSelector } from "react-redux";
import { changeCardTitle, changeCardDesc, changeCardDate, addCardLabel, deleteCardLabel, addCardTask, deleteCardTask, toggleCardTask } from "../../redux/actions/Board";

const CardInfo = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.boards[props.boardIndex].cards[props.cardIndex])
    const [labelColor, setLabelColor] = useState("primary");
    const [progress, setProgress] = React.useState((card?.tasks.filter((task) => task.checked === true).length / card?.tasks.length) * 100);
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
    const handleToggle = (event, index) => {
        dispatch(toggleCardTask(event.target.checked, index, card?.id, props.boardId))
        changeProgress();
    };
    const changeProgress = () => {
        let newChecked = card?.tasks.filter((task) => task.checked === true).length;
        setProgress((newChecked / card?.tasks.length) * 100);
    }
    const deleteTask = (index) => {
        dispatch(deleteCardTask(index, card?.id, props.boardId))
        changeProgress()
    }
    const addTask = (title) => {
        let newTask = {
            title,
            checked: false,
        }
        dispatch(addCardTask(newTask, card?.id, props.boardId))
        changeProgress()
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
                            hasValue={card?.title ? true : false}
                            text={card?.title || "Add Title"}
                            label="Title"
                            editStyle={editableStyle}
                            onSubmit={(value) => dispatch(changeCardTitle(value, card?.id, props.boardId))}
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
                            hasValue={card?.desc ? true : false}
                            text={card?.desc || "Add Description"}
                            label="Description"
                            editStyle={editableStyle}
                            onSubmit={(value) => dispatch(changeCardDesc(value, card?.id, props.boardId))}
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
                                value={card?.date || new Date()}
                                onChange={(newDate) => {
                                    dispatch(changeCardDate(newDate, card?.id, props.boardId));
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
                            {card?.labels && card?.labels.map((label, index) => (
                                <Chip
                                    key={index}
                                    label={label.text}
                                    color={label.color}
                                    onDelete={() => dispatch(deleteCardLabel(index, card?.id, props.boardId))}
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
                            onSubmit={(value) => dispatch(addCardLabel(
                                {
                                    text: value,
                                    color: labelColor
                                },
                                card?.id,
                                props.boardId
                            ))}
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
                    {card?.tasks && <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {card?.tasks.map((task, index) => {
                            const labelId = `checkbox-list-label-${index}`;

                            return (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={(event) => handleToggle(event, index)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={task.checked}
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
                            onSubmit={(value) => addTask(value)}
                        />
                    </div>
                </div>
            </div>
        </Box>
    )
})

export default CardInfo
