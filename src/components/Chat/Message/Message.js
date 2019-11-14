import React from 'react';
import styles from './Message.module.css';

export function Message(props) {
	const data = props;
	return (
		<div className={styles.mesBox}>
			<span className={styles.mesAuthor} style={{ display: 'none' }}>
				{data.sender}
			</span>
			<p className={styles.mesText}>{data.text}</p>
			<span className={styles.mesDate}>{data.time}</span>
		</div>
	);
}
