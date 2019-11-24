import React from 'react';
import { AppContext } from '../../../../AppContext';
import styles from './DropMenu.module.css';
import placeholder from '../../../../static/images/placeholder.svg';
import paperClip from '../../../../static/images/PaperClip.ico';

export function DropMenu(props) {
	const visibility = props.visibility;
	const group = props.group;

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
							/>
						</div>
					</div>
				);
			}}
		</AppContext.Consumer>
	);
}
