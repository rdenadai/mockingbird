import { FETCH_MESSAGES } from '../action_types';
import axios from 'axios';

export const fetchMessages = () => {
    const request = axios.get('/messages');
    return (dispatch) => {
        request.then(({data}) => {
            dispatch({
                type: FETCH_MESSAGES,
                payload: data
            });
        });
    };
};
