import React from 'react';
import styles from '../styles/AddCity.module.css';

export default function AddCity(props) {
	return (
		<div>
			<img
				src="https://image.flaticon.com/icons/png/512/1828/1828817.png"
				alt="add button"
				className={styles.addButton}
			/>
		</div>
	);
}
