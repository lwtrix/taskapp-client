export const UPDATE_SELECTED_PLANNER = "UPDATE_SELECTED_PLANNER"

export const updateSelectedPlanner = (plannerId) => {
    return {
        type: UPDATE_SELECTED_PLANNER,
        payload: plannerId
    }
}

