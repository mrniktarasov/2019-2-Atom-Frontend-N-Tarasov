import React from 'react';
import styles from './GroupList.module.css';
import { GroupsPreview } from '../GroupsPreview/GroupsPreview';
import { AppContext } from '../../../AppContext';

export function GroupList(props) {
	return (
		<AppContext.Consumer>
			{(value) => {
				const elems = elemsFromGroupList(value);
				return <ul className={styles.groups}>{elems}</ul>;
			}}
		</AppContext.Consumer>
	);
}

function elemsFromGroupList(value) {
	const groups = value.state.groupList;
	let elems = null;
	if (!Object.is(groups, null)) {
		elems = value.state.groupList.map((currentGroup) => {
			debugger;
			return addGroup(currentGroup);
		});
	}
	return elems;
}

function addGroup(currentGroup) {
	return (
		<li key={currentGroup.key}>
			<GroupsPreview
				sender={currentGroup.sender}
				lastMessage={currentGroup.lastMessage}
				lastMessageTime={currentGroup.lastMessageTime}
				keyGroup={currentGroup.key}
				messages={currentGroup.messages}
			/>
		</li>
	);
}
