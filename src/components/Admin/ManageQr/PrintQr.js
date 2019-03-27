import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode-react';
import './PrintQr.css';

/*
***  Change the base URL to the domain name used
*/
const BASE_URL = 'gaard.herokuapp.com/#/1/';
/*
***
*/

class PrintQr extends Component {
    
    
    componentDidMount(){
        this.props.dispatch({type:'FETCH_PRODUCT'});
        
    }
  
    
    render() {
        
        return (
            
            <div> 
              
                
                        {this.props.reduxStore.product.map((qrProduct,i)=>(
                            <div class="qrPrint">
                            <QRCode value={`${BASE_URL}${qrProduct.id}`}  size={75} className="labelQr"/>
                               <p className="labelName">{qrProduct.product_name}</p> 
                            </div> ))} 
         
            </div>
            
        );
    }
}
const mapReduxStoreToProps = reduxStore => ({reduxStore});
export default connect(mapReduxStoreToProps,)(PrintQr);