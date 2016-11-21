import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


export default class App extends Component {
    render() {
        const children = this.props.children;

        return (
            <MuiThemeProvider>
                <div>
                    <div>{children}</div>
                    <RaisedButton label="Default" />
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node
};
