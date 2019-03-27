import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
const Swal = require('sweetalert2');


function* employeeSaga() {
    yield takeEvery('FETCH_EMPLOYEES', fetchEmployees)
    yield takeEvery('ADD_ADMIN', addAdmin)
    yield takeEvery('REMOVE_ADMIN', removeAdmin)
    yield takeEvery('REMOVE_EMPLOYEE', removeEmployee)
    yield takeEvery('GIVE_EMPLOYEE', addEmployee)

}

// give admin rights
function* addAdmin(action) {
    try {
        yield axios.put('/api/user/setAdmin', action.payload);
        const newAction = { type: 'FETCH_EMPLOYEES' };
        yield put(newAction);
        Swal.fire({
            title: 'New Administrator added!',
            type: 'success'
        });
    } catch (error) {
        console.log('Add admin rights request failed', error);
    }
};

//fetch all users with employee or admin
function* fetchEmployees(action) {
    try {
        const responseFromServer = yield axios.get('/api/user/employee');
        const nextAction = { type: 'SET_EMPLOYEES', payload: responseFromServer.data };
        yield put(nextAction);
    } catch (error) {
        console.log('Fetch employee request failed', error);
    }
};

// remove admin rights
function* removeAdmin(action) {
    try {
        yield axios.put(`api/user/removeAdmin`, action.payload)
        const nextAction = { type: 'FETCH_EMPLOYEES', };
        yield put(nextAction);
        Swal.fire({
            title: 'Administrative Rights removed!',
            type: 'success'
        });
    } catch (error) {
        console.log('remove admin rights request failed', error);
    }
};

// remove all employee and admin rights
function* removeEmployee(action) {
    try {
        yield axios.put(`api/user/removeEmployee`, action.payload);
        let nextAction = { type: 'FETCH_EMPLOYEES' };
        yield put(nextAction);
        Swal.fire({
            title: 'Employee Removed!',
            type: 'success'
        });
    } catch (error) {
        console.log('Remove all employee rights request failed', error);
    }
};

function* addEmployee(action) {
    try {
        yield axios.put(`api/user/addEmployee`, action.payload);
        let nextAction = { type: 'FETCH_EMPLOYEES' };
        yield put(nextAction);
        Swal.fire({
            title: 'New Employee Added!',
            type: 'success'
        })
    } catch (error) {
        console.log('add employee rights request failed', error);
    }
};

export default employeeSaga;