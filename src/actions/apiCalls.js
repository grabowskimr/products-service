import axios from 'axios';

import {endpoint, host} from '../constants/config';
import actions, { showMessage } from './actions';

const makeid = (length) => {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		 result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const getCookieValueByRegEx = (a, b) => {
	b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
	return b ? b.pop() : '';
}

const checkSession = () => {
	if(getCookieValueByRegEx('login')) {
		let cookie = JSON.parse(unescape(getCookieValueByRegEx('login')));
		return axios.post(endpoint, {
			session_id: cookie.session_id,
			user_id: parseInt(cookie.id),
			profile: cookie.profile,
			checkSession: true
		})
	} else {
		document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		window.location.href = "/";
	}
}

const api = {
	get: (method, ignoreSession, params) => {
		if(ignoreSession) {
			return axios.get(`${endpoint}?action=${method}`, {params});
		}
		return checkSession().then(({data}) => {
			if(data.status) {
				return axios.get(`${endpoint}?action=${method}`, {params});
			} else {
				document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				window.location.href = "/";
			}
		})
	},
	post: (method, postData, ignoreSession, config) => {
		if(ignoreSession) {
			return axios.post(endpoint, {
				...postData,
				[method]: true
			}, config)
		}
		return checkSession(ignoreSession).then(({data}) => {
			if(data.status) {
				return axios.post(endpoint, {
					...postData,
					[method]: true
				}, config)
			} else {
				this.props.history.push('/');
			}
		})
		
	}
}

const getProductsData = () => {
	return api.get('getProducts').then(({data}) => {
		return data;
	})
}

const getUserProductsData = (id) => {
	return api.get(`getUserProducts&userId=${id}`).then(({data}) => {
		return data;
	})
}

export const registerToApp = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('register', data, true).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
		return data;
	})
}

export const loginToApp = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	data.session_id = makeid(35);
	return api.post('loginToApp', data, true).then(({data}) => {
		if(data.status) {
			dispatch(actions.login(data));
		} else {
			dispatch(showMessage(data));
			dispatch(actions.loginError(data));
		}
		return data;
	});
}

export const getProducts = () => (dispatch) => {
	dispatch(actions.showLoader());
	return getProductsData().then((data) => {
		dispatch(actions.getProducts(data));
		return data;
	})
}

export const getUserProducts = (id) => (dispatch) => {
	dispatch(actions.showLoader());
	return getUserProductsData(id).then((data) => {
		dispatch(actions.getUserProducts(data));
		return data;
	})
}

export const addUserProduct = (data) => (dispatch) => {
	let date = new Date(data.orderDate);
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	data.wariancy = new Date(year + 1, month, day);
	dispatch(actions.showLoader());
	return api.post('addUserProduct', data).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
	})
}

export const getInitialData = () => (dispatch) => {
	dispatch(actions.showLoader());
	return axios.all([getProductsData()])
		.then(axios.spread(function (products) {
			dispatch(actions.getProducts(products));
			dispatch(actions.hideLoader());
			return true;
		})
	);
}

export const setStatusService = (service) => (dispatch) => {
	service.date = new Date();
	dispatch(actions.showLoader());
	return api.post('setStatusService', service).then(({data}) => {
		if(data.status) {
			dispatch(actions.setStatusService(service.id));
		}
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
	});
}

export const changeServiceStatus = (service) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('changeServiceStatus', service).then(({data}) => {
		if(data.status) {
			dispatch(actions.changeServiceStatus(service.id));
		}
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
	});
}

export const changeReportStatus = (service) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('changeReportStatus', service).then(({data}) => {
		if(data.status) {
			dispatch(actions.changeReportStatus(service.id));
		}
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
	});
}

export const sendErrorReport = (errorData) => (dispatch) => {
	errorData.date = new Date();
	dispatch(actions.showLoader());
	const formData = new FormData();
	formData.append('image', errorData.file);
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	}
	if(!errorData.file) {
		return api.post('saveErrorData', errorData).then(({data}) => {
			dispatch(showMessage(data));
			dispatch(actions.hideLoader());
		});
	}
	return axios.post(`${host}/upload.php`, formData, config).then((response) => {
		if(!response.data.status) {
			dispatch(actions.hideLoader());
			dispatch(showMessage(response.data));
			return;
		} else {
			const filePath = response.data.message;
			errorData.file = filePath;
			return api.post('saveErrorData', errorData).then(({data}) => {
				dispatch(showMessage(data));
				dispatch(actions.hideLoader());
			});
		}
	});
}

export const checkIfReportExist = (service) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('checkReportstatus', service).then(({data}) => {
		if(data.status) {
			dispatch(actions.hideLoader());
			return data;
		} else {
			dispatch(showMessage(data));
			return data;
		}
	});
}

export const getProductInfo = (params) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.get('getProductHistory', false, params).then(response => {
		return api.get('getUserProduct', false, params).then((product) => {
			dispatch(actions.hideLoader());
			return {
				product: product.data[0],
				history: response.data
			}
		})
	})
}

export const getUsers = () => (dispatch) => {
	dispatch(actions.showLoader());
	return api.get('getUsers').then(({data}) => {
		dispatch(actions.hideLoader());
		return data;
	})
}

export const getClients = () => (dispatch) => {
	dispatch(actions.showLoader());
	return api.get('getClients').then(({data}) => {
		dispatch(actions.hideLoader());
		return data;
	})
}

export const getOrders = () => (dispatch) => {
	dispatch(actions.showLoader());
	return api.get('getOrders').then(({data}) => {
		dispatch(actions.hideLoader());
		return data;
	})
}

export const getOrder = (id) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.get('getOrder', false, id).then(({data}) => {
		dispatch(actions.hideLoader());
		return data[0];
	})
}

export const changeStatus = (serviceData) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('changeStatus', serviceData).then(({data}) => {
		if(data.status) {
			dispatch(showMessage(data));
			dispatch(actions.hideLoader());
			return data;
		} else {
			dispatch(showMessage(data));
			return data;
		}
	});
}

export const addProduct = (productData) => (dispatch) => {
	dispatch(actions.showLoader());
	const formData = new FormData();
	formData.append('image', productData.file);
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	}
	if(!productData.file) {
		return api.post('addProduct', productData).then(({data}) => {
			dispatch(showMessage(data));
			dispatch(actions.hideLoader());
			return data;
		});
	}
	return axios.post(`${host}/upload.php`, formData, config).then((response) => {
		if(!response.data.status) {
			dispatch(actions.hideLoader());
			dispatch(showMessage(response.data));
			return;
		} else {
			const filePath = response.data.message;
			productData.file = filePath;
			return api.post('addProduct', productData).then(({data}) => {
				dispatch(showMessage(data));
				dispatch(actions.hideLoader());
				return data;
			});
		}
	});
}

export const getProduct = (params) => (dispatch) => {
	dispatch(actions.showLoader());
		return api.get('getProduct', false, params).then((product) => {
			dispatch(actions.hideLoader());
			return product.data[0];
		})
}

export const updateProduct = (productData) => (dispatch) => {
	dispatch(actions.showLoader());
	const formData = new FormData();
	formData.append('image', productData.file);
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	}
	if(!productData.file) {
		productData.file = productData.image;
		return api.post('updateProduct', productData).then(({data}) => {
			dispatch(showMessage(data));
			dispatch(actions.hideLoader());
			return data;
		});
	}
	return axios.post(`${host}/upload.php`, formData, config).then((response) => {
		if(!response.data.status) {
			dispatch(actions.hideLoader());
			dispatch(showMessage(response.data));
			return;
		} else {
			const filePath = response.data.message;
			productData.file = filePath;
			return api.post('updateProduct', productData).then(({data}) => {
				dispatch(showMessage(data));
				dispatch(actions.hideLoader());
				return data;
			});
		}
	});
}

export const removeUser = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('removeUser', data).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
		return data;
	})
}

export const addResetHash = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('addResetHash', data, true).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
		return data;
	})
}

export const resetPassword = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('resetPassword', data, true).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
		return data;
	})
}

export const hashChecking = (params) => (dispatch) => {
	dispatch(actions.showLoader());
		return api.get('hashChecking', true, params).then((data) => {
			dispatch(actions.hideLoader());
			return data.data[0];
		})
}
export const addUser = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('addUser', data, false).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
		return data;
	})
}

export const changeServiceUser = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('changeServiceUser', data, false).then(({data}) => {
		dispatch(showMessage(data));
		dispatch(actions.hideLoader());
		return data;
	})
}