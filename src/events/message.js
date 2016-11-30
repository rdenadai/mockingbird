import { db, dateFormat } from '../utils';
import axios from 'axios';
import moment from 'moment';


export async function loadMessagesFromDatabase() {
    let document = null;
    try {
        document = await db.get('messages');
    } catch(exception) {
        // silence
    }
    return document;
}

export async function loadMessagesFromNetwork() {
    let response = null;
    try {
        response = await axios.get('/messages');
        response = response.data;
    } catch(exception) {
        // silence
    }
    return response;
}

export async function saveMessages(messages) {
    let saved = null;
    const document = {
        _id: 'messages',
        data: messages,
        updated_at: moment().format(dateFormat)
    };

    try {
        saved = await db.put(document);
        saved = await db.get(saved.id);
    } catch(exception) {
        // silence
    }
    return saved;
}
