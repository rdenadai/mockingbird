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
        dispatch({ type: FETCH_PODCASTS, payload: {data: []} });
        dispatch({ type: FETCH_SEARCH_TERM, payload: true });
        dispatch({ type: FETCH_PODCASTS, payload: await searchForTermInBackend(term) });
        dispatch({ type: FETCH_SEARCH_TERM, payload: false });
    };
}
