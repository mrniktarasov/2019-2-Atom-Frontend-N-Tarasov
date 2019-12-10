import {
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	messages: [],
	error: null,
};

export default (state = initialState, action) => {
	const messages = action.payload ? action.payload : [];
	switch (action.type) {
		case GET_MESSAGES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_MESSAGES_SUCCESS:
			return {
				loading: false,
				error: null,
				messages: [...messages],
			};
		case GET_MESSAGES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};
