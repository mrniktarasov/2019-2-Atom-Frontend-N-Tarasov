import React from 'react';
import { Groups } from './components/Groups/Groups';
import Chat from './components/Chat/Chat';
import { Profile } from './components/Profile/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChats } from './actions';

function App(props) {
	props.getChats();
	const routes = props.routes;

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
	};
};

export default connect(mapStateToProps, { getChats })(App);
