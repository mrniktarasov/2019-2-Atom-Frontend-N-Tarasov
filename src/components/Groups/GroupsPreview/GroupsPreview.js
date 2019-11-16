import React from 'react';
import styles from './GroupsPreview.module.css';
import { AppContext } from '../../../AppContext';

export function GroupsPreview(props) {
	const data = props;
	return (
		<AppContext.Consumer>
			{(value) => (
				<div
					className={styles.preview}
					onClick={value.openChat.bind(value, data.keyGroup)}
				>
					<div className={styles.leftSideWrap}>
						<div className={styles.avatar}></div>
						<div className={styles.senderInfo}>
							<div className={styles.sender}>{data.sender}</div>
							<div className={styles.lastMessage}>{data.lastMessage}</div>
						</div>
					</div>
					<div className={styles.metaInfo}>
						<div className={styles.time}>{data.lastMessageTime}</div>
						<div className={styles.readed}></div>
					</div>
				</div>
			)}
		</AppContext.Consumer>
	);
}
