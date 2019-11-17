import React from 'react';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import avatarDownload from '../../static/images/avatarDownload.png';
import styles from './Profile.module.css';

export function Profile(props) {
	const keyProfile = props.keyProfile;
	return (
		<div className={styles.profileWrap}>
			<ProfileHeader keyProfile={keyProfile} />
			<div className={styles.putAvatarWrap}>
				<img
					className={styles.putAvatar}
					alt="avatar download"
					src={avatarDownload}
				/>
			</div>
			<input className={styles.inputContainer} placeholder="Full name" />
			<input className={styles.inputContainer} placeholder="Username" />
			<div className={styles.rules}>Minimum lenght is 5 characters</div>
			<input className={styles.inputContainer} placeholder="Bio" />
			<div className={styles.rules}>Any details about you</div>
		</div>
	);
}
