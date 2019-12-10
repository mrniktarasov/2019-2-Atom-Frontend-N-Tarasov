import React from 'react';
import styles from './AddGroup.module.css';

export function AddGroup(props) {
	return (
		<svg
			className={styles.addGroup}
			viewBox="0 0 180 180"
			onClick={clickedOnAddGroup}
		/>
	);
}

function clickedOnAddGroup() {
	debugger;
	const topic = prompt('Введите имя чата: ');
	if (Object.is(topic, null) || Object.is(topic, '')) {
		return 1;
	}
	const data = new FormData();
	data.append('topic', topic);
	fetch(`https://127.0.0.1:8000/chats/create_personal_chat/`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		body: data,
	})
		.then((response) => {
			console.log('Chat has been added');
		})
		.catch((error) => console.log(error));
	return 0;
}
