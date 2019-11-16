import React from 'react';
import styles from './MessageField.module.css';
import { Message } from '../Message/Message';
import { AppContext } from '../../../AppContext';

export function MessageField(props) {
	const group = props.group;
	const messages = getMessages(group);
	return (
		<AppContext>
			{(value) => (
				<div>
					<ul className={styles.result}>{messages}</ul>
				</div>
			)}
		</AppContext>
	);
}

function getMessages(group) {
	const separator = '!@#';
	let messages;
	try {
		messages = group.messages;
	} catch {
		messages = null;
	}
	let elems = null;
	if (messages !== null) {
		elems = messages.map((oneMessage) => {
			const data = oneMessage.split(separator);
			return (
				<li key={data[0]}>
					<Message
						id={data[0]}
						time={data[1]}
						sender={data[2]}
						text={data[3]}
					/>
				</li>
			);
		});
	}
	return elems;
}
