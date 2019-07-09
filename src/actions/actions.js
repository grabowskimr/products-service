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
	},
	getProducts: (data) => {
		return {
			type: ACTION.GET_PRODUCTS,
			payload: {
				data
			}
		}
	}
}

export const clearLoginError = () => {
	return {
		type: ACTION.CLEAR_LOGIN_ERROR
	}
}

export const setUserId = (id) => {
	return {
		type: ACTION.SET_USER_ID,
		payload: {
			id
		}
	}
}

export default apiActions;