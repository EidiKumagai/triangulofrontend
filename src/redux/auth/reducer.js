import { Map } from 'immutable';
// import axios from "axios";
import { getToken } from '../../helpers/utility';
//import { getToken } from '../../containers/Page/auth';
import actions from './actions';
// import config from '../../config';

// const api = axios.create({
//   baseURL:"https://apitriangulo.herokuapp.com/sessions"
// });


// api.interceptors.request.use(async config =>{
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
const initState = new Map({
  triangulo: ''
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('triangulo', action.token);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
