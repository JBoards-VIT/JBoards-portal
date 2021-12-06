const boardReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIALIZE_KANBAN": {
            let newState = action.payload.kanban
            return newState
        }
        case "ADD_BOARD": {
            let newState = { ...state }
            console.log(newState)
            newState.boards.push(action.payload.board)
            return newState
        }
        case "REMOVE_BOARD": {
            return state.boards.filter((board) => board._id !== action.payload.boardId)
        }
        case "CHANGE_BOARD_POSITION": {
            let newState = { ...state };
            const tempBoard = newState[action.payload.source.index];
            newState.splice(action.payload.source.index, 1);
            newState.splice(action.payload.destination.index, 0, tempBoard);
            return newState;
        }
        case "CHANGE_BOARD_TITLE": {
            let newState = { ...state };
            const index = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (index < 0) return;
            newState.boards[index].title = action.payload.title
            return newState;
        }
        case "ADD_CARD": {
            let newState = { ...state };
            const index = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (index < 0) return;
            newState.boards[index].cards.push(action.payload.card);
            return newState;
        }
        case "REMOVE_CARD": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            newState.boards[bIndex].cards.splice(cIndex, 1);
            return newState;
        }
        case "CHANGE_CARD_POSITION": {
            let newState = { ...state };
            let s_bIndex = newState.boards.findIndex((board) => board._id === action.payload.source.droppableId)
            if (s_bIndex < 0) return;
            let t_bIndex = newState.boards.findIndex((board) => board._id === action.payload.destination.droppableId)
            if (t_bIndex < 0) return;
            const tempCard = newState.boards[s_bIndex].cards[action.payload.source.index];
            newState.boards[s_bIndex].cards.splice(action.payload.source.index, 1);
            newState.boards[t_bIndex].cards.splice(action.payload.destination.index, 0, tempCard);
            return newState;
        }
        case "CHANGE_CARD_TITLE": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            newState.boards[bIndex].cards[cIndex].title = action.payload.title;
            return newState;
        }
        case "CHANGE_CARD_DESC": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            newState.boards[bIndex].cards[cIndex].description = action.payload.desc;
            return newState;
        }
        case "CHANGE_CARD_DATE": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            newState.boards[bIndex].cards[cIndex].date = action.payload.date;
            return newState;
        }
        case "ADD_CARD_LABEL": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            newState.boards[bIndex].cards[cIndex].labels.push(action.payload.label);
            return newState;
        }
        case "DELETE_CARD_LABEL": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            const labelIndex = newState.boards[bIndex].cards.labels.findIndex((label) => label._id === action.payload.labelId);
            if (cIndex < 0) return;
            newState.boards[bIndex].cards[cIndex].labels.splice(labelIndex, 1);
            return newState;
        }
        case "ADD_CARD_TASK": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            newState.boards[bIndex].cards[cIndex].tasks.push(action.payload.task);
            return newState;
        }
        case "DELETE_CARD_TASK": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            const taskIndex = newState.boards[bIndex].cards.tasks.findIndex((task) => task._id === action.payload.taskId);
            if (taskIndex < 0) return;
            newState.boards[bIndex].cards[cIndex].tasks.splice(taskIndex, 1);
            return newState;
        }
        case "TOGGLE_CARD_TASK": {
            let newState = { ...state };
            let bIndex = newState.boards.findIndex((board) => board._id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState.boards[bIndex].cards.findIndex((card) => card._id === action.payload.cardId);
            if (cIndex < 0) return;
            const taskIndex = newState.boards[bIndex].cards.tasks.findIndex((task) => task._id === action.payload.taskId);
            if (taskIndex < 0) return;
            newState.boards[bIndex].cards[cIndex].tasks[taskIndex].completed = action.payload.completed;
            return newState;
        }
        default: return state;
    }
}

export default boardReducer;