import React, { useState } from 'react';
import City from './components/City';
import AddCity from './components/AddCity';
import CityProfile from './components/CityProfile';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCity } from './actions';
import { API_URL, KEY } from './constants/ActionTypes';

function App(props) {
	const { getCity, data } = props;
	const ids = ['1510853', '475936', '1784734'];
	const [geopos, setGeopos] = useState(null);
	React.useEffect(() => {
		const geoSuccess = (position) => {
			let coords = {
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			};
			fetch(
				`${API_URL}/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${KEY}`,
			)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setGeopos(data);
				})
				.catch((err) => {
					console.log(err);
				});
			return 0;
		};

		const geoError = (error) => {
			console.log(error.message);
		};

		const geoOptions = {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 27000,
		};

		navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
		ids.map((id) => {
			getCity(id, 'ID');
			return 0;
		});
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<Switch>
				{geopos ? (
					<Route path={`/${geopos.name}`} key={geopos.key}>
						<CityProfile data={geopos} />
					</Route>
				) : null}
				{data.map((city) => (
					<Route path={`/${city.name}`} key={city.key}>
						<CityProfile data={city} />
					</Route>
				))}
				<Route path="/">
					<div className={styles.mainBox}>
						<ul className={styles.mainList}>
							{geopos ? (
								<li key={geopos.id}>
									<Link
										to={`/${geopos.name}`}
										style={{ textDecoration: 'none' }}
									>
										<City data={geopos} isGeopos={true} />
									</Link>
								</li>
							) : null}
							{data.map((city) => (
								<li key={city.id}>
									<Link to={`/${city.name}`} style={{ textDecoration: 'none' }}>
										<City data={city} />
									</Link>
								</li>
							))}
						</ul>
						<AddCity />
					</div>
				</Route>
			</Switch>
		</Router>
	);
}

const mapStateToProps = function(state) {
	return {
		data: state.cities.cities,
	};
};

export default connect(mapStateToProps, { getCity })(App);
