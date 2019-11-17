import React from 'react';
import styles from './ProfileHeader.module.css';
import backButton from '../../../static/images/backButton.png';
import acceptTick from '../../../static/images/acceptTick.png';
import { Link } from 'react-router-dom';

export function ProfileHeader(props) {
	const keyProfile = props.keyProfile;
	return (
		<div className={styles.header}>
			<div className={styles.leftSideWrap}>
				<Link to={`/chat/${keyProfile}`} style={{ textDecoration: 'none' }}>
					<div className={styles.backButtonWrap}>
						<img
							className={styles.backButton}
							alt="Back button"
							src={backButton}
						/>
					</div>
				</Link>
				<div className={styles.text}>Edit profile</div>
			</div>
			<div className={styles.acceptTicksWrap}>
				<img className={styles.acceptTick} alt="assept" src={acceptTick} />
			</div>
		</div>
	);
}
