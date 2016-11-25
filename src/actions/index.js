import { persistentReducer } from 'redux-pouchdb';

import { FETCH_MESSAGES } from '../action_types';
import axios from 'axios';

const actionFetchMessages = () => {
    return (dispatch) => {
        axios.get('/messages').then(({data}) => {
            dispatch({ type: FETCH_MESSAGES, payload: data });
        });
    };
};

const fetchMessages = persistentReducer(actionFetchMessages, 'fetchMessages');

export { fetchMessages };
