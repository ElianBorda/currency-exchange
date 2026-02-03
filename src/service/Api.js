import axios from "axios";
axios.defaults.baseURL = 'https://api.vatcomply.com';


export const getCurrencies = () => axios.get('/currencies');
export const getRates = (base) => axios.get(`/rates?base=${base}`);