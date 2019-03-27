import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetch plot
function* fetchPlot(action) {
    try {
      //this will receive a product id NOT a plot id
        const response = yield axios.get(`api/plots/${action.payload}`);
        //DUMMY Line will switch when done

        // const response = yield axios.get(`api/plots/4`);

    
        //sends array of rows for plot
        yield put({ type: 'SET_DISPLAY_SQUARE', payload: response.data });
    
      } catch (error) {
        console.log('Plot get request failed', error);
      }
}

//update plot
//will be used to update user for a plot (stretch)


function* plotSaga() {
  yield takeLatest('FETCH_PLOT', fetchPlot);
}

export default plotSaga;