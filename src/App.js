import React from 'react';
import { Groups } from './components/Groups/Groups';
import Chat from './components/Chat/Chat';
import { Profile } from './components/Profile/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChats } from './actions';
import { API_URL } from './constants/Constants';

function App(props) {
	const { getChats, routes, groups } = props;
	if (!groups.length > 0) {
		getChats();
	}
	return (
		<Router>
			<Switch>
				{routes.map((route) => (
					<Route path={`/chat/${route.key}`} key={route.key}>
						<Chat keyChat={route.key} />
					</Route>
				))}
				{routes.map((route) => (
					<Route path={`/profile/${route.key}`} key={route.key}>
						<Profile keyProfile={route.key} />
					</Route>
				))}
				<Route
					path="/login"
					component={() => {
						window.location.href = `${API_URL}/login`;
						return null;
					}}
				/>
				<Route
					path="/logout"
					component={() => {
						window.location.href = `${API_URL}/logout`;
						return null;
					}}
				/>
				<Route path="/">
					<Groups />
				</Route>
			</Switch>
		</Router>
	);
}

const mapStateToProps = function(state) {
	return {
		routes: state.routes.routes,
		groups: state.chats.chats,
	};
};

export default connect(mapStateToProps, { getChats })(App);
