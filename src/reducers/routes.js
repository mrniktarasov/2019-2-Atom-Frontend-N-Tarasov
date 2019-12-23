import { GET_CHATS_ROUTES } from '../constants/ActionTypes';

const initialState = {
	routes: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CHATS_ROUTES:
			let routes = [];
			const groups = action.payload;
			if (groups.length > 0) {
				groups.map((oneGroup) => {
					const route = {
						key: oneGroup.chat_id,
					};
					routes.push(route);
					return 0;
				});
			}
			return {
				routes: routes,
			};
		default:
			return state;
	}
};
