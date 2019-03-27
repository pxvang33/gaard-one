import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
const Swal = require('sweetalert2');

function* productTypeSaga() {
    yield takeEvery('FETCH_PRODUCT_TYPE', fetchProductType)
    yield takeEvery('ADD_PRODUCT_TYPE', createProductType)
    yield takeLatest('UPDATE_PRODUCT_TYPE', updateProductType)
    yield takeLatest('DEACTIVATE_PRODUCT_TYPE', deActivateProductType)
    yield takeLatest('REACTIVATE_PRODUCT_TYPE', reActivateProductType)
    yield takeLatest('FETCH_DEACTIVATED_PRODUCT_TYPE', fetchDeactivatedProductType)

}

// create product type
function* createProductType(action) {
    try {
        yield axios.post('/api/productType/newproduct', action.payload);
        const newAction = { type: 'FETCH_PRODUCT_TYPE' };
        yield put(newAction);
        Swal.fire({
            title: 'New Product Added!',
            type: 'success',
        })
    } catch (error) {
        Swal.fire({
            title: 'Unable To Add New Product',
            text: 'Please try again.',
            type: 'error',
        })
        // alert('Create product type request failed', error);
    }
};

//fetch product type
function* fetchProductType() {
    try {
        const responseFromServer = yield axios.get('/api/productType');
        const nextAction = { type: 'SET_PRODUCT_TYPE', payload: responseFromServer.data };
        yield put(nextAction);
    } catch (error) {
        alert('Fetch product type request failed', error);
    }
};

//update product type
function* updateProductType(action) {
    let PTID = action.payload.id;
    console.log('in updateProductType payload', action.payload);
    try {
        yield axios.put(`api/productType/${PTID}`, action.payload)
        const nextAction = { type: 'FETCH_PRODUCT_TYPE', };
        yield put(nextAction);
        Swal.fire({
            title: 'Product Has Been Updated',
            type: 'success'
        })
    } catch (error) {
        Swal.fire({
            title: 'Unable To Update Product',
            text: 'Please try again.',
            type: 'error',
        })    }
};

//deActivate product type
function* deActivateProductType(action) {
    let PTID = action.payload.id;
    console.log('in deActivateProductType payload', action.payload);
    try {
        yield axios.put(`api/productType/deActivate/${PTID}`);
        let nextAction = { type: 'FETCH_PRODUCT_TYPE' };
        yield put(nextAction);
    } catch (error) {
        console.log('DeActivate product type request failed', error);
    }
};

function* reActivateProductType(action) {
    let PTID = action.payload.id;
    console.log('in deActivateProductType payload', action.payload);
    try {
        yield axios.put(`api/productType/reActivate/${PTID}`);
        let nextAction = { type: 'FETCH_PRODUCT_TYPE' };
        yield put(nextAction);
    } catch (error) {
        console.log('ReActivate product type request failed', error);
    }
};

//get deActivated product type
function* fetchDeactivatedProductType() {
    try {
        const responseFromServer = yield axios.get('/api/productType/deActivate');
        const nextAction = { type: 'SET_PRODUCT_TYPE', payload: responseFromServer.data };
        yield put(nextAction);
    } catch (error) {
        console.log('Fetch deactivated product type request failed', error);
        
    }
};

export default productTypeSaga;


