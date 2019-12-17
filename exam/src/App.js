import React from 'react';
import City from './components/City';
import AddCity from './components/AddCity';
import CityProfile from './components/CityProfile';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App(props) {
	let example = {
		coord: {
			lon: 145.77,
			lat: -16.92,
		},
		weather: {
			id: 802,
			main: 'Clouds',
			description: 'scattered clouds',
			icon: '03n',
		},
		base: 'stations',
		main: {
			temp: 300.15,
			pressure: 1007,
			humidity: 74,
			temp_min: 300.15,
			temp_max: 300.15,
		},
		visibility: 10000,
		wind: {
			speed: 3.6,
			deg: 160,
		},
		dt: 1485790200,
		sys: {
			type: 1,
			id: 8166,
			message: 0.2064,
			country: 'AU',
			sunrise: 1485720272,
			sunset: 1485766550,
		},
		id: 2172797,
		name: 'Cairns',
		cod: 200,
	};
	let routes = [
		{
			name: example.name,
			key: example.id,
		},
	];
	let cities = (
		<li key={example.id}>
			<City data={example} />
		</li>
	);
	return (
		<Router>
			<Switch>
				{routes.map((route) => (
					<Route path={`/${route.name}`} key={route.key}>
						<CityProfile data={example} />
					</Route>
				))}
				<Route path="/">
					<div className={styles.mainBox}>
						{routes.map((route) => (
							<Link to={`/${route.name}`} style={{ textDecoration: 'none' }}>
								<ul className={styles.mainList}>{cities}</ul>
							</Link>
						))}
						<AddCity />
					</div>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
