import { combineReducers } from 'redux';
import messages from './messages';
import chats from './chats';
import routes from './routes';

export default combineReducers({
	messages,
	chats,
	routes,
});
