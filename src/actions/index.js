import { FETCH_MESSAGES } from '../action_types';
import axios from 'axios';

export function fetchMessages() {
    return (dispatch) => {
        axios.get('/messages').then(({data}) => {
            dispatch({ type: FETCH_MESSAGES, payload: data });
        });
    };
}
