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

export const getMessages = (key) => {
	return (dispatch, getState) => {
		console.log('state: ', getState());
		dispatch(getMessagesStarted());

		fetch(`https://127.0.0.1:8000/chats/chat/${key}/get_message_list/`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
		})
			.then((response) => {
				dispatch(getMessagesSuccess(response.data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(getMessagesFailure(err));
			});
	};
};
