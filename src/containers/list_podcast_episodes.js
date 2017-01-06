import { css } from '../css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {blueGrey800} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

const uuid = require('uuid');

import {
    downloadEpisodeAudio
} from '../actions/podcast';

import Loading from '../components/loading';


const listCSS = {
    diplay: 'block',
    height: '100%',
    overflow: 'auto'
};

const downloadIcon = `${css.fontAwesome.fa} ${css.fontAwesome['fa-download']}`;


class EpisodeList extends Component {

    constructor(props) {
        super(props);
    }

    onClickListItem(id, collectionId, audioUrl, audioExtension, audioSize) {
        console.log(id);
        console.log(collectionId);
        console.log(audioUrl);
        console.log(audioSize);
        this.props.downloadEpisodeAudio(collectionId, id, audioExtension);
    }

    renderPodcastEpisodesList = (episode) => {
        const saved = this.props.saved;

        const id = episode.id;
        const collectionId = episode.collectionId;
        const title = episode.title;
        const description = episode.description;
        const audioUrl = episode.audio_url;
        const audioExtension = episode.audio_extension;
        const audioSize = episode.audio_size;

        // const duration = episode.duration;

        // const published = episode.published;

        let rightIconButton = null;
        if(saved) {
            rightIconButton = (
                <IconButton
                    touch={true}
                    onClick={this.onClickListItem.bind(this, id, collectionId, audioUrl, audioExtension, audioSize)}
                    tooltip="download"
                    tooltipPosition="bottom-left">
                    <FontIcon className={downloadIcon} color={blueGrey800} />
                </IconButton>
            );
        }

        const avatar = (
            <Avatar className={css.baseCSS.avatarCSS} size={55} src={this.props.image} />
        );

        return (
            <div key={uuid()}>
                <ListItem
                    key={id}
                    leftAvatar={avatar}
                    rightIconButton={rightIconButton}
                    primaryText={title}
                    secondaryText={<small><div dangerouslySetInnerHTML={{__html: description }} /></small>}
                    secondaryTextLines={2} />
                <Divider key={uuid()} inset={true} />
            </div>
        );
    }


    render() {
        const dados = this.props.dados;
        if(!!dados) {
            return (
                <List style={listCSS}>
                    {dados.episodes.map(this.renderPodcastEpisodesList)}
                </List>
            );
        }
        return <Loading />;
    }

}


EpisodeList.propTypes = {
    messages: React.PropTypes.object,
    dados: React.PropTypes.object,
    saved: React.PropTypes.bool,
    image: React.PropTypes.string,
    downloadEpisodeAudio: React.PropTypes.func
};

// React-Redux integration...
function mapStateToProps(state) {
    return {
        messages: state.messages
    };
}

const mapDispatchToProps = { downloadEpisodeAudio };

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeList);
