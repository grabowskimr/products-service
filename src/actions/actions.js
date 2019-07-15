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
	},
	getUserProducts: (data) => {
		return {
			type: ACTION.GET_USER_PRODUCTS,
			payload: {
				data
			}
		}
	},
	showLoader: () => {
		return {
			type: ACTION.SHOW_LOADER
		}
	},
	hideLoader: () => {
		return {
			type: ACTION.HIDE_LOADER
		}
	},
	setStatusService: (id) => {
		return {
			type: ACTION.SET_STATUS_SERVICE,
			payload: {
				id
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

export const filterUserProducts = (phase) => {
	return {
		type: ACTION.FILTER_USER_PRODUCTS,
		payload: {
			phase
		}
	}
}

export const showMessage = (message) => {
	return {
		type: ACTION.SHOW_MESSAGE,
		payload: {
			message
		}
	}
}

export const hideMessage = () => {
	return {
		type: ACTION.HIDE_MESSAGE
	}
}

export default apiActions;