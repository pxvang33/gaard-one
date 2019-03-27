import React, { Component } from 'react';
import { connect } from 'react-redux';



/*
***  Change the base URL to the domain name used
*/
const BASE_URL = 'gaard.herokuapp.com/#/1/';
/*
***
*/


class QrPdfExport extends Component {

    componentDidMount(){
        this.props.dispatch({type:'FETCH_PRODUCT'}); 
    }



    render() {
        return (
            <div>
                 {this.props.reduxStore.product.map((qrProduct,i)=>(
                    <div key={i}>
                        <p>{qrProduct.product_name}</p>
                        <p>{BASE_URL}{qrProduct.id}</p>
                    </div>))}
                    
            </div>
        );
    }
}

const mapReduxStoreToProps = reduxStore => ({ reduxStore });
export default connect(mapReduxStoreToProps)(QrPdfExport);