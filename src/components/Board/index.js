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
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
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
    const board = useSelector(state => state.boards[props.boardIndex]);
    const displayStyle = {
        backgroundColor: "#fff",
        borderRadius: "5px",
        width: "100%",
        boxShadow: "1px 2px 0px 1px rgba(0, 0, 0, 0.15)",
    }
    return (
        <Draggable key={board._id} draggableId={board._id} index={props.boardIndex}>
            {(provided) => (
                <div className="board" {...provided.draggableProps} ref={provided.innerRef}>
                    <div className="board_top" {...provided.dragHandleProps}>
                        <p className="board_text board_top_title">
                            {board?.title}&nbsp;
                            <span className="board_top_count">{board?.cards.length}</span>
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
                                        dispatch(removeBoard(board?.id))
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
                    <Droppable droppableId={String(board?._id)} type="card">
                        {
                            (provided, snapshot) => (
                                <div className="board_cards custom-scroll" ref={provided.innerRef} {...provided.droppableProps} style={snapshot.isDraggingOver ? { backgroundColor: "#ccc" } : null}>
                                    {board?.cards.map((card, index) => (
                                        <Card
                                            key={card._id}
                                            boardId={board?._id}
                                            boardIndex={props.boardIndex}
                                            cardIndex={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                    <Editable
                                        text="Add Card"
                                        label="Card Title"
                                        hasValue={false}
                                        displayStyle={displayStyle}
                                        onSubmit={(value) => dispatch(addCard(value, board?.id))}
                                    />
                                </div>
                            )
                        }
                    </Droppable>
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
                                    boardId={props.boardId}
                                    boardIndex={props.boardIndex}
                                    close={handleModalClose}
                                />
                            </Fade>
                        </Modal>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
