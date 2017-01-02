import { FETCH_PODCAST_INFO } from '../action_types';
import { loadPodcastInfoFromDatabase, loadPodcastInfoFromServer, savePodcastInfo } from '../events/podcast';


export async function showPodcastInfo(id) {
    return async (dispatch) => {
        let content = await loadPodcastInfoFromDatabase(id);
        if(!(!!content)) {
            content = await loadPodcastInfoFromServer(id);
            content = await savePodcastInfo(id, content);
        }
        dispatch({ type: FETCH_PODCAST_INFO, payload: content.data });
    };
}
