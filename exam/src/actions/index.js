import {
	GET_CITY_REQUEST,
	GET_CITY_FAILURE,
	GET_CITY_SUCCESS,
} from '../constants/ActionTypes';

const getCitySuccess = (data) => ({
	type: GET_CITY_SUCCESS,
	payload: data,
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
	if (type === 'name') {
		dispatch(getCityStarted());
		fetch(
			`https://samples.openweathermap.org/data/2.5/weather?q=${info}&appid=b6907d289e10d714a6e88b30761fae22`,
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				dispatch(getCitySuccess(data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(getCityFailure(err));
			});
	} else if (type === 'ID') {
		dispatch(getCityStarted());
		fetch(
			`https://samples.openweathermap.org/data/2.5/weather?id=${info}&appid=b6907d289e10d714a6e88b30761fae22`,
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				dispatch(getCitySuccess(data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(getCityFailure(err));
			});
	} else if (type === 'geopos') {
		dispatch(getCityStarted());
		fetch(
			`https://samples.openweathermap.org/data/2.5/weather?lat=${info.lat}&lon=${indo.lon}&appid=b6907d289e10d714a6e88b30761fae22`,
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				dispatch(getCitySuccess(data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(getCityFailure(err));
			});
	}
}
