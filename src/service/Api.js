import axios from "axios";

const API = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API;


export const getCurrencies = () => axios.get('/currencies');
export const getRates = (base) => axios.get(`/rates?base=${base}`);