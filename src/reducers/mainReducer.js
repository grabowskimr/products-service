import ACTION from "../constants/actions";

const mainReducer = (state = {
	login: '',
	status: '',
	profile: 'standard',
	loginError: '',
	userId: 0,
	products: [],
	userProducts: [],
	loader: false
}, action) => {
  switch (action.type) {
    case ACTION.LOGIN:
			return {
				...state,
				login: action.payload.data.login,
				firstname: action.payload.data.firstname,
				lastname: action.payload.data.lastname,
				profile: action.payload.data.profile,
				loginError: '',
				loader: false
			}
		case ACTION.LOGIN_ERROR:
			return {
				...state,
				loginError: action.payload.data.error,
				loader: false
			}
		case ACTION.CLEAR_LOGIN_ERROR:
			return {
				...state,
				loginError: '',
				loader: false
			}
		case ACTION.SET_USER_ID:
			return {
				...state,
				userId: action.payload.id
			}
		case ACTION.GET_PRODUCTS:
			return {
				...state,
				products: action.payload.data,
				loader: false
			}
		case ACTION.GET_USER_PRODUCTS:
			return {
				...state,
				userProducts: action.payload.data,
				loader: false
			}
		case ACTION.SHOW_LOADER: 
			return {
				...state,
				loader: true
			}
		case ACTION.HIDE_LOADER: 
			return {
				...state,
				loader: false
			}
		case ACTION.FILTER_USER_PRODUCTS:
			let filteredProducts = state.userProducts.map(product => {
				if(product.name.toUpperCase().includes(action.payload.phase.toUpperCase())) {
					product.hidden = false;
				} else {
					product.hidden = true;
				}
				return product;
			});
			return {
				...state,
				userProducts: filteredProducts
			}
		case ACTION.SET_STATUS_SERVICE:
			let updatedUserProducts = state.userProducts.map(product => {
				if(product.id === action.payload.id) {
					product.status_reqular_fix = '1';
				}
				return product;
			});
			return {
				...state,
				userProducts: updatedUserProducts
			}
    default:
      return state;
  }
};

export default mainReducer;
