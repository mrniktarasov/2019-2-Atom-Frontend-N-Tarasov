import {
	GET_CHATS_REQUEST,
	GET_CHATS_SUCCESS,
	GET_CHATS_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
	loading: false,
	chats: [],
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CHATS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_CHATS_SUCCESS:
			return {
				loading: false,
				chats: [...action.payload],
				error: null,
			};
		case GET_CHATS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};
