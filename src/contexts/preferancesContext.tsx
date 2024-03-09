import React, { createContext, useReducer } from 'react';

const initialState = {
    isLoading: false,
    color: {
        win: "green",
        loose: "red"
    },

}

const reducer = (state, action) => {

    switch (action.type) {
        case 'setLoader':
            return { ...state, [action.name]: action.isLoading };


        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const PreferanceContext = createContext(initialState);

export const PreferanceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PreferanceContext.Provider value={{ state, dispatch }}>
            {children}
        </PreferanceContext.Provider>
    );
}

export default PreferanceContext;