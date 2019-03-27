//fetch qr code
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* qrSaga() {
    yield takeLatest('FETCH_QR_PRINT_PRODUCT', fetchProduct) 
};

export default qrSaga;