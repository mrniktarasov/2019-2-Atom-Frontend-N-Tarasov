import React from 'react';
import { AppContext } from '../../../AppContext';
import styles from './AddGroup.module.css';

export function AddGroup(props) {
	return (
		<AppContext.Consumer>
			{(value) => (
				<svg
					className={styles.addGroup}
					viewBox="0 0 180 180"
					onClick={() => {
						clickedOnAddGroup(value);
					}}
				/>
			)}
		</AppContext.Consumer>
	);
}

function clickedOnAddGroup(value) {
	const topic = prompt('Введите имя чата: ');
	if (Object.is(sender, null) || Object.is(sender, '')) {
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
			console.log('Message has been added');
		})
		.catch((error) => console.log(error));
	return 0;
}
