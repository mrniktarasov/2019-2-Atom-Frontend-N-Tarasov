import React from 'react';
import { Groups } from './components/Groups/Groups';
import { Chat } from './components/Chat/Chat';
import { Profile } from './components/Profile/Profile';
import { AppContext } from './AppContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMounted: false,
			addNewGroup: false,
			addNewMessage: false,
			groupList: [],
			routes: [],
		};
		this.getGroups();
		this.newGroup = this.newGroup.bind(this);
	}
	componentWillUnmount() {
		this.setState({
			isMounted: false,
		});
	}

	componentDidMount() {
		window.scrollTo(0, document.body.scrollHeight);
		this.setState({
			isMounted: true,
		});
	}

	newGroup() {
		this.setState({
			addNewGroup: true,
		});
	}

	newMessage() {
		this.setState({
			addNewMessage: true,
		});
	}

	makeRoutes(groups) {
		let routes = [];
		if (groups.length > 0) {
			groups.map((oneGroup) => {
				const route = {
					key: oneGroup.chat_id,
				};
				routes.push(route);
				return 0;
			});
		}
		return routes;
	}

	getGroups() {
		const pollItems = () => {
			fetch(`https://127.0.0.1:8000/chats/get_chat_list/`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					if (this.state.isMounted) {
						const routes = this.makeRoutes(data.chats);
						this.setState({
							groupList: data.chats,
							routes: routes,
						});
					}
				})
				.catch((err) => console.log(err));
		};
		setInterval(() => pollItems(), 3000);
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
