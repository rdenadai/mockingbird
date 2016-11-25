import { db } from '../utils';
import axios from 'axios';

import { FETCH_MESSAGES } from '../action_types';


export function fetchMessages() {
    return (dispatch) => {
        // First, lets try load from database
        db.get('messages').then((doc) => {
            // handle doc
            dispatch({ type: FETCH_MESSAGES, payload: doc.data });
        }).catch(() => { // If theres aint no messages, load it up
            axios.get('/messages').then(({data}) => {
                // Lets save for later usage
                db.post({ _id: 'messages', data: data }).then((doc) => {
                    // dispatch response
                    dispatch({ type: FETCH_MESSAGES, payload: doc.data });
                }).catch(() => {
                    dispatch({ type: FETCH_MESSAGES, payload: data });
                });
            }).catch(() => {
                // Un error happend when trying to load... make a ajax request
                axios.get('/messages').then(({data}) => {
                    dispatch({ type: FETCH_MESSAGES, payload: data });
                });
            });
        });
    };
}
