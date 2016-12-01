import { db, dateFormat } from '../utils';
import moment from 'moment';

import { configurationModel } from '../models/configuration';


export function loadConfigurationFromDefaultFile() {
    return configurationModel;
}

export async function loadConfigurationFromDatabase() {
    let document = null;
    try {
        document = await db.get('configuration');
    } catch(exception) {
        // silence
    }
    return document;
}

export async function saveConfiguration(content) {
    let document = null;
    try {
        document = await db.get('configuration');
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
                _id: 'configuration',
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
