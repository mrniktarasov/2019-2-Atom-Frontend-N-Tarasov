import React, {useState} from 'react';
import './FormInput.module.css'
import { AppContext } from '../../../AppContext';

export function FormInput(props) {
    let group = props.group;

    function handleKeyPress(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            const separator = '!@#';
            const author = 'you';
            const text = event.target.value;
            const currentDate = new Date();
            const mesKey = currentDate.getTime();
            const currentTime = [currentDate.getHours(), currentDate.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
            try {
                group.messages.push(`${mesKey}${separator}${currentTime}${separator}${author}${separator}${text}`);
            } catch {
                group.messages =[];
                group.messages.push(`${mesKey}${separator}${currentTime}${separator}${author}${separator}${text}`);
            }
            group.lastMessageTime = currentTime;
            group.lastMessage = text;
            localStorage.setItem(this.state.IDgroups, JSON.stringify(this.state.groupList));
            event.target.value = '';
            this.newMessage();
            return 0;
        }
    }
    return (
        <AppContext.Consumer>
        {
            (value) => {
                return (
                    <input type="text" name="message-text"
                    placeholder="Введите сообщение"
                    onKeyPress={handleKeyPress.bind(value)}
                />
                );
            }
        }
        </AppContext.Consumer>
    );
}
