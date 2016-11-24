import { FETCH_MESSAGES } from '../action_types';

const INITIAL_STATE = { messages: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_MESSAGES:
            return { ...state, messages: action.payload };
        default:
            return state;
    }
}
