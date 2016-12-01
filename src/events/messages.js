import { db, dateFormat } from '../utils';
import axios from 'axios';
import moment from 'moment';

import { messagesModel } from '../models/messages';


export function loadMessagesFromDefaultFile() {
    return messagesModel;
}

export async function loadMessagesFromDatabase() {
    let document = null;
    try {
        document = await db.get('messages');
    } catch(exception) {
        // silence
    }
    return document;
}

export async function loadMessagesFromNetwork(language = 'en') {
    let content = null;
    try {
        content = await axios.get('/messages', { params: { language: language } });
    } catch(exception) {
        // silence
    }
    return content;
}

export async function saveMessages(content) {
    let document = null;
    try {
        document = await db.get('messages');
    } catch(exception) {
        // silence
    }

    try {
        if(!!document) {
            document.revision = content.revision;
            document.data = content.data;
            document.updated_at = moment().format(dateFormat);
        } else {
            document = {
                _id: 'messages',
                revision: content.revision,
                data: content.data,
                updated_at: moment().format(dateFormat)
            };
        }
        document = await db.put(document);
        document = await db.get(document.id);
    } catch(exception) {
        // silence
    }
    return document;
}
