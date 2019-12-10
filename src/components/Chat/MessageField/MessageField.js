import React, { useEffect } from 'react';
import styles from './MessageField.module.css';
import { Message } from '../Message/Message';
import { DropMenu } from './DropMenu/DropMenu';
import { connect } from 'react-redux';
import { getMessages } from '../../../actions';

function MessageField(props) {
	const { messages, group, menuVis, getMessages, keyChat } = props;
	if (!messages.length > 0) {
		getMessages(keyChat);
	}

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});

	/* function handleDrop(event) {
		preventAndStop(event);
		const files = event.dataTransfer.files;
		const MB = 1024 * 1024 * 4;
		if (files.length < 3) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].type.startsWith('image/')) {
					if (files[i].size < MB) {
						handleFile(files[i]);
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
		data.append('image-_key', )
		fetch(`https://127.0.0.1:8000/media/chat/${group.chat_id}/upload_file/`, {
			method: 'POST',
			body: data,
		});
	}

	/* const preventAndStop = (event) => {
		event.preventDefault();
		event.stopPropagation();
	}; */

	let elems = null;
	if (messages && messages.length > 0) {
		group.lastMessage = messages[0].content;
		group.lastMessageTime = getTime(messages[0].date);
		elems = messages.map((oneMessage) => {
			let content = oneMessage.content;
			let type = 'text';
			if (oneMessage.content.startsWith('https://www.openstreetmap.org')) {
				type = 'ref';
			} else if ((oneMessage.content = 'Image')) {
				type = 'image';
				content = oneMessage.image;
			}
			return (
				<li key={oneMessage.id}>
					<Message
						id={oneMessage.id}
						time={getTime(oneMessage.date)}
						sender={'you'}
						text={content}
						type={type}
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
