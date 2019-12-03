import React from 'react';
import styles from './FormInput.module.css';
import { AppContext } from '../../../AppContext';
import { PaperClip } from './PaperClip/PaperClip';
import { Microphone } from './Microphone/Microphone';

export function FormInput(props) {
	let group = props.group;
	const setMenuVis = props.setMenuVis;
	const menuVis = props.menuVis;

	function handleKeyPress(event) {
		if (event.charCode === 13) {
			event.preventDefault();
			const separator = '!@#';
			const type = 'text';
			const author = 'you';
			const text = event.target.value;
			const currentDate = new Date();
			const mesKey = currentDate.getTime();
			const currentTime = [currentDate.getHours(), currentDate.getMinutes()]
				.map((x) => (x < 10 ? `0${x}` : x))
				.join(':');
			try {
				group.messages.push(
					`${mesKey}${separator}${currentTime}${separator}${author}${separator}${text}${separator}${type}`,
				);
			} catch {
				group.messages = [];
				group.messages.push(
					`${mesKey}${separator}${currentTime}${separator}${author}${separator}${text}${separator}${type}`,
				);
			}
			group.lastMessageTime = currentTime;
			group.lastMessage = text;
			if (group.key === '1') {
				fetch(`https://127.0.0.1:8000/chats/chat/${group.key}/add_message`, {
					method: 'POST',
					headers: {
						cors: 'no-cors',
					},
					body: {
						content: text,
					},
				});
			} else {
				localStorage.setItem(
					this.state.IDgroups,
					JSON.stringify(this.state.groupList),
				);
			}
			event.target.value = '';
			this.newMessage();
			return 0;
		}
	}

	return (
		<AppContext.Consumer>
			{(value) => {
				return (
					<div className={styles.dropMenuAndInputWrap}>
						<PaperClip setMenuVis={setMenuVis} menuVis={menuVis} />
						<input
							className={styles.inputChat}
							type="text"
							name="message-text"
							placeholder="Введите сообщение"
							onKeyPress={handleKeyPress.bind(value)}
						/>
						<Microphone group={group} value={value} />
					</div>
				);
			}}
		</AppContext.Consumer>
	);
}
