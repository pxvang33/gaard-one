import React, { Component } from 'react';
import './UserLanding.css';
import Header from '../Header/Header';
import SocialMedia from './../SocialMedia/SocialMedia';
import QRScanner from './../UserInterface/qRScanner';
import BaseMap from '../Map/BaseMap';
import Legend from '../Map/Legend/Legend';
import { connect } from 'react-redux';

// base of user landing page view -Tiana
class UserLandingPage extends Component {



  componentDidMount = () => {
    let urlParts = this.props.location.pathname.split('/')
    console.log(urlParts)
    let productId = urlParts[ urlParts.length -1 ]
    this.props.dispatch({
      type: 'FETCH_PLOT',
      payload: productId
    });
  }

  thankYou = () => {
    let totalArea = this.props.squares.length;
    if(totalArea > 0){
      return(
        <div>
          <h3>Thank You!!!</h3>
          <h4>Your purchase preserved {totalArea} square feet</h4>
        </div>
      )}
  }


  render() {

    return (
      <div>
        <Header />
        <div className="welcome-main">
        <h2>Welcome to Gaard One</h2>
        </div>
        <div className="ui-home-addons">
        {this.thankYou()}
        
        <QRScanner />
        <BaseMap />
        <br/>
        <Legend />

        <SocialMedia />
        </div>
        </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  squares: state.unitSq.displaySquare,
});

export default connect(mapStatetoProps)(UserLandingPage);
//end base of user landing page view -Tiana