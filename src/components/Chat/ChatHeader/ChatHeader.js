import React from 'react';
import styles from './ChatHeader.module.css';
import avatar from '../../../static/images/avatar1.svg';
import threeDots from '../../../static/images/3dots.svg';
import backButton from '../../../static/images/backButton.png';
import { Link } from 'react-router-dom';

export function ChatHeader(props) {
	const group = props.group;
	return (
		<div className={styles.header}>
			<Link to="/">
				<div className={styles.backButtonWrap}>
					<img
						className={styles.backButton}
						alt="Back Button"
						src={backButton}
					/>
				</div>
			</Link>
			<div className={styles.avatarAndSenderWrap}>
				<Link to={`/profile/${group.chat_id}`}>
					<img className={styles.avatar} alt="Avatar" src={avatar} />
				</Link>
				<div className={styles.senderInfo}>
					<div className={styles.name}>
						{group === null ? null : group.topic}
					</div>
					<div className={styles.lastTime}>16:00</div>
				</div>
			</div>
			<div className={styles.threeDotsWrap}>
				<img className={styles.threeDots} alt="three dots" src={threeDots} />
			</div>
		</div>
	);
}
