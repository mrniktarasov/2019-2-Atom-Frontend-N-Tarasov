import React, { useState } from 'react';
import styles from './GroupList.module.css';
import { GroupsPreview } from '../GroupsPreview/GroupsPreview';
import { AppContext } from '../../../AppContext';

export function GroupList(props) {
	return (
		<AppContext.Consumer>
			{(value) => {
				const groups = value.state.groupList;
				let elems = null;
				if (groups.length > 0) {
					elems = groups.map((currentGroup) => {
						return (
							<li key={currentGroup.chat_id}>
								<GroupsPreview
									sender={currentGroup.topic}
									lastMessage={currentGroup.last_message}
									lastMessageTime={getTime(currentGroup.last_message_date)}
									keyGroup={currentGroup.chat_id}
								/>
							</li>
						);
					});
				}
				return <ul className={styles.groups}>{elems}</ul>;
			}}
		</AppContext.Consumer>
	);
}

function getTime(date) {
	const currentDate = new Date(date);
	const currentTime = [currentDate.getHours(), currentDate.getMinutes()]
		.map((x) => (x < 10 ? `0${x}` : x))
		.join(':');
	return currentTime;
}
