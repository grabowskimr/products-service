import ACTION from "../constants/actions";

const mainReducer = (state = {
	login: '',
	status: '',
	profile: 'standard',
	loginError: '',
	userId: 0,
	products: []
}, action) => {
  switch (action.type) {
    case ACTION.LOGIN:
			return {
				...state,
				login: action.payload.data.login,
				firstname: action.payload.data.firstname,
				lastname: action.payload.data.lastname,
				profile: action.payload.data.profile,
				loginError: ''
			}
		case ACTION.LOGIN_ERROR:
			return {
				...state,
				loginError: action.payload.data.error
			}
		case ACTION.CLEAR_LOGIN_ERROR:
			return {
				...state,
				loginError: ''
			}
		case ACTION.SET_USER_ID:
			return {
				...state,
				userId: action.payload.id
			}
		case ACTION.GET_PRODUCTS:
			return {
				...state,
				products: action.payload.data
			}
    default:
      return state;
  }
};

export default mainReducer;
