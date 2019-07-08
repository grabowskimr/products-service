import ACTION from '../constants/actions';

const apiActions = {
	login: (data) => {
		return {
			type: ACTION.LOGIN,
			payload: {
					data
			}
		}
	},
	register: (data) => {
		return {
			type: ACTION.REGISTER,
			payload: {
					data
			}
		}
	},
	loginError: (data) => {
		return {
			type: ACTION.LOGIN_ERROR,
			payload: {
					data
			}
		}
	}
}

export const clearLoginError =  (data) => {
	return {
		type: ACTION.CLEAR_LOGIN_ERROR
	}
}

export default apiActions;