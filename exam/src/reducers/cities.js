import {
	GET_CITY_REQUEST,
	GET_CITY_FAILURE,
	GET_CITY_SUCCESS,
} from '../constants/ActionTypes';

const initialState = {
	cities: [],
	error: null,
	loading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CITY_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_CITY_SUCCESS:
			const cities = [...state.cities];
			let cityExistInList = false;
			let i = 0;
			if (cities.length > 0) {
				while (!cityExistInList && i < cities.length) {
					if (cities[i].id === action.payload.id) {
						cityExistInList = true;
						alert('Этот город уже есть в списке');
					}
					i++;
				}
				if (!cityExistInList) {
					cities.push(action.payload);
				}
			} else {
				cities.push(action.payload);
			}
			return {
				loading: false,
				cities: cities,
				error: null,
			};
		case GET_CITY_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};
