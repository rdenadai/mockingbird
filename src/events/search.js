// import { db, dateFormat } from '../utils';
import axios from 'axios';


export async function searchForTermInBackend(term) {
    let content = null;
    try {
        content = await axios.get(`/search/${term}`);
    } catch(exception) {
        // silence
        console.log(exception);
    }
    return content;
}
