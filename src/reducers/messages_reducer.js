import { FETCH_MESSAGES } from '../action_types';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_MESSAGES:
            return { ...state, post: action.payload };
        default:
            return state;
    }
}
