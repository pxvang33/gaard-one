import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//fetch plot
function* allSquares(action) {
    try {
        const response = yield axios.get(`api/unitSq/allocated`);
        const totResponse = yield axios.get(`api/unitSq/total`);

        yield put({ type: 'SET_ALLOCATED_SQUARES', payload: response.data });
        yield put({ type: 'SET_TOTAL_SQUARES', payload: totResponse.data});
    
      } catch (error) {
        console.log('Allocated square get request failed', error);
      }
}

function* unitSqSaga() {
  yield takeEvery('FETCH_ALLOCATED_SQUARES', allSquares);
}

export default unitSqSaga;