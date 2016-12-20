import { FETCH_SEARCH_TERM } from '../action_types';

import { configurationModel } from '../models/configuration';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_SEARCH_TERM:
            return action.payload;
        default:
            return state;
    }
}
