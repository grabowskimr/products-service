import axios from 'axios';

import {endpoint} from '../constants/config';
import actions from './actions';

const api = {
	get: (method, params = {}) => {
		return axios.get(`${endpoint}?action=${method}`);
	},
	post: (method, data) => {
		return axios.post(endpoint, {
			...data,
			[method]: true
		})
	}
}

const getProductsData = () => {
	return api.get('getProducts').then(({data}) => {
		return data;
	})
}

const getUserProductsData = () => {
	return api.get('getUserProducts').then(({data}) => {
		return data;
	})
}


export const registerToApp = (data) => (dispatch) => {
	api.post('register', data).then(({data}) => {
		console.log(data);
	})
	// dispatch(actions.register();
}

export const loginToApp = (data) => (dispatch) => {
	dispatch(actions.showLoader());
	return api.post('loginToApp', data).then(({data}) => {
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

export const getUserProducts = () => (dispatch) => {
	dispatch(actions.showLoader());
	return getUserProductsData().then((data) => {
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
