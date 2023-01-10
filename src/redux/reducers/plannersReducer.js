const initialState = {
    selectedPlanner: null
}

const plannersReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_SELECTED_PLANNER':
            return {
                ...state,
                selectedPlanner: action.payload
            }
        default: 
            return state
    }
}

export default plannersReducer