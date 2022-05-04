const initState = {
    students: []
}

export default function reducer(state = initState, action) {
    switch(action.type) {
        case 'LOAD_STUDENTS': {
            //assign the action data to students
            return {
                ...state,
                students: action.data
            }
        }
        case 'ADD_STUDENT': {
            //add the action data to students list
            return {
                ...state,
                students: [...state.students, action.data]
            }
        }
        case 'DELETE_STUDENT': {
            //search and delete student from the list, based on id we receive in action
            return {
                ...state,
                students: state.students.filter(stu => stu._id !== action.id)
            }
        }
        default: {
            return state;
        }
    }
}