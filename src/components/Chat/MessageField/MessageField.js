import React from 'react';
import styles from './MessageField.module.css';
import { Message } from '../Message/Message';
import { DropMenu } from './DropMenu/DropMenu';
import { connect } from 'react-redux';
import { getMessages } from '../../../actions';

function MessageField(props) {
	props.getMessages(props.keyChat);
	const { messages, group } = props;
	const menuVis = props.menuVis;

	/* function handleDrop(event) {
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
	} */

	/* const preventAndStop = (event) => {
		event.preventDefault();
		event.stopPropagation();
	}; */

	let elems = null;
	if (messages && messages.length > 0) {
		group.lastMessage = messages[0].content;
		group.lastMessageTime = getTime(messages[0].date);
		elems = messages.map((oneMessage) => {
			return (
				<li key={oneMessage.id}>
					<Message
						id={oneMessage.id}
						time={getTime(oneMessage.date)}
						sender={'you'}
						text={oneMessage.content}
						type={'text'}
					/>
				</li>
			);
		});
	}
	return (
		<div
		//onDragEnter={preventAndStop}
		//onDragOver={preventAndStop}
		//onDrop={handleDrop.bind(value)}
		>
			<ul className={styles.result}>{elems}</ul>
			<DropMenu visibility={menuVis} group={group} />
		</div>
	);
}

function getTime(date) {
	const currentDate = new Date(date);
	const currentTime = [currentDate.getHours(), currentDate.getMinutes()]
		.map((x) => (x < 10 ? `0${x}` : x))
		.join(':');
	return currentTime;
}

const mapStateToProps = (state) => ({
	messages: state.messages.messages,
});

export default connect(mapStateToProps, { getMessages })(MessageField);
