import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EmployeeManagement.css';
import { FormControl, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class EmployeeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
        }

    }


    handleSubmit = (event) => {
        event.preventDefault();

        const action = {type: 'GIVE_EMPLOYEE',
                        payload: this.state};
        this.props.dispatch(action)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){

        return(
            <div className="form-container">
            <FormControl onSubmit={this.handleSubmit} className={'form-control'}>
            <h4>Give a User Employee Permissions</h4>
                <TextField onChange={this.handleChange} type='text' 
                    value={this.state.name||''} placeholder='User Name' name='name'/> 


                    <Button onClick={this.handleSubmit}
                            className="FormSubmitBtn"
                            value='Submit'
                            color='primary'
                            variant='contained'
                            size='small'
                            style={{ margin: '20px' }} >
                            Submit</Button>
            </FormControl>
            </div>
        );
    }
}

export default connect()(EmployeeForm);