import {
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAILURE,
} from '../constants/ActionTypes';

const getMessagesSuccess = (messages) => ({
	type: GET_MESSAGES_SUCCESS,
	payload: messages,
});

const getMessagesStarted = () => ({
	type: GET_MESSAGES_REQUEST,
});

const getMessagesFailure = () => ({
	type: GET_MESSAGES_FAILURE,
	payload: {
		error,
	},
});
