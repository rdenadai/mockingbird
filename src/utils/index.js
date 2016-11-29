const PouchDB = require('pouchdb-browser');

export const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export const db = new PouchDB('mockingbird');

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
