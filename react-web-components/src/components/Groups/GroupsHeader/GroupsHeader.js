import React from 'react'
import styles from './GroupsHeader.module.css'
import hamburger from '../../../static/images/hamburgerButton.png'
import searchButton from '../../../static/images/searchButton.png'

export function GroupsHeader (props) {
    return (
        <div className={styles.groupsHeader}>
            <div className={styles.mesAndBurgWrap}>
                <img className={styles.hamburger} src={hamburger} alt="hamburger button"/>
                <p className={styles.messeger}>Messenger</p>
            </div>
            <div className={styles.searchWrap}>
                <img className={styles.searchButton} src={searchButton} alt="search button"/>
            </div> 
        </div>
    )
}