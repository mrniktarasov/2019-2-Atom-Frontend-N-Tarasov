import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/City.module.css';

function City(props) {
	const { data, isGeopos } = props;
	const { deg } = data.wind || '';
	return (
		<div className={styles.main}>
			<div className={styles.header}>
				<div className={styles.upperLeft}>
					<div className={styles.nameAndGeoWrap}>
						<div>{data.name || ''}</div>
						{isGeopos ? (
							<img
								src="https://image.flaticon.com/icons/png/512/117/117967.png"
								alt="geopos"
								className={styles.geoIcon}
							/>
						) : null}
					</div>
					<div>{data.country || ''}</div>
				</div>
				<div className={styles.upperRight}>
					<img
						src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
						alt="icon"
						className={styles.weatherImg}
					/>
					<div>{`${KtoC(data.main.temp)}℃`}</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<div>
					{`Humidity ${data.main.humidity || ''}% | ${getCardinalDirection(
						deg,
					)} | ${data.wind.speed || ''}m/s`}
				</div>
			</div>
		</div>
	);
}

function KtoC(temp) {
	if (Object.is(temp, undefined)) {
		return '';
	}
	return Math.round(temp - 273);
}

function getCardinalDirection(deg) {
	if (Object.is(deg, undefined)) {
		return '';
	}
	let CD;
	// eslint-disable-next-line no-mixed-operators
	if ((deg > 250 && deg < 360) || (deg > 0 && deg <= 45)) {
		CD = 'North';
	} else if (deg > 45 && deg <= 135) {
		CD = 'West';
	} else if (deg > 135 && deg <= 180) {
		CD = 'South';
	} else if (deg > 180 && deg <= 270) {
		CD = 'East';
	}
	return CD;
}

const mapStateToProps = function(state) {
	return {
		geopos: state.cities.geopos,
	};
};

export default connect(mapStateToProps)(City);
