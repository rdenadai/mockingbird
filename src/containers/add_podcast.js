import { css } from '../css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Loading from '../components/loading';
import SearchBox from './search_box';

const uuid = require('uuid');


const cssListFill = {
    height: 'calc(100% - 160px)'
};

const listCSS = {
    diplay: 'block',
    height: '100%',
    overflow: 'auto'
};


class AddPodcast extends Component {

    constructor(props) {
        super(props);
    }

    onItemTouchTap = (evt, child) => {
        try {
            const key = child.key.split('-');
            const id = key[1];
            if(!!id) {
                this.context.router.push(`/app/show/${id}`);
            }
        } catch(exception) {
            // silence
        }
    }

    onClickListItem = (id) => {
        try {
            if(!!id) {
                this.context.router.push(`/app/show/${id}`);
            }
        } catch(exception) {
            // silence
        }
    }

    renderPodcastItemList = (podcastItem) => {
        const id = podcastItem.collectionId;
        const artist = podcastItem.artistName;
        const album = podcastItem.collectionName;
        const img = podcastItem.artworkUrl60;

        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left">
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        const replyKey = 'reply-' + id;
        const forwardKey = 'forward-' + id;
        const deleteKey = 'delete-' + id;

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemTouchTap}>
                <MenuItem key={replyKey}>Reply</MenuItem>
                <MenuItem key={forwardKey}>Forward</MenuItem>
                <MenuItem key={deleteKey}>Delete</MenuItem>
            </IconMenu>
        );

        return (
            <div key={uuid()}>
                <ListItem
                    key={id}
                    onTouchTap={this.onClickListItem.bind(this, id)}
                    leftAvatar={<Avatar style={{top: 10}} size={50} src={img} />}
                    rightIconButton={rightIconMenu}
                    primaryText={album}
                    secondaryText={artist} />
                <Divider key={uuid()} inset={true} />
            </div>
        );
    }

    showListOfSearchResults = () => {
        if(this.props.searching) {
            return <Loading />;
        }

        const messages = this.props.messages;
        let component = (<div>{messages.no_podcast_found}</div>);
        if(this.props.podcasts.length > 0) {
            component = (
                <div style={cssListFill}>
                    <List style={listCSS}>
                        {this.props.podcasts.map(this.renderPodcastItemList)}
                    </List>
                </div>
            );
        }
        return component;
    }

    render() {
        const messages = this.props.messages;

        return (
            <div className={css.baseCSS.fullHeight}>
                <div>
                    <div style={{textAlign: 'justify'}}>
                        {messages.add_podcast_page_content}
                    </div>
                    <br />
                    <div>
                        <SearchBox />
                    </div>
                    <br /><Divider /><br />
                </div>
                {this.showListOfSearchResults()}
            </div>
        );
    }
}

// ask for `router` from context
AddPodcast.contextTypes = {
    router: React.PropTypes.object
};

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
