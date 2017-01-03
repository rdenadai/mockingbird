import { FETCH_PODCAST_INFO } from '../action_types';

const INITIAL_STATE = { podcast: { data: null, saved: false } };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_PODCAST_INFO:
            return { ...state, podcast: action.payload };
        default:
            return state;
    }
}
