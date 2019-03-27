import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Allocated from './ManageQr/Allocated';
import Generate from './ManageQr/Generate';
import QrTable from './ManageQr/QrTable';
import ProductTable from './Products/ProductTable';
import ProductForm from './Products/ProductForm';
import AllocationStatChart from './AllocationStatChart/AllocationStatChart';
import EmployeeManagement from './EmployeeManagement/EmployeeManagement';


function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },
});

class AdminTabNav extends Component {
  
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
   
    render() {
        const { classes, theme } = this.props;

        return (
            <div className="nav-div-main">
            <div className={classes.root}>
                <AppBar position="static" color="#647c36" className="AdminTabNav">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Allocation Stats" />
                        <Tab label="Manage QR" />
                        <Tab label="Manage Products" />
                        <Tab label="Employee Management" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    {/* Home Page Stats */}
                    <TabContainer dir={theme.direction}>
                        <Allocated />
                        <AllocationStatChart />
                    </TabContainer>

                    {/* Manage QR */}
                    <TabContainer dir={theme.direction}>
                        <Allocated />
                        <Generate />
                        <QrTable />
                    </TabContainer>
                    
                    {/* Manage Products */}
                    <TabContainer dir={theme.direction}>
                        <ProductForm />
                        <ProductTable />
                    </TabContainer>

                    {/* Manage Employee */}
                    <TabContainer dir={theme.direction}>
                        <EmployeeManagement />
                    </TabContainer>
                </SwipeableViews>
            </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AdminTabNav);