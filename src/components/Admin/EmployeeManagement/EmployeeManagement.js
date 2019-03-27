import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeTableItem from './EmployeeTableItem.js';
// import Header from '../../Header/Header.js';
import EmployeeForm from './EmployeeForm.js';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

class EmpoyeeManagement extends Component {
   

    componentDidMount = () => {
        this.props.dispatch({type: 'FETCH_EMPLOYEES'});
    }

    render() {
        return (
        <div>
            {/* <Header /> */}
            <h2>Employee Management</h2>

            <EmployeeForm />

            <Table>
                <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Permission Level</TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.employees.map((employee, i) => {
                            return (<EmployeeTableItem key={i} 
                                        employee={employee} history={this.props.history}/>);
                    })}
                </TableBody>
            </Table>
        </div>
        );
    }
}

const mapReduxStoreToProps = reduxStore => ({
    ...reduxStore,
    employees: reduxStore.employees,
});

  export default connect(mapReduxStoreToProps)(EmpoyeeManagement);