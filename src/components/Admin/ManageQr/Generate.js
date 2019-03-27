import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormControl,  Select,  Button, InputLabel, MenuItem, } from '@material-ui/core';

import { TextField, FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './PrintQr.css';

// componenet form to generate Qr codes for products -tj
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

class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: '',
            quantity:'',

        }
    }

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_PRODUCT_TYPE' });
    }

    // handles the change of the product type drop down menu
    changeInput = (event) => {
        this.setState({
            ...this.state,
            productType: event.target.value,

        })
    
        
    }//end

    // handles the change of the quantity
    changeQuantity = (event) => {

    
      
        const inputquanity = parseInt(event.target.value);
        this.setState({
            ...this.state,
            quantity: inputquanity,
        })
    }//end

    // submits the data to the productSaga to generate unique plots based on admin inputs
    submitGenerate = (event) => {
        event.preventDefault();
        // console.log('submit', this.state);
        const action = ({
            type: 'ADD_PRODUCT', payload: this.state
        });
        this.props.dispatch(action);
        this.setState({
            productType: '',
            quantity: '',
        });
    }//end

render(){
        //filter out inactive products
        const activeProducts = this.props.products.filter((product) => product.active);

        return(
            <div className="form-container">
            <FormControl
                className="form-control"
                autoComplete={false}>
                <h2>Create QR Code</h2>
                <TextField
                    id="select-product"
                    select
                    label=""
                    className="input"
                    value={this.state.productType}
                    onChange={this.changeInput}
                    helperText="product"
                    margin="normal"
                    fullWidth
                >
                    {activeProducts.map((product, i) => (
                        <MenuItem key={i}
                            value={product}>
                            {product.product_name}
                        </MenuItem>))}

                </TextField>
                <TextField
                    id="select-quanity"
                    className="quantity"
                    onChange={this.changeQuantity}
                    helperText="quantity"
                    margin="normal"
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 40000 } }}
                    value={this.state.quantity}
                />
                <Button 
                className="FormSubmitBtn"
                variant="contained" 
                color="primary"
                style={{ margin: '20px' }}
                size='small'
                 onClick={this.submitGenerate}>
                    Submit
                </Button>
            </FormControl>
            </div>
        );

    }
}
// maps redux to products
const mapReduxStoreToProps = reduxStore => ({
    products: reduxStore.productType,
});

export default connect(mapReduxStoreToProps)(withStyles(styles)(Generate));
