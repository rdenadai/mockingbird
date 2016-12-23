import { searchForTermInBackend } from '../events/search';
import { FETCH_PODCASTS, FETCH_SEARCH_TERM } from '../action_types';


export async function searchingForTerm(searching) {
    return {
        type: FETCH_SEARCH_TERM,
        payload: searching
    };
}

export function getPodcasts(term) {
    return async (dispatch) => {
        let payload = [];

        dispatch({ type: FETCH_PODCASTS, payload: payload });
        dispatch({ type: FETCH_SEARCH_TERM, payload: true });

        const response = await searchForTermInBackend(term);
        if(!!response) {
            if(response.status === 200) {
                payload = response.data;
            }
        }

        dispatch({ type: FETCH_PODCASTS, payload: payload });
        dispatch({ type: FETCH_SEARCH_TERM, payload: false });
    };
}
