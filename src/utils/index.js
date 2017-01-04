import axios from 'axios';

const PouchDB = require('pouchdb-browser');


let pouch = new PouchDB('mockingbird', { adapter: 'websql', size: 350 });
if(!pouch.adapter) { // websql not supported by this browser
    pouch = new PouchDB('mockingbird', { size: 350 });
}
export const db = pouch;


export const dateFormat = 'YYYY-MM-DD HH:mm:ss';


// Declare a function, take functions as arguments
export const compose = (...funcs) => {
    // Return a new function which takes a value
    return (value) => {
        // Reduce & iterate the initial argument spread (an array of functions)
        return funcs.reduce((val, func) => {
            // Take the function, call it, passing in the value and return the output
            return func(val);
        // Pass the value into the reduce to be passed into the function to call
        }, value);
    };
};


export async function download(episodeId) {
    let content = null;
    try {
        content = await axios.get(`/download/${episodeId}`);
    } catch(exception) {
        // silence
        console.log(exception);
    }
    return content;
}
