import React, { useState } from 'react';
import styles from './Chat.module.css';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { FormInput } from './FormInput/FormInput';
import MessageField from './MessageField/MessageField';
import { connect } from 'react-redux';

function Chat(props) {
	const { keyChat } = props;
	const groups = props.chats;
	const [menuVis, setMenuVis] = useState(false);
	const group = getCurrentGroup(groups, keyChat);

	return (
		<form className={styles.chat}>
			<ChatHeader group={group} />
			<MessageField group={group} menuVis={menuVis} keyChat={keyChat} />
			<FormInput group={group} setMenuVis={setMenuVis} menuVis={menuVis} />
		</form>
	);
}

function getCurrentGroup(groupList, key) {
	let currentGroup = null;
	if (groupList !== null) {
		for (let i = 0; i < groupList.length; i += 1) {
			if (groupList[i].chat_id === key) {
				currentGroup = groupList[i];
				return currentGroup;
			}
		}
	}
	return currentGroup;
}

const mapStateToProps = function(state) {
	return {
		chats: state.chats.chats,
	};
};

export default connect(mapStateToProps)(Chat);
