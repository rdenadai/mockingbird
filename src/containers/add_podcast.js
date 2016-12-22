import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Loading from '../components/loading';
import SearchBox from '../components/search_box';


class AddPodcast extends Component {

    constructor(props) {
        super(props);

        const windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        this.state = {
            windowHeight: windowHeight - 250
        };
    }

    renderPodcastItemList = (podcastItem) => {
        const id = podcastItem.collectionId;
        const artist = podcastItem.artistName;
        const album = podcastItem.collectionName;
        const img = podcastItem.artworkUrl60;
        return (
            <ListItem
                key={id}
                leftAvatar={<Avatar src={img} />}
                rightIcon={<ActionInfo />}
                primaryText={album}
                secondaryText={artist} />
        );
    }

    showListOfSearchResults = () => {
        if(this.props.podcasts.length > 0) {
            return (
                <div>
                    <Divider /><br />
                    <List style={{maxHeight: this.state.windowHeight, overflow: 'auto'}}>
                        {this.props.podcasts.map(this.renderPodcastItemList)}
                    </List>
                </div>
            );
        }

        if(this.props.searching) {
            return <Loading />;
        }

        return null;
    }

    render() {
        const messages = this.props.messages;

        return (
            <div>
                <div style={{textAlign: 'justify'}}>
                    {messages.add_podcast_page_content}
                </div>
                <br />
                <div>
                    <SearchBox />
                </div>
                <br />
                {this.showListOfSearchResults()}
            </div>
        );
    }
}

AddPodcast.propTypes = {
    messages: React.PropTypes.object,
    searching: React.PropTypes.bool,
    podcasts: React.PropTypes.array
};

// React-Redux integration...
function mapStateToProps(state) {
    return {
        messages: state.messages,
        searching: state.add_podcast.searching,
        podcasts: state.add_podcast.podcasts
    };
}

export default connect(mapStateToProps)(AddPodcast);
