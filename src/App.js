import React from 'react';
import { Groups } from './components/Groups/Groups';
import { Chat } from './components/Chat/Chat';
import { Profile } from './components/Profile/Profile';
import { AppContext } from './AppContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
		debugger;
		const info = this.getInfo();
		/*	if (info.groupList === null) {
			const commonChat = this.createCommonChat();
			info.groupList = [];
			info.groupList.push(commonChat);
		}*/
		const routes = this.makeRoutes(info.groupList);
		this.state = {
			addNewGroup: false,
			addNewMessage: false,
			IDgroups: info.IDgroups,
			groupList: info.groupList,
			messagesEnd: null,
			routes,
		};
		this.newGroup = this.newGroup.bind(this);
	}

	makeRoutes(groupList) {
		let routes = [];
		if (!Object.is(groupList, null)) {
			groupList.map((oneGroup) => {
				const route = {
					key: oneGroup.key,
				};
				routes.push(route);
				return 0;
			});
		}
		return routes;
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

	/*createCommonChat() {
		let sender;
		/* const keyDB = '28';
		let sender;
		const response = fetch(`https://127.0.0.1:8000/chats/chat/${keyDB}/`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		}).then( function(response){
			debugger;
			return response.json();
		}).then( function(data){
				console.log(data)
				sender = data.topic;
				const date = data.;
				const key = keyDB;
				const group = {
					key,
					date,
					sender,
					messages: null,
					lastMessage: 'Сообщений пока нет',
					lastMessageTime: [date.getHours(), date.getMinutes()]
						.map((x) => (x < 10 ? `0${x}` : x))
						.join(':'),
				};
				return group
		  }).catch ( err => console.log(err)) 

		sender = 'Common chat'//data.topic;
		const date = new Date();
		const key = '1';
		const group = {
			key,
			date,
			sender,
			messages: null,
			lastMessage: 'Сообщений пока нет',
			lastMessageTime: [date.getHours(), date.getMinutes()]
				.map((x) => (x < 10 ? `0${x}` : x))
				.join(':'),
		};
		const data = new FormData();
		data.append('topic', sender);
		fetch(`https://127.0.0.1:8000/chats/create_personal_chat/`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: data,
		}).then(
			response => {
				console.log('Common chat has been created')
			}
		).catch( error => console.log(error))
		return group; 
	} */

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
				<Router>
					<Switch>
						{this.state.routes.map((route) => (
							<Route path={`/chat/${route.key}`} key={route.key}>
								<Chat keyChat={route.key} />
							</Route>
						))}
						{this.state.routes.map((route) => (
							<Route path={`/profile/${route.key}`} key={route.key}>
								<Profile keyProfile={route.key} />
							</Route>
						))}
						<Route path="/">
							<Groups />
						</Route>
					</Switch>
				</Router>
			</AppContext.Provider>
		);
	}
}

export default App;
