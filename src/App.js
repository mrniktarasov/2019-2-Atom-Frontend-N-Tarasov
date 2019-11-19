import React from 'react';
import { Groups } from './components/Groups/Groups';
import { Chat } from './components/Chat/Chat';
import { Profile } from './components/Profile/Profile';
import { AppContext } from './AppContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
		const info = this.getInfo();
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
		groupList.map((oneGroup) => {
			const route = {
				key: oneGroup.key,
			};
			routes.push(route);
			return 0;
		});
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
