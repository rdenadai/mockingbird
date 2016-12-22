import { FETCH_PODCASTS, FETCH_SEARCH_TERM } from '../action_types';

const INITIAL_STATE = { podcasts: [], searching: false };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_PODCASTS:
            return { ...state, podcasts: action.payload.data };
        case FETCH_SEARCH_TERM:
            return { ...state, searching: action.payload };
        default:
            return state;
    }
}
