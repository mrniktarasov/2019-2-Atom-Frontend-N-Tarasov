import React from 'react';
import styles from './FormInput.module.css';
import { PaperClip } from './PaperClip/PaperClip';
import { Microphone } from './Microphone/Microphone';
import { API_URL } from '../../../constants/Constants';

export function FormInput(props) {
	let group = props.group;
	const setMenuVis = props.setMenuVis;
	const menuVis = props.menuVis;

	function handleKeyPress(event) {
		if (event.charCode === 13) {
			event.preventDefault();
			const text = event.target.value;
			const data = new FormData();
			data.append('content', text);
			fetch(`${API_URL}/chats/chat/${group.chat_id}/add_message/`, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: data,
			})
				.then((response) => {
					console.log('Message has been added');
				})
				.catch((error) => console.log(error));
			event.target.value = '';
			return 0;
		}
	}

	return (
		<div className={styles.dropMenuAndInputWrap}>
			<PaperClip setMenuVis={setMenuVis} menuVis={menuVis} />
			<input
				className={styles.inputChat}
				type="text"
				name="message-text"
				placeholder="Введите сообщение"
				onKeyPress={handleKeyPress}
			/>
			<Microphone group={group} />
		</div>
	);
}
