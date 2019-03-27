import React, { Component, forwardRef, useRef, } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper, Button} from '@material-ui/core';
import { withRouter } from "react-router";
import QrTableRow from './QrTableRow';
import './PrintQr.css';
import PrintQr from './PrintQr';
import QrPdfExport from './QrPdfExport';
import { PDFExport,  } from '@progress/kendo-react-pdf';



class QrTable extends Component {
    pdfExportComponent;
    constructor(props) {
        super(props);
        // const qrRowsUnprinted = this.props.reduxStore.product.map((product) => {
        //     return product;
        // })
        this.state = {
            value: '1',
            // qrRows: this.props.reduxStore
        }
    }
   
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCT' });
    }

    exportPDFWithComponent=()=>{
        this.pdfExportComponent.save();
    }

    printQr=()=>{
        window.print();
    }
    
        // const qrRowsUnprinted = this.props.reduxStore.product.filter((product)=>{
        //     return product.printed === false;
        // })
    

    tableViewChange = (event) => {
        console.log('in tableviewchange', this.state)
        if (event.target.value === '1') {
            this.setState({
                value: event.target.value
            })
        } else if (event.target.value === '2') {
            this.setState({
                value: event.target.value
            })
        } else if (event.target.value === '3') {
            this.setState({
                value: event.target.value
            })
        }
    }

    showTable = () => {
        let qrRows = this.props.reduxStore.product;
        if (this.state.value === '1') {
            return qrRows.map((qrProduct, i) => (
                <QrTableRow key={i} qrproduct={qrProduct} />
            ));
        } else if (this.state.value === '2') {
            const printedProducts = qrRows.filter((product) => product.printed);
            return printedProducts.map((qrProduct, i)=>(
                <QrTableRow key={i} qrproduct={qrProduct} />
            ))
        } else if (this.state.value === '3') {
            const printedProducts = qrRows.filter((product) => !product.printed);
            return printedProducts.map((qrProduct, i) => (
                <QrTableRow key={i} qrproduct={qrProduct} />
            ))
        }
    }

    render() {

      
        return (
         
            <div>
            <div>
                <Button 
                    variant="contained" 
                    color="primary"
                    style={{ margin: '20px' }} 
                    size='small' 
                    className="exportPdfBtn" 
                    onClick={this.exportPDFWithComponent} >Export to PDF</Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ margin: '20px' }} 
                    size='small'
                    onClick={this.printQr} 
                    className="printBtn" >PRINT</Button>
            
               
            <br />

            <Paper className="qrTable">

             {/* {JSON.stringify(this.props.reduxStore.product)}; */}
             
             <Table>
                 <TableHead>
                     <TableRow>
                         <TableCell><select onChange={this.tableViewChange} value={this.state.value} className="PrintSelect" >
                                {/* <option value='1'>Select Table View</option> */}
                                    <option value='1'>Show all QR codes</option>
                                    <option value='2'>Show printed QR codes</option>
                                    <option value='3'>Show unprinted QR codes</option>
                            </select></TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Square Feet</TableCell>
                        <TableCell>QR Printed</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>

                           {this.showTable()}

                 </TableBody>
             </Table>
         </Paper>
         </div>
         <div className="pdfExport" style={{ position: "absolute", left: "-1000px", top: 0 }}>
            <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                <QrPdfExport />
            </PDFExport>
         </div>
         <div className="printHidden" style={{ position: "absolute", left: "-3000px", top: 0 }}>
             <PrintQr />
         </div>
         </div>
        );
    }
}

const mapReduxStoreToProps = reduxStore => ({ reduxStore });
export default withRouter(connect(mapReduxStoreToProps)(QrTable));