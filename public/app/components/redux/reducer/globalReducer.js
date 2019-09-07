import ActionType from './globalActionType';

const globalState = {
    sortBy : 'size',
    data : [],
}

const rootReducer = (state = globalState, action) => {
    switch(action.type) {
        case ActionType.CHANGE_SORT:
            return {
                ...state,
                sortBy: action.sortBy,
            }
        default: return state;
    }
} 

export default rootReducer;