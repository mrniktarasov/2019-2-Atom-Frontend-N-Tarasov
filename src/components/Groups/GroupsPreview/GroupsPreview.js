import React from 'react';
import styles from './GroupsPreview.module.css';
import { Link } from 'react-router-dom';

export function GroupsPreview(props) {
	const data = props;
	const pathGroup = `/chat/${data.keyGroup}`;
	return (
		<Link to={pathGroup} style={{ textDecoration: 'none' }}>
			<div className={styles.preview}>
				<div className={styles.leftSideWrap}>
					<div className={styles.avatar} />
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
		</Link>
	);
}
