import { css } from '../css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { blue500, blue800, pink500, pink800 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import fetchMessages from '../actions/index';


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

    componentWillMount() {
        console.log(this.props);
        // this.props.fetchMessages();
    }

    onTouchTapHandleDrawerToggle = () => this.setState({open: !this.state.open});

    render() {
        const children = this.props.children;

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
                            {children}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    messages: React.PropTypes.object,
    fetchMessages: React.PropTypes.func
};


function mapStateToProps(state) {
    return { messages: state.messages };
}

export default connect(mapStateToProps, { fetchMessages })(App);
