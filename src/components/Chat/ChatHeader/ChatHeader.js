import React from 'react';
import styles from './ChatHeader.module.css';
import { AppContext } from '../../../AppContext';
import avatar from '../../../static/images/avatar1.svg';
import threeDots from '../../../static/images/3dots.svg';
import backButton from '../../../static/images/backButton.png';

export function ChatHeader(props) {
	const group = props.group;
	return (
		<AppContext.Consumer>
			{(value) => (
				<div className={styles.header}>
					<div className={styles.backButtonWrap} onClick={value.closeChat}>
						<img
							className={styles.backButton}
							alt="Back Button"
							src={backButton}
						/>
					</div>
					<div className={styles.avatarAndSenderWrap}>
						<img className={styles.avatar} alt="Avatar" src={avatar} />
						<div className={styles.senderInfo}>
							<div className={styles.name}>
								{group === null ? null : group.sender}
							</div>
							<div className={styles.lastTime}>16:00</div>
						</div>
					</div>
					<div className={styles.threeDotsWrap}>
						<img
							className={styles.threeDots}
							alt="three dots"
							src={threeDots}
						/>
					</div>
				</div>
			)}
		</AppContext.Consumer>
	);
}
