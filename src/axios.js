import axios from "axios";
const instance = axios.create({
    baseURL: 'https://mysterious-temple-25929.herokuapp.com/api',
    headers: {
        "content-type": "application/json"
    }
});

export default instance;