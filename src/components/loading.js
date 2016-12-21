import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';


const css = {
    margin: '0 auto',
    marginTop: 25,
    width: 80,
    backgroundColor: '#fff'
};

class Loading extends Component {

    render() {
        return (
            <div style={css}>
                <CircularProgress
                    size={80}
                    thickness={7} />
            </div>
        );
    }

}

export default Loading;
