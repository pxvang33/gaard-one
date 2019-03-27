import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { withRouter } from "react-router";
import './UserInterface.css';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';


//  Build out of qr scanner for in app accessibility -Tiana
class qRScanner extends Component {
    componentDidMount() {
        //this.props.dispatch({ type: 'FETCH_PLOT' });
        
      }
    constructor (props){
        super(props)
        if(this.props.match.params.id){
            this.state={
                result: this.props.match.params.id, 
                show: false,
            }
        }else{
            this.state = {
            result: 'No result',
            show: false,
        }}
    }


    

    handleScan = data => {
        if (data) {
            console.log('data', data);
            let urlParts = data.split('/')
            console.log(urlParts)
            let productId = urlParts[ urlParts.length -1 ]
            this.setState({
                result: productId
            })
            this.closeIt();
            // this.props.history.push(`/1/${productId}`);
        }
        console.log('oh gosh!')
        // this.props.history.push(`home/${this.state.result}`);
        //  this.props.history.push(`home/${this.state.result}`);
    }
    handleError = err => {
        console.error(err)
    }

    scanIt = () => {
        console.log(' set', this.state.show)
        this.setState({
            show: !this.state.show
        })
    }
    closeIt = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return (
            <div className="ui-main-div">
            {/* {JSON.stringify(this.state)} */}
            <br/>
                {/* <Card className="ui-card"> */}
                <br />
                {this.state.show ?
                <div>
                    <QrReader
                        
                        delay={300} 
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '100%' }}
                        resolution={1200}
                    />
                    <Button variant="contained"
                    className="ScanBtn"
                     color="secondary"
                     onClick={this.closeIt}> Close QR Reader </Button>
                     <div className="ui-qr-return">
                     {/* {this.props.plots.map(plot =>
                    <QRScanner key={plot.id} history={this.props.history} client={plot}/>
                  )} */}
                     {/* {this.props.history.push(`home/${this.state.result}`)}; */}
                     <a href={this.state.result}>{this.state.result}</a>
                     
                    </div>
                    </div>
                    :
                    <Button variant="contained"
                        className="ScanCloseBtn"
                        color="secondary"
                        onClick={this.scanIt}
                     >
                    Scan Qr Code
                    </Button>
                    // <button onClick={this.scanIt}> Scan </button>
                }
                <br />
                {/* maybe this.push.history */}
                {/* </Card> */}
                <br/>
                

            </div>
        );
    }
}

const mapReduxStoreToProps = reduxStore => ({
    plot: reduxStore.unitSq.displaySquare,
  });
  export default withRouter(connect(mapReduxStoreToProps)(qRScanner));
// end Build out of qr scanner for in app accessibility -Tiana
