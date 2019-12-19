import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/CityProfile.module.css';
import { API_URL, KEY } from '../constants/ActionTypes';

export default function CityProfile(props) {
	const { data } = props;
	const [tomorroyData, setTomorroyData] = React.useState(null);
	React.useEffect(() => {
		getFutureInformation(setTomorroyData, data.name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (tomorroyData !== null) {
		return (
			<div className={styles.mainBox}>
				<Link to="/" style={{ textDecoration: 'none' }}>
					<img
						src="https://cdn4.iconfinder.com/data/icons/controls-add-on-flat/48/Contols_-_Add_On-29-512.png"
						alt="backButton"
						className={styles.backButton}
					/>
				</Link>
				<div className={styles.headerWrap}>
					<div className={styles.header}>{data.name}</div>
					<div className={styles.tempWrap}>
						<div className={styles.temperature}>
							{`${Math.round(data.main.temp - 273)}℃`}
						</div>
					</div>
				</div>
				<div className={styles.futureWrap}>
					<div className={styles.weatherBox}>
						<div className={styles.leftWrap}>
							<div className={styles.text}>
								{`Today: ${tomorroyData.list[0].weather[0].main}`}
							</div>
							<img
								src={`http://openweathermap.org/img/wn/${tomorroyData.list[0].weather[0].icon}@2x.png`}
								alt="icon"
								className={styles.icon}
							/>
						</div>
						<div>
							{`${KtoC(tomorroyData.list[0].main.temp)}℃ / ${KtoC(
								tomorroyData.list[3].main.temp,
							)} ℃`}
						</div>
					</div>
					<div className={styles.weatherBox}>
						<div className={styles.leftWrap}>
							<div>{`Tomorroy: ${tomorroyData.list[0].weather[0].main}`}</div>
							<img
								src={`http://openweathermap.org/img/wn/${tomorroyData.list[8].weather[0].icon}@2x.png`}
								alt="icon"
								className={styles.icon}
							/>
						</div>
						<div>
							{`${KtoC(tomorroyData.list[8].main.temp)}℃ / ${KtoC(
								tomorroyData.list[11].main.temp,
							)} ℃`}
						</div>
					</div>
					<div className={styles.weatherBox}>
						<div className={styles.leftWrap}>
							<div>
								{`${partOfWeek(tomorroyData.list[16].dt_txt)}: ${
									tomorroyData.list[0].weather[0].main
								}`}
							</div>
							<img
								src={`http://openweathermap.org/img/wn/${tomorroyData.list[16].weather[0].icon}@2x.png`}
								alt="icon"
								className={styles.icon}
							/>
						</div>
						<div>
							{`${KtoC(tomorroyData.list[16].main.temp)}℃ / ${KtoC(
								tomorroyData.list[19].main.temp,
							)} ℃`}
						</div>
					</div>
				</div>
			</div>
		);
	}
	return null;
}

function partOfWeek(date) {
	const currentDate = new Date(date);
	let codeMonth;
	if (currentDate.getMonth() === 0 || currentDate.getMonth() === 9) {
		codeMonth = 1;
	} else if (currentDate.getMonth() === 4) {
		codeMonth = 2;
	} else if (currentDate.getMonth() === 7) {
		codeMonth = 3;
	} else if (
		currentDate.getMonth() === 1 ||
		currentDate.getMonth() === 2 ||
		currentDate.getMonth() === 10
	) {
		codeMonth = 4;
	} else if (currentDate.getMonth() === 5) {
		codeMonth = 5;
	} else if (currentDate.getMonth() === 11 || currentDate.getMonth() === 9) {
		codeMonth = 6;
	} else if (currentDate.getMonth() === 3 || currentDate.getMonth() === 6) {
		codeMonth = 0;
	}

	const year = currentDate.getFullYear();
	const yearArr = String(year);
	const yearCode =
		(6 +
			Number(yearArr[2] + yearArr[3]) +
			Number(yearArr[2] + yearArr[3]) / 4) %
		7;
	let day;
	const currentDay = currentDate.getDay();
	switch (currentDay) {
		case 0:
			day = 2;
			break;
		case 1:
			day = 3;
			break;
		case 2:
			day = 4;
			break;
		case 3:
			day = 5;
			break;
		case 4:
			day = 6;
			break;
		case 5:
			day = 0;
			break;
		case 6:
			day = 1;
			break;
		default:
			day = 0;
	}
	const dayNum = (day + codeMonth + yearCode) % 7;
	let dayTxt;
	switch (dayNum) {
		case 0:
			dayTxt = 'Sa';
			break;
		case 1:
			dayTxt = 'Su';
			break;
		case 2:
			dayTxt = 'Mo';
			break;
		case 3:
			dayTxt = 'Tu';
			break;
		case 4:
			dayTxt = 'We';
			break;
		case 5:
			dayTxt = 'Th';
			break;
		case 6:
			dayTxt = 'Fr';
			break;
		default:
			dayTxt = 'Sa';
	}
	return dayTxt;
}

async function getFutureInformation(setTomorroyData, name) {
	fetch(`${API_URL}/data/2.5/forecast?q=${name}&appid=${KEY}`)
		.then((response) => response.json())
		.then((data) => {
			setTomorroyData(data);
		});
}

function KtoC(temp) {
	return Math.round(temp - 273);
}
