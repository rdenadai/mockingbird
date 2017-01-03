import { FETCH_PODCAST_INFO } from '../action_types';
import { loadPodcastInfoFromDatabase, loadPodcastInfoFromServer, savePodcastInfo, removePodcastInfo } from '../events/podcast';


export async function showPodcastInfo(id) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: false } });

        let saved = true;
        let content = await loadPodcastInfoFromDatabase(id);
        if(!(!!content)) {
            saved = false;
            content = await loadPodcastInfoFromServer(id);
        }

        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: content.data, saved: saved } });
    };
}


export async function addPodcastDatabase(id) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: false } });

        let content = await loadPodcastInfoFromServer(id);
        content = await savePodcastInfo(id, content);

        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: content.data, saved: true } });
    };
}


export async function removePodcastDatabase(id) {
    return async (dispatch) => {
        await removePodcastInfo(id);
        dispatch({ type: FETCH_PODCAST_INFO, payload: { data: null, saved: false } });
    };
}
