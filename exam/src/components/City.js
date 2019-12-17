import React from 'react';
import styles from '../styles/City.module.css';

export default function City(props) {
	const data = props.data;
	let deg = data.wind.deg;
	return (
		<li className={styles.main}>
			<div className={styles.header}>
				<div className={styles.upperLeft}>
					<div>{data.name}</div>
					<div>{data.country}</div>
				</div>
				<div className={styles.upperRight}>
					<img
						src={`http://openweathermap.org/img/wn/${data.weather.icon}@2x.png`}
						alt="icon"
						className={styles.weatherImg}
					/>
					<div>{Math.round(data.main.temp - 273)}</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<div>{`Humidity ${data.main.humidity}% | ${deg} | ${data.wind.speed}m/s`}</div>
			</div>
		</li>
	);
}
