import React, { useState } from 'react';
import styles from './Microphone.module.css';
import microphone from '../../../../static/images/microphone.svg';
import pause from '../../../../static/images/pause.svg';

export function Microphone(props) {
	const group = props.group;
	const value = props.value;
	let mediaRecorder = null;
	let [isPlaying, setIsPlaying] = useState(false);

	if (isPlaying) {
		let chuncks = [];
		const constrains = { audio: true };
		navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
			mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.addEventListener('stop', (event) => {
				const blob = new Blob(chuncks, { type: mediaRecorder.mimeType });
				chuncks = [];
				handleBlob(blob);
				const audioURL = URL.createObjectURL(blob);
				addMessage(audioURL);
			});
			mediaRecorder.addEventListener('dataavailable', (event) => {
				chuncks.push(event.data);
			});
			if (mediaRecorder !== null) {
				mediaRecorder.start();
			}
		});
	}

	function addMessage(audioURL) {
		const separator = '!@#';
		const type = 'audio';
		const author = 'you';
		const currentDate = new Date();
		const mesKey = currentDate.getTime();
		const currentTime = [currentDate.getHours(), currentDate.getMinutes()]
			.map((x) => (x < 10 ? `0${x}` : x))
			.join(':');
		const currentMessage = `${mesKey}${separator}${currentTime}${separator}${author}${separator}${audioURL}${separator}${type}`;
		try {
			group.messages.push(currentMessage);
		} catch {
			group.messages = [];
			group.messages.push(currentMessage);
		}
		group.lastMessageTime = currentTime;
		group.lastMessage = 'Audio';
		localStorage.setItem(
			value.state.IDgroups,
			JSON.stringify(value.state.groupList),
		);
		value.newMessage();
		return 0;
	}

	function handleBlob(blob) {
		const data = new FormData();
		data.append('audio', blob);
		data.append('user', 'Nikita Tarasov');
		fetch('https://tt-front.now.sh/upload', {
			method: 'POST',
			mode: 'no-cors',
			body: data,
		});
	}

	function handleMicroClick(event) {
		if (!isPlaying) {
			event.target.src = pause;
			setIsPlaying(true);
		} else {
			event.target.src = microphone;
			if (mediaRecorder !== null) {
				mediaRecorder.stop();
			}
			setIsPlaying(false);
		}
	}

	return (
		<div>
			<img
				alt="microphone"
				src={microphone}
				className={styles.microphone}
				onClick={handleMicroClick}
			/>
		</div>
	);
}
