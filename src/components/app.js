import { css } from '../css';

import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { blue500, blue800, pink500, pink800 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import AppDrawer from './drawer';
import SnackBarAlert from './snackbar_alert';
import AnimatedBox from './animated_box';


const uuid = require('uuid');

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue500,
        primary2Color: blue800,
        accent1Color: pink500,
        accent2Color: pink800
    }
});

class App extends Component {

    constructor(props) {
        super(props);
    }

    addNewPodcastButton = () => {
        const verdade = true;

        if(this.context.router.location.pathname === '/') {
            return  (
                <Link to="/app/add">
                    <FloatingActionButton
                        className={css.baseCSS.floatActionButton}
                        secondary={verdade}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>
            );
        }
        return null;
    }

    render() {
        const messages = this.props.messages;
        const children = !!this.props.children ? this.props.children : null;

        if(!!messages) {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className={css.baseCSS.fullHeight}>
                        <AppDrawer />
                        <div className={css.baseCSS.content + ' ' + css.baseCSS.fullHeightExceptHeader}>
                            <div className={css.baseCSS.contentMargins + ' ' + css.baseCSS.fullHeight}>
                                <ReactTransitionGroup>
                                    <AnimatedBox key={uuid()}>
                                        {children}
                                    </AnimatedBox>
                                </ReactTransitionGroup>
                            </div>
                        </div>
                        <SnackBarAlert />
                        {this.addNewPodcastButton()}
                    </div>
                </MuiThemeProvider>
            );
        }
        return <div />;
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    messages: React.PropTypes.object
};

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return { messages: state.messages };
}

export default connect(mapStateToProps)(App);
