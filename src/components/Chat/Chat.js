import React, { useState } from 'react';
import './Chat.module.css';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { FormInput } from './FormInput/FormInput';
import { AppContext } from '../../AppContext';
import { MessageField } from './MessageField/MessageField';

export function Chat(props) {
	return (
		<AppContext.Consumer>
			{(value) => {
				const group = getCurrentGroup(
					value.state.groupList,
					value.state.openedChat,
				);
				let style = { display: 'none' };
				if (value.state.visibility === 'chat') {
					style = { display: 'block' };
				}
				return (
					<div style={style}>
						<form>
							<ChatHeader group={group} />
							<MessageField group={group} />
							<FormInput group={group} />
						</form>
					</div>
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
