import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';


class SnackBarAlert extends Component {

    constructor(props) {
        super(props);
        this.state = { showConnectionState: false };
    }

    componentWillMount() {
        window.addEventListener('online', () => {
            this.setState({ showConnectionState: true });
        }, false);

        window.addEventListener('offline', () => {
            this.setState({ showConnectionState: true });
        }, false);

        if(navigator.onLine) {
            this.setState({ showConnectionState: false });
        } else {
            this.setState({ showConnectionState: true });
        }
    }

    render() {
        const showConnectionState = this.state.showConnectionState;
        let connectionText = '';

        if(!!this.props.messages) {
            // check if the user is connected
            if(navigator.onLine) {
                connectionText = this.props.messages.online;
            } else { // show offline message
                connectionText = this.props.messages.offline;
            }

            return (
                <Snackbar
                    open={showConnectionState}
                    message={connectionText}
                    autoHideDuration={2500}
                />
            );
        }
        return null;
    }
}

SnackBarAlert.propTypes = {
    messages: React.PropTypes.object
};

function mapStateToProps(state) {
    return { messages: state.messages };
}

export default connect(mapStateToProps)(SnackBarAlert);
