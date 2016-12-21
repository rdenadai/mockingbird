import { searchForTermInBackend } from '../events/search';
import { FETCH_SEARCH_TERM } from '../action_types';


export function searchForTerm(term) {
    return async (dispatch) => {
        const response = await searchForTermInBackend(term);
        let results = [];
        if(response.status === 200) {
            if(!!response.data) {
                results = response.data.results;
            }
        }
        dispatch({ type: FETCH_SEARCH_TERM, payload: results });
    };
}
