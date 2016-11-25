import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

class AddPodcast extends Component {

    render() {
        const messages = this.props.messages;
        return (
            <div key="AddPodcastPage">
                <div>
                    {messages.add_podcast_page_content}
                </div>
                <div>
                    <TextField hintText={messages.add_podcast_page_search_hint} />
                </div>
            </div>
        );
    }
}

AddPodcast.propTypes = {
    messages: React.PropTypes.object
};

// React-Redux integration...
function mapStateToProps(state) {
    return { messages: state.messages };
}

export default connect(mapStateToProps)(AddPodcast);
