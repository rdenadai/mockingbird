import { FETCH_SEARCH_TERM } from '../action_types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_SEARCH_TERM:
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}
