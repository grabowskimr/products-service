import ACTION from '../constants/actions';

export const testFunc = (data) => {
    return {
        type: ACTION.TEST,
        payload: {
            test: data
        }
    }
}