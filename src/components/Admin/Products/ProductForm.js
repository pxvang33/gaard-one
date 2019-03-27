import React, { Component } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './ProductEditModal.css';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});



class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            cost: '',
            description: '',
        }
    }

    // handleResetForm = () => {
    //     this.setState({
    //         product_name: '',
    //         cost: '',
    //         description: '',
    //     });
    // }
    
    handleSubmitAndSwal = () => {
        this.handleSubmit();
    }

    // handleSweetAlert = () => {
    //     if(this.props.products.length === )
    // }


    handleSubmit = () => {
        const action = { type: 'ADD_PRODUCT_TYPE', payload: this.state}
        this.props.dispatch(action);
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
            <div className="form-container">
            <h2>Add New Product</h2>
                <FormControl margin="normal" className="form-control">
                    <TextField
                        required
                        helperText="Product Name"
                        onChange={this.handleProductName}></TextField>
                    <TextField
                        required
                        helperText="Cost"
                        onChange={this.handleCost}></TextField>
                    <TextField
                        required
                        helperText="Description"
                        rows={4}
                        onChange={this.handleDescription}></TextField>
                    <Button 
                        className="formSubmitBtn"
                        variant="contained"
                        color="primary"
                        size='small'
                        style={{ margin: '20px' , backgroundColor: "#647c36"}}
                        onClick={this.handleSubmitAndSwal}>
                    Add New Product
                        </Button>
    
                </FormControl>

            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    products: state.productType,
})

export default connect(mapStatetoProps)(withStyles(styles)(ProductForm));