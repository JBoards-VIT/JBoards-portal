import React from 'react'
import Board from "../../components/Board";
import Editable from "../../components/Editable";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { addBoard, changeCardPosition, changeBoardPosition } from "../../redux/actions/Board";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
const Kanban = () => {
    const boards = useSelector(state => state.boards);
    const dispatch = useDispatch();
    const handleDragEnd = (result) => {
        const { destination, source, type } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        if (type === "card") dispatch(changeCardPosition(source, destination));
        else if (type === "columns") dispatch(changeBoardPosition(source, destination))
    }
    return (
        <div className="Kanban">
            <div className="Kanban__outer">
                <DragDropContext
                    onDragEnd={(result) => handleDragEnd(result)}
                >
                    <Droppable droppableId="all-columns" direction="horizontal" type="columns">
                        {(provided) => (
                            <div className="Kanban__boards" {...provided.droppableProps} ref={provided.innerRef}>
                                {boards.map((board, index) => (
                                    <Board
                                        key={board.id}
                                        boardIndex={index}
                                    />
                                ))}
                                {provided.placeholder}
                                <div className="Kanban__boards__board">
                                    <Editable
                                        hasValue={false}
                                        text="Add Board"
                                        label="Board Title"
                                        onSubmit={(value) => dispatch(addBoard(value))}
                                    />
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

export default Kanban
