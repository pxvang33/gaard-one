import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableCell, TableRow } from '@material-ui/core/';
// import { PDFExport, } from '@progress/kendo-react-pdf';

// use this line for display of the Qr Code in the table
// import QRCode from 'qrcode-react';

class QrTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printed: this.props.qrproduct.printed
        }
    }

    archiveQr = (id) => {
        const action = { type: 'UPDATE_PRODUCT_PRINTED', payload: id }
        this.props.dispatch(action)
    }
    //  pdfExportComponent;

    //  exportPDFWithComponent = () => {
    //     this.pdfExportComponent.save();
    // }

    printedLogic = () => {
        if (this.props.qrproduct.printed) {
            return <TableCell>Printed</TableCell>
        } else {
            return <TableCell> Not Printed</TableCell>

        }
    }

    render() {
      
        const printedQr = this.state.printed;
     
        return (
            <TableRow>
                <TableCell><button onClick={() => { this.archiveQr(this.props.qrproduct) }}>Archive</button></TableCell>
                <TableCell>{this.props.qrproduct.product_name}</TableCell>
                <TableCell>{this.props.qrproduct.cost}</TableCell>


                {this.printedLogic()}
            </TableRow>
        );
    }
}
const mapReduxStoreToProps = reduxStore => ({ reduxStore });

export default connect(mapReduxStoreToProps)(QrTableRow);