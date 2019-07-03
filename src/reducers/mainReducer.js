import ACTION from '../constants/actions';

const mainReducer = (state = {
    test: ''
}, action) => {
    switch(action.type) {
        case ACTION.TEST:
            console.log(action)
            return {
                ...state,
                test: action.payload.test
            }
        default:
            return state
    }
            
}

export default mainReducer;