import { FETCH_PODCAST_INFO } from '../action_types';
import {
    loadPodcastInfoFromDatabase,
    loadPodcastInfoFromServer,
    savePodcastInfo,
    removePodcastInfo,
    downloadPodcastEpisodeAudio,
    savePodcastEpisodeAudio
} from '../events/podcast';


export async function showPodcastInfo(podcastId) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: false } });

        let saved = true;
        let content = await loadPodcastInfoFromDatabase(podcastId);
        if(!(!!content)) {
            saved = false;
            content = await loadPodcastInfoFromServer(podcastId);
        }

        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: content.data, saved: saved } });
    };
}


export async function addPodcastDatabase(podcastId) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: false } });

        let content = await loadPodcastInfoFromServer(podcastId);
        content = await savePodcastInfo(podcastId, content);

        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: content.data, saved: true } });
    };
}


export async function removePodcastDatabase(podcastId) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: false } });

        await removePodcastInfo(podcastId);

        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: false } });
    };
}


export async function downloadPodcastImage(podcastId) {
    console.log(podcastId);
    return async (dispatch) => {
        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: true } });
    };
}


export async function downloadEpisodeAudio(podcastId, episodeId, audioExtension) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: true } });

        const filename = `${episodeId}.${audioExtension}`;
        const contentType = `audio/${audioExtension}`;

        const audioFile = await downloadPodcastEpisodeAudio(episodeId);
        await savePodcastEpisodeAudio(podcastId, episodeId, filename, contentType, audioFile);

        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: true } });
    };
}
