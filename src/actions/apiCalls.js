import axios from 'axios';

import {endpoint} from '../constants/config';
import actions from './actions';

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
			checkSession: true
		})
	} else {
		window.location.href = "/";
	}
}


const api = {
	get: (method, ignoreSession) => {
		if(ignoreSession) {
			return axios.get(`${endpoint}?action=${method}`);
		}
		return checkSession().then(({data}) => {
			if(data.status) {
				return axios.get(`${endpoint}?action=${method}`);
			} else {
				window.location.href = "/";
			}
		})
	},
	post: (method, postData, ignoreSession) => {
		if(ignoreSession) {
			return axios.post(endpoint, {
				...postData,
				[method]: true
			})
		}
		return checkSession(ignoreSession).then(({data}) => {
			console.log(data.status);
			if(data.status) {
				return axios.post(endpoint, {
					...postData,
					[method]: true
				})
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
	api.post('register', data, true).then(({data}) => {
		dispatch(actions.hideLoader());
	})
}

export const loginToApp = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	data.session_id = makeid(35);
	return api.post('loginToApp', data, true).then(({data}) => {
		if(!data.error) {
			dispatch(actions.login(data));
		} else {
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
	dispatch(actions.showLoader());
	return api.post('addUserProduct', data).then(({data}) => {
		console.log(data);
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

export const setStatusService = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('setStatusService', data).then(response => {
		if(response.status) {
			dispatch(actions.setStatusService(data.id));
		}
		dispatch(actions.hideLoader());
	});
}