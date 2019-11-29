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
	const sender = prompt('Введите имя чата: ');
	if (Object.is(sender, null) || Object.is(sender, '')) {
		return 1;
	}
	const date = new Date();
	const key = date.getTime();
	const group = {
		key,
		date,
		sender,
		messages: null,
		lastMessage: 'Сообщений пока нет',
		lastMessageTime: [date.getHours(), date.getMinutes()]
			.map((x) => (x < 10 ? `0${x}` : x))
			.join(':'),
	};
	try {
		value.state.groupList.push(group);
	} catch {
		const groups = [];
		value.state.groupList = groups;
		value.state.groupList.push(group);
	}
	localStorage.setItem(
		value.state.IDgroups,
		JSON.stringify(value.state.groupList),
	);
	const route = {
		key,
	};
	value.state.routes.push(route);
	value.newGroup();
	return 0;
}
