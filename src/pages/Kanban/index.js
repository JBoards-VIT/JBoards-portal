import React, { useState, useEffect } from 'react'
import Board from "../../components/Board";
import Editable from "../../components/Editable";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { addBoard, changeCardPosition, changeBoardPosition } from "../../redux/actions/Board";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from "../../axios";
import "./style.scss";
import { useParams } from 'react-router';
import { setKanban } from '../../redux/actions/Board';
const Kanban = () => {
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boards?.boards, shallowEqual)
    const [kanbanId, setkanbanId] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        const getKanban = () => {
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }
            axios.get(`/kanban/get-kanban/${id}`, config).then((response) => {
                if (response.data.status === "success") {
                    dispatch(setKanban(response.data.result))
                    setkanbanId(response.data.result.kanbanId)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        getKanban()
    }, [id, dispatch, boards])
    const AddBoard = (title) => {
        return (dispatch) => {
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem("authToken")
                }
            }
            const data = {
                name: title,
                kanbanId: kanbanId
            }
            axios.post("/kanban/board/create", data, config).then((response) => {
                if (response.data.status === "success") {
                    dispatch(addBoard(response.data.result))
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    const ChangeCardPosition = (source, destination) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            sourceBoardId: source.droppableId,
            targetBoardId: destination.droppableId,
            sourceCardIndex: source.index,
            targetCardIndex: destination.index,
            kanbanId: kanbanId
        }
        axios.post("/kanban/card/move", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(changeCardPosition(response.data.result))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const ChangeBoardPosition = (source, destination) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            sourceBoardIndex: source.index,
            targetBoardIndex: destination.index,
            kanbanId: kanbanId
        }
        axios.post("/kanban/board/move", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(changeBoardPosition(response.data.result))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleDragEnd = (result) => {
        const { destination, source, type } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        if (type === "card") ChangeCardPosition(source, destination);
        else if (type === "columns") ChangeBoardPosition(source, destination);
    }
    return (
        <div className="Kanban">
            <div className="Kanban__outer">
                <DragDropContext
                    onDragEnd={(result) => handleDragEnd(result)}
                >
                    {boards ? (<Droppable key={"boards"} droppableId="all-columns" direction="horizontal" type="columns">
                        {(provided) => (
                            <div className="Kanban__boards" {...provided.droppableProps} ref={provided.innerRef}>
                                {boards?.map((board, index) => (
                                    <Board
                                        key={board?._id}
                                        board={board}
                                        boardIndex={index}
                                        kanbanId={kanbanId}
                                    />
                                ))}
                                {provided.placeholder}
                                <div className="Kanban__boards__board">
                                    <Editable
                                        hasValue={false}
                                        text="Add Board"
                                        label="Board Title"
                                        onSubmit={(value) => dispatch(AddBoard(value))}
                                    />
                                </div>
                            </div>
                        )}
                    </Droppable>) : <></>}
                </DragDropContext>
            </div>
        </div>
    )
}

export default Kanban
