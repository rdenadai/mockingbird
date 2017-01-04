import moment from 'moment';
import { db, dateFormat } from '../utils';
import axios from 'axios';


export async function loadPodcastInfoFromDatabase(podcastId) {
    let document = null;
    try {
        document = await db.get(podcastId);
    } catch(exception) {
        // silence
    }
    return document;
}


export async function loadPodcastInfoFromServer(podcastId) {
    let content = null;
    try {
        content = await axios.get(`/view/${podcastId}`);
    } catch(exception) {
        // silence
        console.log(exception);
    }
    return content;
}


export async function savePodcastInfo(podcastId, content) {
    let document = null;
    try {
        document = await db.get(podcastId);
    } catch(exception) {
        // silence
    }

    try {
        if(!!document) {
            document.data = content.data;
            document.saved = true;
            document.updated_at = moment().format(dateFormat);
        } else {
            document = {
                _id: podcastId,
                data: content.data,
                saved: true,
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


export async function removePodcastInfo(podcastId) {
    try {
        const document = await db.get(podcastId);
        if(!!document) {
            await db.remove(document);
            return true;
        }
    } catch(exception) {
        // silence
    }
    return false;
}
