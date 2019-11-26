import ACTION from "../constants/actions";

const mainReducer = (state = {
	login: '',
	status: '',
	profile: 'standard',
	loginError: '',
	userId: 0,
	products: [],
	userProducts: [],
	loader: false,
	showMessage: false,
	message: {
		status: 1,
		message: 'Message'
	},
	isAdmin: false,
	showSidebar: false
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
				loginError: action.payload.data.message,
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
				if(product.name.toUpperCase().includes(action.payload.phase.toUpperCase()) || product.vin.toUpperCase().includes(action.payload.phase.toUpperCase())) {
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
		case ACTION.CHANGE_SERVICE_STATUS:
			let updatedUserProductsStatus = state.userProducts.map(product => {
				if(product.id === action.payload.id) {
					product.status_reqular_fix = '0';
				}
				return product;
			});
			return {
				...state,
				userProducts: updatedUserProductsStatus
			}
		case ACTION.CHANGE_REPORT_STATUS:
			let updatedUserProductsReports = state.userProducts.map(product => {
				if(product.id === action.payload.id) {
					product.status = '0';
				}
				return product;
			});
			return {
				...state,
				userProducts: updatedUserProductsReports
			}
		case ACTION.CHANGE_REPAIR_STATUS:
			let updatedUserProductsRepair = state.userProducts.map(product => {
				if(product.id === action.payload.id) {
					product.repair = '0';
				}
				return product;
			});
			return {
				...state,
				userProducts: updatedUserProductsRepair
			}
		case ACTION.CHANGE_PARTS_STATUS:
			let updatedUserProductsParts = state.userProducts.map(product => {
				if(product.id === action.payload.id) {
					product.parts = '0';
				}
				return product;
			});
			return {
				...state,
				userProducts: updatedUserProductsParts
			}
		case ACTION.SHOW_MESSAGE:
			return {
				...state,
				showMessage: true,
				message: action.payload.message
			}
		case ACTION.HIDE_MESSAGE:
			return {
				...state,
				showMessage: false
			}
		case ACTION.SET_PROFILE:
			return {
				...state,
				isAdmin: action.payload.profile === 'admin' ? true : false
			}
		case ACTION.TOGGLE_SIDEBAR:
			return {
				...state,
				showSidebar: !state.showSidebar
			}
		case ACTION.HIDE_SIDEBAR:
				return {
					...state,
					showSidebar: false
				}
    default:
      return state;
  }
};

export default mainReducer;
