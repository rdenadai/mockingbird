import { css } from '../css';

import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { blue500, blue800, pink500, pink800 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import AnimatedBox from './animated_box';

const uuid = require('uuid');


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue500,
        primary2Color: blue800,
        accent1Color: pink500,
        accent2Color: pink800
    },
    appBar: {
        height: 50,
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    onTouchTapHandleDrawerToggle = () => this.setState({open: !this.state.open});

    render() {
        const children = !!this.props.children ? this.props.children : null;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        title="Mockingbird"
                        onLeftIconButtonTouchTap={this.onTouchTapHandleDrawerToggle.bind(this)} />
                    <Drawer
                        docked={false}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                        <MenuItem>Menu Item</MenuItem>
                        <MenuItem>Menu Item 2</MenuItem>
                    </Drawer>
                    <div className={css.baseCSS.content}>
                        <div className={css.baseCSS.contentMargins}>
                            <ReactTransitionGroup>
                                <AnimatedBox key={uuid()}>
                                    {children}
                                </AnimatedBox>
                            </ReactTransitionGroup>
                        </div>
                        <Link to="/app/add">
                            <FloatingActionButton
                                className={css.baseCSS.floatActionButton}
                                secondary={true}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </Link>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    messages: React.PropTypes.object
};


function mapStateToProps(state) {
    return { messages: state.messages.messages };
}

export default connect(mapStateToProps)(App);
