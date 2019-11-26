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
	},
	changeStatus: (type, id) => {
		let actionType = null;
		switch(type) {
			case 'service':
				actionType = ACTION.CHANGE_SERVICE_STATUS;
				break;
			case 'report':
				actionType = ACTION.CHANGE_REPORT_STATUS;
				break;
			case 'repair':
				actionType = ACTION.CHANGE_REPAIR_STATUS;
				break;
			case 'parts':
				actionType = ACTION.CHANGE_PARTS_STATUS;
				break;
			default:
				actionType = ACTION.CHANGE_SERVICE_STATUS;
		}
		return {
			type: actionType,
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

export const setProfile = (profile) => {
	return {
		type: ACTION.SET_PROFILE,
		payload: {
			profile
		}
	}
}

export const toggleSidebar = () => {
	return {
		type: ACTION.TOGGLE_SIDEBAR
	}
}

export const hideSidebar = () => {
	return {
		type: ACTION.HIDE_SIDEBAR
	}
}

export default apiActions;
