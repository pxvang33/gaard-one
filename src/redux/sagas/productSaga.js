import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
const Swal = require('sweetalert2');


function* productSaga() {
    yield takeLatest('FETCH_PRODUCT', fetchProduct)
    yield takeLatest('ADD_PRODUCT', addProduct)
    yield takeLatest('UPDATE_PRODUCT_PRINTED', updateProductPrinted)
    yield takeLatest('UPDATE_PRODUCT_CLAIMED', updateProductClaimed)
    yield takeLatest('DELETE_PRODUCT', deleteProduct)
}
//Create product
function* addProduct(action) {
    console.log('in addProduct saga', action.payload);
    try {
        yield axios.post('/api/product', action.payload);
        const newAction = { type: 'FETCH_PRODUCT' };
        yield put(newAction);
        Swal.fire({
            title: 'QR Code Created',
            text: 'Product has been attached to QR code!',
            type: 'success'
        })
        //updates total allocated on DOM
        yield put({type: 'FETCH_ALLOCATED_SQUARES'});
    } catch (error) {
        Swal.fire({
            title: 'QR Code Creation Failed',
            text: 'Something went wrong with creating QR code. Please make sure quantity is below 50.',
            type: 'error'
        })
        console.log('error in addProduct POST saga');
    }
}
//fetch product
function* fetchProduct() {
    try {
        const responseFromServer = yield axios.get('/api/product');
        const nextAction = { type: 'SET_PRODUCT', payload: responseFromServer.data }
        yield put(nextAction);
    } catch (error) {
        console.log('error in fetchProduct GET saga', error);
    }
}

//update printed 
function* updateProductPrinted(action) {
    let productPrinted = action.payload.product_id;
    console.log('in updateProductPrinted payload', productPrinted);
    console.log('in updateProductPrinted action', action.payload);
    try {
        yield axios.put(`/api/product/printed/${productPrinted}`, action.payload);
        let nextAction = { type: 'FETCH_PRODUCT' };
        yield put(nextAction);
    } catch (error) {
        console.log('in updateProductPrinted PUT', error);
    }
}
//update claimed
function* updateProductClaimed(action) {
    let productClaimed = action.payload.id;
    console.log('in updatedProductClaimed payload', productClaimed);
    console.log('in updatedProductClaimed action', action.payload);
    try {
        yield axios.put(`/api/product/claimed/${productClaimed}`, action.payload);
        let nextAction = { type: 'FETCH_PRODUCT' };
        yield put(nextAction);
    } catch (error) {
        console.log('in updateProductClaimed PUT', error);
    }
}
//delete product
function* deleteProduct(action) {
    const product = action.payload;
    console.log('in deleteProduct saga', product);
    try {
        yield axios.delete(`/api/product/${product}`);
        let nextAction = { type: 'FETCH_PRODUCT' };
        yield put(nextAction);
    } catch (error) {
        console.log('in deleteProduct saga error', error);
    }
}

export default productSaga;