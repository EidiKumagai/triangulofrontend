import axios from 'axios';
import { getToken } from "./auth";
//verificar qual a porta para o apiQuickbooks
const api = axios.create({
   baseURL:"https://apitriangulo.herokuapp.com"
});
api.interceptors.request.use(async config => {
   const token = getToken();
   if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
 });
export default api;