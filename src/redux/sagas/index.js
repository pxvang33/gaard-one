import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import plotSaga from './plotSaga';
import productTypeSaga from './productTypeSaga';
import productSaga from './productSaga';
import employeeSaga from './employeeSaga.js';
// import qrSaga from './qrSaga';
import unitSqSaga from './unitSqSaga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    plotSaga(),
    productTypeSaga(),
    productSaga(),
    employeeSaga(),
    // qrSaga(),
    unitSqSaga(),
  ]);
}
