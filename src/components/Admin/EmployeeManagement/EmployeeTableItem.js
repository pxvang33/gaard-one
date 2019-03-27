import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell } from '@material-ui/core';
import Button from '@material-ui/core/Button';
    

class EmployeeTableItem extends Component {

    permissionLevel = () => {
        if(this.props.employee.admin){
            return <TableCell>Admin</TableCell>
        }else if(this.props.employee.employee){
            return <TableCell>Employee</TableCell>
        }
    }

    handleRemoveAdmin = () => {
        const action = {
            type: 'REMOVE_ADMIN',
            payload: this.props.employee,
          }
        this.props.dispatch(action);
    }

    handleMakeAdmin = () => {
        const action = {
            type: 'ADD_ADMIN',
            payload: this.props.employee,
          }
        this.props.dispatch(action);
    }

    handleRemovePermissions = () => {
        const action = {
            type: 'REMOVE_EMPLOYEE',
            payload: this.props.employee,
          }
        this.props.dispatch(action);
    }

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.employee.username}</TableCell>
                <TableCell>{this.permissionLevel()}</TableCell>
                <TableCell>
                    <Button onClick={this.handleRemoveAdmin}>Remove Admin Permissions</Button>
                </TableCell>
                <TableCell>
                    <Button onClick={this.handleMakeAdmin}>Make Admin</Button>
                </TableCell>
                <TableCell>
                    <Button onClick={this.handleRemovePermissions}>Remove all Employee Permissions</Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default connect()(EmployeeTableItem);
