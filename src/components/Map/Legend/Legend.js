import React from 'react';
import { connect } from 'react-redux';
import './Legend.css';

class Legend extends React.Component {
    

    renderLocation = () => {
        if(this.props.unitSq.length > 0){
            return(
                <p>Your Location: Latitude: {this.props.unitSq[0].bl_corner_lat} <br />
                   Longitude: {this.props.unitSq[0].bl_corner_lon}</p>
            )
        }
    }


    render() {
        return (
            <fieldset className='legend'>
                <legend>Legend</legend>
                Saved by You: <div className="purchase"/><br/><br/>
                Our Goal: <div className="belwinBorder"/><br/><br/>
                Saved in 2018: <div className="savedByYear"/><br/>
                {this.renderLocation()}
            </fieldset>
        );
    }
}

const mapReduxStoreToProps = reduxStore => ({
    unitSq: reduxStore.unitSq.displaySquare,
});

export default connect(mapReduxStoreToProps)(Legend);