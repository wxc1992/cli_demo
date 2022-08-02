import {all} from "redux-saga/effects";
import loginSaga from "./loginSaga";
import menuSaga from "./menuSaga";

export default function* rootSaga() {
  yield all([loginSaga(),menuSaga()]);
}
