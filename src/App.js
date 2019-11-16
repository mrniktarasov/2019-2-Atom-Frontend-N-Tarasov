import React from 'react';
import { Groups } from './components/Groups/Groups';
import { Chat } from './components/Chat/Chat';
import { AppContext } from './AppContext';

class App extends React.Component {
	constructor(props) {
		super(props);
		const info = this.getInfo();
		this.state = {
			addNewGroup: false,
			addNewMessage: false,
			visibility: 'group',
			IDgroups: info.IDgroups,
			groupList: info.groupList,
			messagesEnd: null,
		};

		this.newGroup = this.newGroup.bind(this);
		this.openChat = this.openChat.bind(this);
		this.closeChat = this.closeChat.bind(this);
	}

	componentDidUpdate() {
		window.scrollTo(0, document.body.scrollHeight);
	}

	getInfo() {
		let info = null;
		const IDgroups = 'IDgroups';
		try {
			info = {
				groupList: JSON.parse(localStorage.getItem(IDgroups)),
				IDgroups,
			};
		} catch {
			info = {
				groupList: null,
				IDgroups,
			};
		}
		return info;
	}

	openChat(key) {
		this.setState({
			openedChat: key,
			visibility: 'chat',
		});
	}

	closeChat() {
		this.setState({
			openedChat: null,
			visibility: 'group',
		});
	}

	newGroup() {
		this.setState({
			addNewGroup: true,
		});
	}

	newMessage(el) {
		this.setState({
			addNewMessage: true,
			messagesEnd: el,
		});
	}

	render() {
		return (
			<AppContext.Provider value={this}>
				<Groups />
				<Chat />
			</AppContext.Provider>
		);
	}
}

export default App;
