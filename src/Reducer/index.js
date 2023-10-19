// REDUCER

export const counter = (state = '', action) => {
    switch (action.type) {
        case 'ID_SONG':
            
            state = action.payload;
            
            return state;
        default:
            return state;
    }
};
