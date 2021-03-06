import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 5;

const initialstate = [
    {
        title: "1st List",
        id: `list-${0}`,
        cards: [
            {
                id: `cards-${0}`,
                text: "List_1 Data_1"
            },
            {
                id: `cards-${1}`,
                text: "List_1 Data_2"
            }
        ]
    },
    {
        title: "2st List",
        id: `list-${1}`,
        cards: [
            {
                id: `cards-${2}`,
                text: "List_2 Data_1"
            },
            {
                id: `cards-${3}`,
                text: "List_2 Data_2"
            },
            {
                id: `cards-${4}`,
                text: "List_3 Data_3"
            }
        ]
    }
];

const ListReducer = (state = initialstate, action) => {
    switch (action.type) {

        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                card: [],
                id: `list-${listID}`
            }
            listID += 1
            return [...state, newList];

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            };
            cardID += 1;

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list
                }
            });
            return newState;
        }

        case CONSTANTS.DRAG_HAPPENED:

            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
            } = action.payload;
            const newState = [...state];

            //in same list
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }
            return newState;
        

        default:
            return state;
    }
};
export default ListReducer; 