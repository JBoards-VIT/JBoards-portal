const initialState = [
    {
        id: String(Date.now() + Math.random() * 2),
        title: "To Do",
        cards: [
            {
                id: String(Date.now() + Math.random()),
                title: "Card 1",
                tasks: [
                    {
                        title: "Task 1",
                        checked: true,
                    },
                    {
                        title: "Task 2",
                        checked: false,
                    }
                ],
                labels: [
                    {
                        text: "frontend",
                        color: "primary"
                    },
                    {
                        text: "code",
                        color: "success"
                    }
                ],
                desc: "bsciwb vo 3rv 3jve",
                date: null
            },
            {
                id: String(Date.now() + Math.random()),
                title: "Card 1",
                tasks: [],
                labels: [
                    {
                        text: "frontend",
                        color: "primary"
                    },
                    {
                        text: "code",
                        color: "success"
                    }
                ],
                desc: "bsciwb vo 3rv 3jve",
                date: null
            }
        ]
    }
]

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_BOARD": {
            let newState = [...state]
            newState.push({
                id: String(Date.now() + Math.random() * 2),
                title: action.payload.title,
                cards: [],
            })
            return newState
        }
        case "REMOVE_BOARD": {
            return state.filter((board) => board.id !== action.payload.boardId)
        }
        case "CHANGE_BOARD_POSITION": {
            let newState = [...state]
            const tempBoard = newState[action.payload.source.index];
            newState.splice(action.payload.source.index, 1);
            newState.splice(action.payload.destination.index, 0, tempBoard);
            return newState;
        }
        case "CHANGE_BOARD_TITLE": {
            let newState = [...state]
            const index = newState.findIndex((board) => board.id === action.payload.boardId);
            if (index < 0) return;
            newState[index].title = action.payload.title
            return newState;
        }
        case "ADD_CARD": {
            let newState = [...state]
            let card = {
                id: Date.now() + Math.random(),
                title: action.payload.title,
                tasks: [],
                labels: [],
                desc: "",
                date: ""
            };
            const index = newState.findIndex((board) => board.id === action.payload.boardId);
            if (index < 0) return;
            newState[index].cards.push(card);
            return newState;
        }
        case "REMOVE_CARD": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards.splice(cIndex, 1);
            return newState;
        }
        case "CHANGE_CARD_POSITION": {
            let newState = [...state]
            let s_bIndex = newState.findIndex((board) => board.id === action.payload.source.droppableId)
            if (s_bIndex < 0) return;
            let t_bIndex = newState.findIndex((board) => board.id === action.payload.destination.droppableId)
            if (t_bIndex < 0) return;
            const tempCard = newState[s_bIndex].cards[action.payload.source.index];
            newState[s_bIndex].cards.splice(action.payload.source.index, 1);
            newState[t_bIndex].cards.splice(action.payload.destination.index, 0, tempCard);
            return newState;
        }
        case "CHANGE_CARD_TITLE": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards[cIndex].title = action.payload.title;
            return newState;
        }
        case "CHANGE_CARD_DESC": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards[cIndex].desc = action.payload.desc;
            return newState;
        }
        case "CHANGE_CARD_DATE": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards[cIndex].date = action.payload.date;
            return newState;
        }
        case "ADD_CARD_LABEL": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards[cIndex].labels.push(action.payload.label);
            return newState;
        }
        case "DELETE_CARD_LABEL": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards[cIndex].labels.splice(action.payload.labelIndex, 1);
            return newState;
        }
        case "ADD_CARD_TASK": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards[cIndex].tasks.push(action.payload.task);
            return newState;
        }
        case "DELETE_CARD_TASK": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards[cIndex].tasks.splice(action.payload.taskIndex, 1);
            return newState;
        }
        case "TOGGLE_CARD_TASK": {
            let newState = [...state]
            let bIndex = newState.findIndex((board) => board.id === action.payload.boardId);
            if (bIndex < 0) return;
            const cIndex = newState[bIndex].cards.findIndex((card) => card.id === action.payload.cardId);
            if (cIndex < 0) return;
            newState[bIndex].cards[cIndex].tasks[action.payload.taskIndex].checked = action.payload.checked;
            return newState;
        }
        default: return state;
    }
}

export default boardReducer;