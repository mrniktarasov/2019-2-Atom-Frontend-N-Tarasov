import React from 'react';
import styles from './Groups.module.css';
import { GroupsHeader } from './GroupsHeader/GroupsHeader';
import GroupList from './GroupList/GroupList';
import { AddGroup } from './AddGroup/AddGroup';

export function Groups(props) {
	return (
		<div className={styles.groupsPanel}>
			<GroupsHeader />
			<GroupList />
			<AddGroup />
		</div>
	);
}
