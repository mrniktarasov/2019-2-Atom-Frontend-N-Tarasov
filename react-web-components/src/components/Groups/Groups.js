import React from 'react';
import styles from './Groups.module.css'
import {GroupsHeader} from './GroupsHeader/GroupsHeader';
import {GroupList} from './GroupList/GroupList';
import {AddGroup} from './AddGroup/AddGroup';
import { AppContext } from '../../AppContext';

export function Groups (props) {
    return (
        <AppContext.Consumer>
        {
            (value) => {

                let styleV = {display: 'block'};
                if (value.state.visibility === 'chat') {
                    styleV = {display: 'none'}
                }
                return (
                    <div style={styleV}>
                        <div className={styles.groupsPanel}>
                            <GroupsHeader/>
                            <GroupList/>
                            <AddGroup/>
                        </div>
                    </div>
                );
            }
        }
        </AppContext.Consumer>
    );
}
