import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/AddCity.module.css';
import { getCity } from '../actions';

function AddCity(props) {
	const { getCity } = props;
	return (
		<div>
			<img
				src="https://image.flaticon.com/icons/png/512/1828/1828817.png"
				alt="add button"
				className={styles.addButton}
				onClick={handleClick.bind(getCity)}
			/>
		</div>
	);
}

function handleClick() {
	const cityName = prompt('Введите имя чата: ');
	if (Object.is(cityName, null) || Object.is(cityName, '')) {
		return 1;
	}
	this(cityName, 'name');
}

const mapStateToProps = function(state) {
	return {
		data: state.cities.cities,
	};
};

export default connect(mapStateToProps, { getCity })(AddCity);
