import { loadMessagesFromDatabase, loadMessagesFromNetwork, saveMessages } from '../events/message';

import { FETCH_MESSAGES } from '../action_types';


export function fetchMessages() {
    return async (dispatch) => {
        let document = await loadMessagesFromDatabase();
        if(!(!!document)) {
            const messages = await loadMessagesFromNetwork();
            if(!!messages) {
                document = await saveMessages(messages);
                if(!!document) {
                    dispatch({ type: FETCH_MESSAGES, payload: document.data });
                } else {
                    dispatch({ type: FETCH_MESSAGES, payload: messages });
                }
            } else {
                dispatch({ type: FETCH_MESSAGES, payload: null });
            }
        } else {
            dispatch({ type: FETCH_MESSAGES, payload: document.data });
        }
    };
}
