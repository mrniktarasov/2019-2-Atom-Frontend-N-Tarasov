import React from 'react';
import styles from './Chat.module.css';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { FormInput } from './FormInput/FormInput';
import { AppContext } from '../../AppContext';
import { MessageField } from './MessageField/MessageField';

export function Chat(props) {
	const keyChat = props.keyChat;
	return (
		<AppContext.Consumer>
			{(value) => {
				const group = getCurrentGroup(value.state.groupList, keyChat);
				return (
					<form className={styles.chat}>
						<ChatHeader group={group} />
						<MessageField group={group} />
						<FormInput group={group} />
					</form>
				);
			}}
		</AppContext.Consumer>
	);
}

function getCurrentGroup(groupList, key) {
	let currentGroup = null;
	if (groupList !== null) {
		for (let i = 0; i < groupList.length; i += 1) {
			if (groupList[i].key === key) {
				currentGroup = groupList[i];
				return currentGroup;
			}
		}
	}
	return currentGroup;
}
