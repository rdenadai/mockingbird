import { combineReducers } from 'redux';
import MessagesReducer from './messages_reducer';
import ConfigurationReducer from './configuration_reducer';


const rootReducer = combineReducers({
    messages: MessagesReducer,
    config: ConfigurationReducer,
});

export default rootReducer;
