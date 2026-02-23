import axios from "axios";

// Colocar a porta da sua api
const apiPorta = "5128"

const apiLocal = `http://localhost:${apiPorta}/api/`;

const api = axios.create({
    
    baseURL: apiLocal

}); 

export default api;