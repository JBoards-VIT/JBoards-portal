import "./style.scss";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CardInfo from "../CardInfo";
import { ThemeProvider } from "@emotion/react";
import ChipTheme from "../../themes/ChipTheme";
import { useDispatch } from "react-redux";
import { removeCard } from "../../redux/actions/Board";
import { format } from 'date-fns'
import axios from "../../axios";

export default function Card(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [showModal, setShowModal] = useState(false);
    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);
    const dispatch = useDispatch();
    const RemoveCard = (cardId, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            cardId,
            boardId,
            kanbanId: props?.kanbanId
        }
        axios.post("/kanban/card/delete", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(removeCard(cardId, boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <Draggable key={props?.card?._id} draggableId={String(props?.card?._id)} index={props.cardIndex}>
            {(provided) => (
                <div className="Card"  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="card_top">
                        <ThemeProvider theme={ChipTheme}>
                            <div className="card_top_labels">
                                {props?.card?.labels?.map((label) => (
                                    <Chip key={label?._id} label={label?.title} color={label?.color} />
                                ))}
                            </div>
                        </ThemeProvider>
                        <div>
                            <IconButton onClick={handleClick}>
                                <MoreHorizIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem onClick={() => handleModalOpen()}>
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>
                                    Edit Card
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => {
                                    let flag = window.confirm("Do you want to remove this card ?")
                                    if (flag) {
                                        RemoveCard(props?.card?._id, props?.boardId)
                                    }
                                }}>
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    Delete Card
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className="card_title">{props?.card?.title}</div>
                    {props?.card?.deadlineDate || props?.card?.tasks?.length !== 0 ? (<div className="card_footer">
                        {props?.card?.deadlineDate && (
                            <p>
                                <AccessTimeIcon />
                                {format(new Date(props?.card?.deadlineDate), "do MMM")}
                            </p>
                        )}
                        {props?.card?.tasks?.length !== 0 && (
                            <p>
                                <CheckBoxIcon />
                                {props?.card?.tasks?.filter((task) => task.completed === true).length}/{props?.card?.tasks?.length}
                            </p>
                        )
                        }
                    </div>) : null}
                    <div>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={showModal}
                            onClose={() => handleModalClose()}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={showModal}>
                                <CardInfo
                                    boardId={props?.boardId}
                                    boardIndex={props?.boardIndex}
                                    cardIndex={props?.cardIndex}
                                    close={handleModalClose}
                                    card={props?.card}
                                />
                            </Fade>
                        </Modal>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
