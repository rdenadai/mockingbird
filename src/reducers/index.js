import { combineReducers } from 'redux';
import MessagesReducer from './messages_reducer';

const rootReducer = combineReducers({
    messages: MessagesReducer
});

export default rootReducer;
