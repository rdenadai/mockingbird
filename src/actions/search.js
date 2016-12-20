import { FETCH_SEARCH_TERM } from '../action_types';

export function searchForTerm() {
    return (dispatch) => {
        dispatch({ type: FETCH_SEARCH_TERM, payload: null });
    };
}
