import axios from 'axios';

import {endpoint} from '../constants/config';
import actions from './actions';
import { id } from 'postcss-selector-parser';

const api = {
	get: (method) => {
		return axios.get(`${endpoint}?action=${method}`);
	},
	post: (method, data) => {
		return axios.post(endpoint, {
			...data,
			[method]: true
		})
	}
}


export const registerToApp = (data) => (dispatch) => {
	api.post('register', data).then(({data}) => {
		console.log(data);
	})
	// dispatch(actions.register();
}

export const loginToApp = (data) => (dispatch) => {
	return api.post('loginToApp', data).then(({data}) => {
		if(!data.error) {
			dispatch(actions.login(data));
		} else {
			dispatch(actions.loginError(data));
		}
		return data;
	});
}
