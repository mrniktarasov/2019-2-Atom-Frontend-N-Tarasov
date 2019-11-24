import React from 'react';
import styles from './MessageField.module.css';
import { Message } from '../Message/Message';
import { DropMenu } from './DropMenu/DropMenu';
import { AppContext } from '../../../AppContext';

export function MessageField(props) {
	const group = props.group;
	const menuVis = props.menuVis;
	const messages = getMessages(group);

	function handleDrop(event) {
		preventAndStop(event);
		const files = event.dataTransfer.files;
		const MB = 1024 * 1024 * 4;
		if (files.length < 3) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].type.startsWith('image/')) {
					if (files[i].size < MB) {
						handleFile(files[i]);
						addFile(files[i], this, group);
					} else {
						console.log(`File ${i} is too big`);
					}
				} else {
					console.log(`Wrong type of the ${i} file`);
				}
			}
		} else {
			console.log('Too many files');
		}
	}

	function handleFile(image) {
		const data = new FormData();
		data.append('image', image);
		data.append('user', 'Nikita Tarasov');
		fetch('https://tt-front.now.sh/upload', {
			method: 'POST',
			body: data,
		});
	}

	function addFile(file, value, group) {
		const separator = '!@#';
		const type = 'image';
		const author = 'you';
		const objectURL = window.URL.createObjectURL(file);
		const currentDate = new Date();
		const mesKey = currentDate.getTime();
		const currentTime = [currentDate.getHours(), currentDate.getMinutes()]
			.map((x) => (x < 10 ? `0${x}` : x))
			.join(':');
		const currentMessage = `${mesKey}${separator}${currentTime}${separator}${author}${separator}${objectURL}${separator}${type}`;
		try {
			group.messages.push(currentMessage);
		} catch {
			group.messages = [];
			group.messages.push(currentMessage);
		}
		group.lastMessageTime = currentTime;
		group.lastMessage = 'Image';
		localStorage.setItem(
			value.state.IDgroups,
			JSON.stringify(value.state.groupList),
		);
		value.newMessage();
		return 0;
	}

	const preventAndStop = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};

	return (
		<AppContext.Consumer>
			{(value) => (
				<div
					onDragEnter={preventAndStop}
					onDragOver={preventAndStop}
					onDrop={handleDrop.bind(value)}
				>
					<ul className={styles.result}>{messages}</ul>
					<DropMenu visibility={menuVis} group={group} />
				</div>
			)}
		</AppContext.Consumer>
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
						type={data[4]}
					/>
				</li>
			);
		});
	}
	return elems;
}
