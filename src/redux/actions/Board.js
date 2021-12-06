export const setKanban = (kanban) => {
    return {
        type: "INITIALIZE_KANBAN",
        payload: {
            kanban,
        }
    }
}
export const addBoard = (board) => {
    return {
        type: "ADD_BOARD",
        payload: {
            board,
        }
    }
}
export const removeBoard = (boardId) => {
    return {
        type: "REMOVE_BOARD",
        payload: {
            boardId,
        }
    }
}
export const changeBoardPosition = (source, destination) => {
    return {
        type: "CHANGE_BOARD_POSITION",
        payload: {
            source,
            destination
        }
    }
}
export const changeBoardTitle = (title, boardId) => {
    return {
        type: "CHANGE_BOARD_TITLE",
        payload: {
            title,
            boardId
        }
    }
}
export const addCard = (card, boardId) => {
    return {
        type: "ADD_CARD",
        payload: {
            card,
            boardId,
        }
    }
}
export const removeCard = (cardId, boardId) => {
    return {
        type: "REMOVE_CARD",
        payload: {
            cardId,
            boardId,
        }
    }
}
export const changeCardPosition = (source, destination) => {
    return {
        type: "CHANGE_CARD_POSITION",
        payload: {
            source,
            destination
        }
    }
}
export const changeCardTitle = (title, cardId, boardId) => {
    return {
        type: "CHANGE_CARD_TITLE",
        payload: {
            title,
            cardId,
            boardId
        }
    }
}
export const changeCardDesc = (desc, cardId, boardId) => {
    return {
        type: "CHANGE_CARD_DESC",
        payload: {
            desc,
            cardId,
            boardId
        }
    }
}
export const changeCardDate = (date, cardId, boardId) => {
    return {
        type: "CHANGE_CARD_DATE",
        payload: {
            date,
            cardId,
            boardId
        }
    }
}
export const addCardLabel = (label, cardId, boardId) => {
    return {
        type: "ADD_CARD_LABEL",
        payload: {
            label,
            cardId,
            boardId
        }
    }
}
export const deleteCardLabel = (labelId, cardId, boardId) => {
    return {
        type: "DELETE_CARD_LABEL",
        payload: {
            labelId,
            cardId,
            boardId
        }
    }
}
export const addCardTask = (task, cardId, boardId) => {
    return {
        type: "ADD_CARD_TASK",
        payload: {
            task,
            cardId,
            boardId
        }
    }
}
export const deleteCardTask = (taskId, cardId, boardId) => {
    return {
        type: "DELETE_CARD_TASK",
        payload: {
            taskId,
            cardId,
            boardId
        }
    }
}
export const toggleCardTask = (completed, taskId, cardId, boardId) => {
    return {
        type: "TOGGLE_CARD_TASK",
        payload: {
            completed,
            taskId,
            cardId,
            boardId
        }
    }
}