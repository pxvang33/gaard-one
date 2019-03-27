import React, { Component } from 'react';
import AdminTabNav from './AdminTabNav';
// import LogOutButton from '../LogOutButton/LogOutButton.js';
import AdminHeader from './../Header/HeaderAdmin';


class Admin extends Component {
  render() {
    return (
      <div>
        <AdminHeader />
        {/* <LogOutButton className="log-in" /> */}
        <AdminTabNav />

        
      </div>
    );
  }
}
export default Admin;