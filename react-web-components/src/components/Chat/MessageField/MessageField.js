import React from 'react'
import styles from './MessageField.module.css'
import { AppContext } from '../../../AppContext'
import {Message} from '../Message/Message'

export function MessageField(props) {
    const group = props.group;
    return (
        <AppContext.Consumer>
        {
            (value) => {
                const messages = getMessages(group);
                return (
                    <ul className={styles.result}>
                        {messages}
                    </ul>
                );
            }
        }
        </AppContext.Consumer>
    );
}

function getMessages(group) {
    const separator = '!@#';
    let messages;
    try {
        messages = group.messages
    } catch {
        messages = null;
    }
    let elems = null;
     if (messages !== null) {
        elems = messages.map(
            (oneMessage) => {
                const data = oneMessage.split(separator);
                return (
                    <Message id = {data[0]}
                             time={data[1]}
                             sender={data[2]}
                             text={data[3]}/>
                );
            }
        );
    }
    return elems;
}
