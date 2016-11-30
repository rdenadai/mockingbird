import { css } from '../css';

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


const icons = {
    home: `${css.fontAwesome.fa} ${css.fontAwesome['fa-home']}`,
    add_podcast: `${css.fontAwesome.fa} ${css.fontAwesome['fa-plus-square']}`,
};


class AppDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = { open: false };
    }

    onTouchTapHandleDrawerToggle = () => this.setState({open: !this.state.open});

    render() {
        const messages = this.props.messages;

        return (
            <div>
                <AppBar
                    title={messages.title}
                    onLeftIconButtonTouchTap={this.onTouchTapHandleDrawerToggle.bind(this)} />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <AppBar title={messages.title} />
                    <div>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <MenuItem><li className={icons.home} />&nbsp;&nbsp;{messages.menu_home}</MenuItem>
                        </Link>
                        <Link to="/app/add/" style={{ textDecoration: 'none' }}>
                            <MenuItem><li className={icons.add_podcast} />&nbsp;&nbsp;{messages.menu_add_podcast}</MenuItem>
                        </Link>
                    </div>
                </Drawer>
            </div>
        );
    }

}

AppDrawer.propTypes = {
    messages: React.PropTypes.object
};

function mapStateToProps(state) {
    return { messages: state.messages };
}

export default connect(mapStateToProps)(AppDrawer);
