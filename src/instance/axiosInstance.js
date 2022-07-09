import axios from 'axios';
let token = localStorage.getItem('token');
let authToken = process.env.REACT_APP_TOKEN;

console.log('token',token);
if(token){
    authToken = token;
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    timeout: process.env.REACT_APP_TIMEOUT,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '+authToken,
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosInstance;