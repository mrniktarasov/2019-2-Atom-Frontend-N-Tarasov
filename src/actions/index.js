import {
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_FAILURE,
	GET_CHATS_REQUEST,
	GET_CHATS_SUCCESS,
	GET_CHATS_ROUTES,
	GET_CHATS_FAILURE,
} from '../constants/ActionTypes';
import { API_URL } from '../constants/Constants';

const getMessagesSuccess = (messages) => ({
	type: GET_MESSAGES_SUCCESS,
	payload: messages,
});

const getMessagesStarted = () => ({
	type: GET_MESSAGES_REQUEST,
});

const getMessagesFailure = (error) => ({
	type: GET_MESSAGES_FAILURE,
	payload: {
		error,
	},
});

const getChatsSuccess = (chats) => ({
	type: GET_CHATS_SUCCESS,
	payload: chats,
});

const getChatsStarted = () => ({
	type: GET_CHATS_REQUEST,
});

const getChatsFailure = (error) => ({
	type: GET_CHATS_FAILURE,
	payload: {
		error,
	},
});

const getChatsRoutes = (chats) => ({
	type: GET_CHATS_ROUTES,
	payload: chats,
});

export function getMessages(key) {
	return (dispatch) => {
		const pollItems = () => {
			dispatch(getMessagesStarted());

			fetch(`${API_URL}/chats/chat/${key}/get_message_list/`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					dispatch(getMessagesSuccess(data.messages));
				})
				.catch((err) => {
					console.log(err);
					dispatch(getMessagesFailure(err));
				});
		};
		setInterval(() => pollItems(), 3000);
	};
}

export function getChats() {
	return (dispatch) => {
		const pollItems = () => {
			dispatch(getChatsStarted());

			fetch(`${API_URL}/chats/get_chat_list/`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					dispatch(getChatsRoutes(data.chats));
					dispatch(getChatsSuccess(data.chats));
				})
				.catch((err) => {
					console.log(err);
					dispatch(getChatsFailure(err));
				});
		};
		setInterval(() => pollItems(), 3000);
	};
}
