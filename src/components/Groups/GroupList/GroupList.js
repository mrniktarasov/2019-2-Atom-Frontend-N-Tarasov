import React from 'react';
import styles from './GroupList.module.css';
import { GroupsPreview } from '../GroupsPreview/GroupsPreview';
import { connect } from 'react-redux';

function GroupList(props) {
	const groups = props.chats;
	let elems = null;
	if (groups && groups.length > 0) {
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
}

function getTime(date) {
	let currentTime = null;
	if (date) {
		const currentDate = new Date(date);
		currentTime = [currentDate.getHours(), currentDate.getMinutes()]
			.map((x) => (x < 10 ? `0${x}` : x))
			.join(':');
	}
	return currentTime;
}

const mapStateToProps = function(state) {
	return {
		chats: state.chats.chats,
	};
};

export default connect(mapStateToProps)(GroupList);
