import React from 'react';
import { AppContext } from '../../../../AppContext';
import styles from './DropMenu.module.css';
import placeholder from '../../../../static/images/placeholder.svg';
import paperClip from '../../../../static/images/PaperClip.ico';

export function DropMenu(props) {
	const visibility = props.visibility;
	const group = props.group;
	const pcref = React.createRef();
	const inputref = React.createRef();

	React.useEffect(() => {
		const im = pcref.current;
		im.addEventListener('click', handleClick.bind(inputref));
		debugger;
	}, [inputref, pcref]);

	function handleGeoClick() {
		const geoSuccess = (position) => {
			const separator = '!@#';
			const type = 'ref';
			const author = 'you';
			const currentDate = new Date();
			const mesKey = currentDate.getTime();
			const currentTime = [currentDate.getHours(), currentDate.getMinutes()]
				.map((x) => (x < 10 ? `0${x}` : x))
				.join(':');
			const text = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
			const currentMessage = `${mesKey}${separator}${currentTime}${separator}${author}${separator}${text}${separator}${type}`;
			try {
				group.messages.push(currentMessage);
			} catch {
				group.messages = [];
				group.messages.push(currentMessage);
			}
			group.lastMessageTime = currentTime;
			group.lastMessage = text;
			localStorage.setItem(
				this.state.IDgroups,
				JSON.stringify(this.state.groupList),
			);
			this.newMessage();
			return 0;
		};

		const geoError = (error) => {
			console.log(error.message);
		};

		const geoOptions = {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 27000,
		};

		navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
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

	function handleFile(image) {
		const data = new FormData();
		data.append('image', image);
		data.append('user', 'Nikita Tarasov');
		fetch('https://tt-front.now.sh/upload', {
			method: 'POST',
			body: data,
		});
	}

	function handleFileChange(event) {
		debugger;
		const files = event.target.files;
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

	return (
		<AppContext.Consumer>
			{(value) => {
				return (
					<div style={visibility ? { display: 'block' } : { display: 'none' }}>
						<div className={styles.box}>
							<img
								alt="placeholder"
								src={placeholder}
								className={styles.dropOption}
								onClick={handleGeoClick.bind(value)}
							/>
							<img
								alt="PaperClip"
								src={paperClip}
								className={styles.dropOption}
								ref={pcref}
							/>
							<input
								type="file"
								multiple
								accept="image/*"
								style={{ display: 'none' }}
								ref={inputref}
								onChange={handleFileChange.bind(value)}
							></input>
						</div>
					</div>
				);
			}}
		</AppContext.Consumer>
	);
}

function handleClick(event) {
	if (this.current) {
		this.current.click();
	}
	event.preventDefault();
}
