import { css } from '../css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';


const center = {
    textAlign: 'center'
};

const minHeightStyle = {
    minHeight: '250px'
};


class AddPodcast extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        };
    }

    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [
                value,
                value + '_' + value,
            ],
        });
    }

    render() {
        const messages = this.props.messages;

        if(!!messages) {
            return (
                <div key="AddPodcastPage">
                    <div>
                        {messages.add_podcast_page_content}
                    </div>
                    <div style={minHeightStyle}>
                        <AutoComplete
                            key="textfieldSearchPodcast"
                            hintText=""
                            dataSource={this.state.dataSource}
                            onUpdateInput={this.handleUpdateInput}
                            floatingLabelText={messages.add_podcast_page_search_hint}
                            fullWidth={true} />
                    </div>
                    <br /><Divider /><br />
                    <div className={css.flexBoxGrid.row}>
                        <div className={css.flexBoxGrid['col-xs-6']} style={center}>
                            <RaisedButton
                                label={messages.add_podcast_button_label}
                                primary={true} />
                        </div>
                        <div className={css.flexBoxGrid['col-xs-6']} style={center}>
                            <Link to="/">
                                <RaisedButton label={messages.back_button_label} />
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        return <div />;
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
