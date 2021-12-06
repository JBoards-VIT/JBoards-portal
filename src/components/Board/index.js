import "./style.scss";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Card from "../Card/index";
import Editable from "../Editable/index";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import BoardInfo from "../BoardInfo";
import { useDispatch } from "react-redux";
import axios from "../../axios";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { removeBoard, addCard } from "../../redux/actions/Board";
export default function Board(props) {
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
    const displayStyle = {
        backgroundColor: "#fff",
        borderRadius: "5px",
        width: "100%",
        boxShadow: "1px 2px 0px 1px rgba(0, 0, 0, 0.15)",
    }
    const RemoveBoard = (boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            boardId: boardId,
            kanbanId: props?.kanbanId
        }
        axios.post("/kanban/board/delete", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(removeBoard(boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const AddCard = (title, boardId) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            title,
            boardId: boardId,
            kanbanId: props?.kanbanId
        }
        axios.post("/kanban/card/create", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(addCard(response.data.result, boardId))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <Draggable key={props?.board?._id} draggableId={props?.board?._id} index={props.boardIndex}>
            {(provided) => (
                <div className="board" {...provided.draggableProps} ref={provided.innerRef}>
                    <div className="board_top" {...provided.dragHandleProps}>
                        <p className="board_text board_top_title">
                            {props?.board?.title}&nbsp;
                            <span className="board_top_count">{props?.board?.cards.length}</span>
                        </p>
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
                                <MenuItem onClick={handleModalOpen}>
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>
                                    Edit Board
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => {
                                    let flag = window.confirm("Do you want to remove this board ?")
                                    if (flag) {
                                        RemoveBoard(props?.board?._id)
                                    }
                                }}>
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    Delete Board
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    {props?.board?.cards ?
                        <Droppable droppableId={String(props?.board?._id)} type="card">
                            {
                                (provided, snapshot) => (
                                    <div className="board_cards custom-scroll" ref={provided.innerRef} {...provided.droppableProps} style={snapshot.isDraggingOver ? { backgroundColor: "#ccc" } : null}>
                                        {props?.board?.cards?.map((card, index) => (
                                            <Card
                                                key={card?._id}
                                                boardId={props?.board?._id}
                                                boardIndex={props.boardIndex}
                                                cardIndex={index}
                                                card={card}
                                                kanbanId={props?.kanbanId}
                                            />
                                        ))}
                                        {provided.placeholder}
                                        <Editable
                                            text="Add Card"
                                            label="Card Title"
                                            hasValue={false}
                                            displayStyle={displayStyle}
                                            onSubmit={(value) => AddCard(value, props?.board?._id)}
                                        />
                                    </div>
                                )
                            }
                        </Droppable> : <></>
                    }
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
                                <BoardInfo
                                    boardId={props?.board?._id}
                                    boardIndex={props.boardIndex}
                                    close={handleModalClose}
                                    kanbanId={props?.kanbanId}
                                    board={props?.board}
                                />
                            </Fade>
                        </Modal>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
