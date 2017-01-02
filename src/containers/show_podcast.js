import { css } from '../css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import { showPodcastInfo } from '../actions/podcast';


const center = { textAlign: 'center' };
const firstColumn = css.flexBoxGrid['col-xs-4'] + ' ' + css.flexBoxGrid['col-sm-5'] + ' ' + css.flexBoxGrid['col-md-5'] + ' ' + css.flexBoxGrid['col-lg-5'];
const secondColumn = css.flexBoxGrid['col-xs-8'] + ' ' + css.flexBoxGrid['col-sm-7'] + ' ' + css.flexBoxGrid['col-md-7'] + ' ' + css.flexBoxGrid['col-lg-7'];


class ShowPodcast extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.showPodcastInfo(this.props.params.id);
    }

    rssFeed() {
        location.href = this.props.podcast.info.feedUrl;
    }

    render() {
        if(!!this.props.podcast.info) {
            console.log(this.props.podcast);
            return (
                <div>
                    <div className={css.flexBoxGrid.row} style={{padding: '0px'}}>
                        <div className={firstColumn} style={center}>
                            <img src={this.props.podcast.info.artworkUrl600} className={css.baseCSS.podcastArtWork} />
                        </div>
                        <div className={secondColumn} style={{textAlign: 'left'}}>
                            <p><strong>{this.props.podcast.info.collectionName}</strong></p>
                            <div>
                                <RaisedButton
                                    label="Feed RSS"
                                    onClick={this.rssFeed.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            );
        }
        return <div>Carregando...</div>;
    }

}


ShowPodcast.propTypes = {
    // React-Router params!
    params: React.PropTypes.object,
    messages: React.PropTypes.object,
    podcast: React.PropTypes.object,
    showPodcastInfo: React.PropTypes.func
};

// React-Redux integration...
function mapStateToProps(state) {
    return {
        messages: state.messages,
        podcast: state.show_podcast.podcast
    };
}

export default connect(mapStateToProps, { showPodcastInfo })(ShowPodcast);
