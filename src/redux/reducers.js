import Auth from './auth/reducer';
import App from './app/reducer';

import Calendar from './calendar/reducer';
import Box from './box/reducer';
import Notes from './notes/reducer';
import Todos from './todos/reducer';

import Cards from './card/reducer';
import DynamicChartComponent from './dynamicEchart/reducer';
import Total from './total/reducer';
import cart from './cart/reducer';
import Ecommerce from './ecommerce/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import DevReducers from '../customApp/redux/reducers';

export default {
  Auth,
  App,
  cart,
  ThemeSwitcher,
  LanguageSwitcher,
  Calendar,
  Box,
  Notes,
  Todos,
  Cards,
  DynamicChartComponent,
  Ecommerce,
  Total,
  ...DevReducers
};
