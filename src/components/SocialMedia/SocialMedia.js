import React, { Component } from 'react';
import './../UserLandingPage/UserLanding.css';
import Card from '@material-ui/core/Card';

// Share icons can be updated or changed if needed.
// Should be noted that instagram doesnt have a share button feature available-Tiana 03/08/19
class SocialMedia extends Component {
    render() {
        return (
            <div className="share-icons">
            <Card className="icon-card">
                <div className="share-div">
                Share your experience!
                </div>
                <div className="sharethis-inline-share-buttons"></div>
            </Card>
            </div>
        );
    }
}
export default SocialMedia;