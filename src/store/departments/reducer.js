const initState = {
    departments: []
}

export default function reducer(state = initState, action) {
    switch(action.type) {
        case 'LOAD_DEPARTMENTS': {
            return {
                ...state,
                departments: action.data
            }
        }
        case 'ADD_DEPARTMENT': {
            return {
                ...state,
                departments: [...state.departments, action.data]
            }
        }
        case 'DELETE_DEPARTMENT': {
            return {
                ...state,
                departments: state.departments.filter(dept => dept._id !== dept.id)
            }
        }
        default: {
            return state;
        }
    }
}