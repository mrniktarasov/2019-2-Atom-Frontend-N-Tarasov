import {
	GET_CITY_REQUEST,
	GET_CITY_FAILURE,
	GET_CITY_SUCCESS,
	API_URL,
	KEY,
} from '../constants/ActionTypes';

const getCitySuccess = (data, geopos) => ({
	type: GET_CITY_SUCCESS,
	payload: data,
	geopos,
});

const getCityStarted = () => ({
	type: GET_CITY_REQUEST,
});

const getCityFailure = (error) => ({
	type: GET_CITY_FAILURE,
	payload: {
		error,
	},
});

export function getCity(info, type) {
	return (dispatch) => {
		if (type === 'name') {
			dispatch(getCityStarted());
			fetch(`${API_URL}/data/2.5/weather?q=${info}&appid=${KEY}`)
				.then((response) => {
					if (response.status !== 200) {
						throw new Error('Not 200 response');
					} else {
						return response.json();
					}
				})
				.then((data) => {
					dispatch(getCitySuccess(data));
				})
				.catch((err) => {
					dispatch(getCityFailure(err));
				});
		} else if (type === 'ID') {
			dispatch(getCityStarted());
			fetch(`${API_URL}/data/2.5/weather?id=${info}&appid=${KEY}`)
				.then((response) => response.json())
				.then((data) => {
					dispatch(getCitySuccess(data));
				})
				.catch((err) => {
					dispatch(getCityFailure(err));
				});
		}
	};
}
