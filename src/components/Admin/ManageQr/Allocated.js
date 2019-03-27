import React, { Component } from 'react';
import { connect } from 'react-redux';

class Allocated extends Component {
    
//use redux
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_ALLOCATED_SQUARES' });
    }


    render() {

        return (
            <div>
                <h2 className="allocatedUnitSq">
                    {this.props.unitSq.allocatedSquares.length} has been allocated out of {parseInt(this.props.unitSq.squareTotal)} square ft,
                    or { ((this.props.unitSq.allocatedSquares.length/parseInt(this.props.unitSq.squareTotal))*100).toFixed(2) }%
                </h2>
               
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    unitSq: state.unitSq,
});

export default connect(mapStatetoProps)(Allocated);