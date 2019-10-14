import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import notesSagas from './notes/saga';
import todosSagas from './todos/saga';
import cardsSagas from './card/saga';
import devSagas from '../customApp/redux/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    notesSagas(),
    todosSagas(),
    cardsSagas(),
    devSagas()
  ]);
}
