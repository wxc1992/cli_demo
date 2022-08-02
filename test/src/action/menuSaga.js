import {
  call,
  put,
  takeEvery,
  take,
  fork
} from "redux-saga/effects";
function* loginHandle(action) {

  console.log('MENU_SAGA',action)
  yield put({
    type: action.type,
    payload: action.payload
  });
}

function* menuSaga() {
  yield takeEvery("MENU_SAGA", loginHandle);
}


export default menuSaga;