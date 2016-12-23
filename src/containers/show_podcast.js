import React, { Component } from 'react';
import { connect } from 'react-redux';


class ShowPodcast extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>ok!!!</div>
        );
    }
}


ShowPodcast.propTypes = {
    messages: React.PropTypes.object,
    podcast: React.PropTypes.object
};

// React-Redux integration...
function mapStateToProps(state) {
    return {
        messages: state.messages,
        podcast: state.show_podcast.podcast
    };
}

export default connect(mapStateToProps)(ShowPodcast);
