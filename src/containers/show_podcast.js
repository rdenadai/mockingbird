import { css } from '../css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import Loading from '../components/loading';
import EpisodeList from '../containers/list_podcast_episodes';

import {
    showPodcastInfo,
    addPodcastDatabase,
    removePodcastDatabase,
    downloadEpisodeAudio
} from '../actions/podcast';


// const center = { textAlign: 'center' };
const firstColumn = css.flexBoxGrid['col-xs-4'] + ' ' + css.flexBoxGrid['col-sm-5'] + ' ' + css.flexBoxGrid['col-md-5'] + ' ' + css.flexBoxGrid['col-lg-5'];
const secondColumn = css.flexBoxGrid['col-xs-8'] + ' ' + css.flexBoxGrid['col-sm-7'] + ' ' + css.flexBoxGrid['col-md-7'] + ' ' + css.flexBoxGrid['col-lg-7'];

const padding = {
    padding: '10px 5px',
    display: 'inline-block'
};


class ShowPodcast extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const id = this.props.params.id;
        this.props.showPodcastInfo(id);
    }

    onClickAddPodcast() {
        const id = this.props.params.id;
        this.props.addPodcastDatabase(id);
    }

    onClickUpdatePodcast() {
        const id = this.props.params.id;
        this.props.addPodcastDatabase(id);
    }

    onClickRemovePodcast() {
        const id = this.props.params.id;
        this.props.removePodcastDatabase(id);
    }

    onClickRSSFeed() {
        location.href = this.props.podcast.info.feedUrl;
    }

    render() {
        const messages = this.props.messages;
        const saved = this.props.podcast.saved;
        const dados = this.props.podcast.data;
        if(!!dados) {
            console.log(this.props.podcast);

            let button = (
                <div style={padding}>
                    <RaisedButton
                        label={messages.btn_add_podcast_label}
                        primary={true}
                        onClick={this.onClickAddPodcast.bind(this)} />
                </div>
            );

            if(saved) {
                button = (
                    <div style={{display: 'inline-block'}}>
                        <div style={padding}>
                            <RaisedButton
                                label={messages.bnt_update_label}
                                primary={true}
                                onClick={this.onClickUpdatePodcast.bind(this)} />
                        </div>
                        <div style={padding}>
                            <RaisedButton
                                label={messages.bnt_remove_label}
                                primary={true}
                                onClick={this.onClickRemovePodcast.bind(this)} />
                        </div>
                    </div>
                );
            }

            return (
                <div>
                    <div className={css.flexBoxGrid.row} style={{padding: '0px'}}>
                        <div className={firstColumn} style={{textAlign: 'left'}}>
                            <img src={dados.info.artworkUrl600} className={css.baseCSS.podcastArtWork} />
                        </div>
                        <div className={secondColumn + ' ' + css.baseCSS.collectionTitle} style={{textAlign: 'left'}}>
                            <p style={{margin: 0}}><strong>{dados.info.collectionName}</strong></p>
                            <p><small>{dados.info.artistName}</small></p>
                        </div>
                    </div>
                    <Divider />
                    <div style={{padding: '0px 5px'}}>
                        {button}
                        <div style={padding}>
                            <RaisedButton
                                label="Feed RSS"
                                onClick={this.onClickRSSFeed.bind(this)} />
                        </div>
                    </div>
                    <Divider />
                    <EpisodeList
                        dados={dados}
                        saved={saved}
                        image={this.props.podcast.data.info.artworkUrl60} />
                </div>
            );
        }
        return <Loading />;
    }

}


ShowPodcast.propTypes = {
    // React-Router params!
    params: React.PropTypes.object,
    messages: React.PropTypes.object,
    podcast: React.PropTypes.object,
    showPodcastInfo: React.PropTypes.func,
    addPodcastDatabase: React.PropTypes.func,
    removePodcastDatabase: React.PropTypes.func,
    downloadEpisodeAudio: React.PropTypes.func
};

// React-Redux integration...
function mapStateToProps(state) {
    return {
        messages: state.messages,
        podcast: state.show_podcast.podcast
    };
}

const mapDispatchToProps = { showPodcastInfo, addPodcastDatabase, removePodcastDatabase, downloadEpisodeAudio };

export default connect(mapStateToProps, mapDispatchToProps)(ShowPodcast);
