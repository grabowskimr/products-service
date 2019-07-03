import ACTION from '../constants/actions';

const getTest = () => {
    return {
        type: ACTION.API_TEST
    }
}



export const getTestData = () => {
    return (dispatch) => {
        dispatch(getTest());
    }
}