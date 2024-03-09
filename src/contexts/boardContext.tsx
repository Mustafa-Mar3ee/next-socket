import { BoardProviderProps, Player, State } from '@/interfaces';
import React, { ReactNode, createContext, useReducer } from 'react';



const initialState: State = {
    speed: 25,
    players: [
        { id: 1, name: 'Jane Smith', points: 100, multiplier: 1.5, totalPoints: 1000 },
        { id: 2, name: 'Alice Johnson', points: 100, multiplier: 2, totalPoints: 1000 },
        { id: 3, name: 'Bob Brown', points: 100, multiplier: 1.75, totalPoints: 1000 },
        { id: 4, name: 'Charlie Davis', points: 100, multiplier: 1.25, totalPoints: 1000 },
    ],
};

const reducer = (state: any, action: any) => {

    switch (action.type) {
        case 'increment':
            return { ...state, [action.name]: state[action.name] + action.amount };
        case 'decrement':
            return { ...state, [action.name]: Math.max(0, state[action.name] - action.amount) };
        case 'set':
            const newValue = Math.max(0, action.amount);
            return { ...state, [action.name]: newValue };
        case 'speed':
            return { ...state, [action.name]: action.amount / 25 };
        case 'updatePlayer':
            const updatedPlayers = state.players.map((player: Player) =>
                player.id === action.payload.id ? { ...player, ...action.payload.updates } : player
            );
            return { ...state, players: updatedPlayers };
        case 'createPlayer':
            const newPlayer = action.payload;
            return { ...state, players: [...state.players, newPlayer] };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};


const BoardContext = createContext(initialState);


export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BoardContext.Provider value={{ state, dispatch }}>
            {children}
        </BoardContext.Provider>
    );
}

export default BoardContext;