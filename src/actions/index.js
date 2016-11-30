// import { loadMessagesFromDatabase, loadMessagesFromDefaultFile, loadMessagesFromNetwork, saveMessages } from '../events/messages';
import { loadMessagesFromDefaultFile, loadMessagesFromDatabase, loadMessagesFromNetwork, saveMessages } from '../events/messages';
import { loadConfigurationFromDefaultFile, loadConfigurationFromDatabase, saveConfiguration } from '../events/configuration';
import { FETCH_MESSAGES, FETCH_CONFIG } from '../action_types';
import { configurationModel } from '../models/configuration';


export function fetchConfiguration() {
    return async (dispatch) => {
        let documentFromDatabase = await loadConfigurationFromDatabase();
        if(!!documentFromDatabase) {
            // We check if the revision number are equal, otherwise there's some change in the configuration
            if(documentFromDatabase.revision !== configurationModel.revision) {
                documentFromDatabase = await saveConfiguration(configurationModel);
            }
        } else {
            documentFromDatabase = await saveConfiguration(configurationModel);
        }
        // Always dispatch
        dispatch({ type: FETCH_CONFIG, payload: documentFromDatabase.data });
    };
}


export function fetchMessages() {
    return async (dispatch) => {
        const documentFromMemory = loadMessagesFromDefaultFile();
        let configurationFromDatabase = await loadConfigurationFromDatabase();
        let documentFromDatabase = null;
        let documentFromNetwork = null;

        if(!(!!configurationFromDatabase)) {
            configurationFromDatabase = loadConfigurationFromDefaultFile();
        }

        // If the user keeps the default language, lets just save in database
        if(configurationFromDatabase.data.language === 'en') {
            documentFromDatabase = await saveMessages(documentFromMemory);
        } else {
            documentFromDatabase = await loadMessagesFromDatabase();
            // Check revions numbers to make sure we dont change anything!
            if(documentFromDatabase.revision !== documentFromMemory.revision) {
                // If revision changed, this means that we need to load the messages for the specific language
                documentFromNetwork = await loadMessagesFromNetwork(configurationFromDatabase.data.language);
                // Network is enabled, just went fine and new messages arrive
                if(!!documentFromNetwork) {
                    documentFromDatabase = await saveMessages(documentFromNetwork);
                } else {
                    // If we dont find the network lets load from memory!
                    documentFromDatabase = documentFromMemory;
                }
            }
        }
        // Always dispatch
        dispatch({ type: FETCH_MESSAGES, payload: documentFromDatabase.data });
    };
}
