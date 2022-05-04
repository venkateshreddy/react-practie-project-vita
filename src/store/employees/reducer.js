const initState = {
    employees: []
}

export default function reducer(state = initState, action) {
    switch(action.type) {
        case 'LOAD_EMPLOYEES': {
            return {
                ...state,
                employees: action.data
            }
        }
        case 'ADD_EMPLOYEE': {
            return {
                ...state,
                employees: [...state.employees, action.data]
            }
        }
        case 'DELETE_EMPLOYEE': {
            return {
                ...state,
                employees: state.employees.filter(emp => emp._id !== action.id)
            }
        }
        default: {
            return state;
        }
    }
}