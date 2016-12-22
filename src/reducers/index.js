import { combineReducers } from 'redux';
import MessagesReducer from './messages_reducer';
import ConfigurationReducer from './configuration_reducer';
import SearchTermReducer from './search_term_reducer';


const rootReducer = combineReducers({
    messages: MessagesReducer,
    config: ConfigurationReducer,
    add_podcast: SearchTermReducer
});

export default rootReducer;
