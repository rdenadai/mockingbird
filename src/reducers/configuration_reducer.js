import { FETCH_CONFIG } from '../action_types';

import { configurationModel } from '../models/configuration';

const INITIAL_STATE = configurationModel.data;

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_CONFIG:
            return action.payload;
        default:
            return state;
    }
}
