import React from 'react';
import styles from './Groups.module.css';
import { GroupsHeader } from './GroupsHeader/GroupsHeader';
import { GroupList } from './GroupList/GroupList';
import { AddGroup } from './AddGroup/AddGroup';
import { AppContext } from '../../AppContext';

export function Groups(props) {
	return (
		<AppContext.Consumer>
			{(value) => {
				return (
					<div className={styles.groupsPanel}>
						<GroupsHeader />
						<GroupList />
						<AddGroup />
					</div>
				);
			}}
		</AppContext.Consumer>
	);
}
