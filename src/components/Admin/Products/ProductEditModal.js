import React, { Component } from 'react';
import {  FormControl, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import './ProductEditModal';



class ProductEditModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            product_name: '',
            cost: '',
            description: '',
        }
    }

    componentDidMount = () => {
        this.setState({
            product_name: this.props.products.product_name,
            cost: this.props.products.cost,
            description: this.props.products.description,
        })
        console.log('Component mounted');
        
    }
    


    handleUpdateSubmit = (event) => {
        event.preventDefault();
        const action = { type: 'UPDATE_PRODUCT_TYPE', payload: this.state }
        this.props.dispatch(action);
        this.props.handleEditClose();
    }


    handleProductName = (event) => {
        this.setState({
            ...this.state,
            product_name: event.target.value,
        })
    }

    handleCost = (event) => {
        this.setState({
            ...this.state,
            cost: event.target.value,
        })
    }

    handleDescription = (event) => {
        this.setState({
            ...this.state,
            description: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <h2>Edit</h2>
                <FormControl className="form-control" margin="normal">
                    <TextField
                        required
                        helperText="Product Name"
                        value={this.state.product_name||''}
                        type="text"
                        onChange={this.handleProductName}></TextField>
                    <TextField
                        required
                        helperText="Cost"
                        value={this.state.cost||''}
                        onChange={this.handleCost}></TextField>
                    <TextField
                        required
                        helperText="Description"
                        rows={4}
                        value={this.state.description||''}
                        onChange={this.handleDescription}></TextField>
                    <Button
                        variant="contained"
                        className="modal-button"
                        color="primary"
                        onClick={this.handleUpdateSubmit}>
                        Add New Product
                        </Button>
                    <Button 
                        className="modal-button"
                        onClick={this.props.handleEditClose}>Close</Button>
                </FormControl>
            </div>
        )
    }
};


export default connect()(ProductEditModal);