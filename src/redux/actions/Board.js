export const addBoard = (title) => {
    return {
        type: "ADD_BOARD",
        payload: {
            title,
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
export const addCard = (title, boardId) => {
    return {
        type: "ADD_CARD",
        payload: {
            title,
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
export const deleteCardLabel = (labelIndex, cardId, boardId) => {
    return {
        type: "DELETE_CARD_LABEL",
        payload: {
            labelIndex,
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
export const deleteCardTask = (taskIndex, cardId, boardId) => {
    return {
        type: "DELETE_CARD_TASK",
        payload: {
            taskIndex,
            cardId,
            boardId
        }
    }
}
export const toggleCardTask = (checked, taskIndex, cardId, boardId) => {
    return {
        type: "TOGGLE_CARD_TASK",
        payload: {
            checked,
            taskIndex,
            cardId,
            boardId
        }
    }
}