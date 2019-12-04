import React from 'react';
import styles from './Message.module.css';

export function Message(props) {
	const data = props;
	let elem;
	if (data.type === 'text') {
		elem = <p className={styles.mesText}>{data.text}</p>;
	} else if (data.type === 'ref') {
		elem = (
			<a className={styles.ref} href={data.text}>
				{data.text}
			</a>
		);
	} else if (data.type === 'image') {
		elem = (
			<img
				className={styles.img}
				src={data.text}
				alt="IMG"
				onLoad={() => {
					window.URL.revokeObjectURL(data.text);
				}}
			/>
		);
	} else if (data.type === 'audio') {
		elem = (
			<audio
				controls
				src={data.text}
				onLoad={() => {
					window.URL.revokeObjectURL(data.text);
				}}
			/>
		);
	} else {
		console.log('Wrong message type');
	}
	return (
		<div className={styles.mesBox}>
			<span className={styles.mesAuthor} style={{ display: 'none' }}>
				{data.sender}
			</span>
			{elem}
			<span className={styles.mesDate}>{data.time}</span>
		</div>
	);
}
