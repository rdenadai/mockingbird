import { FETCH_PODCAST_INFO } from '../action_types';

export async function showPodcastInfo(id) {
    console.log(id);
    return {
        type: FETCH_PODCAST_INFO,
        payload: {}
    };
}
