import { css } from '../css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Loading from '../components/loading';

import { searchForTerm } from '../actions/search';


const center = {
    textAlign: 'center'
};

const icons = {
    search: `${css.fontAwesome.fa} ${css.fontAwesome['fa-search']}`,
    add_podcast: `${css.fontAwesome.fa} ${css.fontAwesome['fa-plus-square']}`,
};

const firstColumn = css.flexBoxGrid['col-xs-10'] + ' ' + css.flexBoxGrid['col-sm-9'] + ' ' + css.flexBoxGrid['col-md-9'] + ' ' + css.flexBoxGrid['col-lg-11'];
const secondColumn = css.flexBoxGrid['col-xs-2'] + ' ' + css.flexBoxGrid['col-sm-3'] + ' ' + css.flexBoxGrid['col-md-3'] + ' ' + css.flexBoxGrid['col-lg-1'];

class AddPodcast extends Component {

    constructor(props) {
        super(props);

        const windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        this.state = {
            searchTerm: '',
            showList: false,
            startSearch: false,
            windowHeight: windowHeight - 250
        };
    }

    handleUpdateInput = (evt) => {
        this.setState({
            searchTerm: evt.target.value
        });
    }

    handleSearchInputKeyPress = (evt) => {
        if(evt.key === 'Enter') {
            this.handleClickSearch();
        }
    }

    handleClickSearch = () => {
        this.setState({startSearch: true});
        if(!!this.state.searchTerm) {
            this.props.searchForTerm(this.state.searchTerm);
            this.setState({showList: true, startSearch: false});
        }
    }

    renderPodcastItemList = (podcastItem) => {
        const id = podcastItem.collectionId;
        const artist = podcastItem.artistName;
        const album = podcastItem.collectionName;
        const img = podcastItem.artworkUrl30;
        return (
            <ListItem
                id={id}
                leftAvatar={<Avatar src={img} />}
                rightIcon={<ActionInfo />}
                primaryText={album}
                secondaryText={artist} />
        );
    }

    showListOfSearchResults = () => {
        if(this.state.showList && !!this.props.search_result) {
            return (
                <div>
                    <Divider /><br />
                    <List style={{maxHeight: this.state.windowHeight, overflow: 'auto'}}>
                        {this.props.search_result.map(this.renderPodcastItemList)}
                    </List>
                </div>
            );
        }

        if(this.state.startSearch) {
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
                    <Paper zDepth={1} style={{height: 55}}>
                        <div className={css.flexBoxGrid.row} style={{padding: 5}}>
                            <div className={firstColumn} style={center}>
                                <TextField
                                    key="textfieldSearchPodcast"
                                    value={this.state.searchTerm}
                                    hintText={messages.add_podcast_page_search_hint}
                                    onChange={this.handleUpdateInput}
                                    onKeyPress={this.handleSearchInputKeyPress}
                                    autoFocus={true}
                                    fullWidth={true}
                                    style={{height: 50}} />
                            </div>
                            <div className={secondColumn}>
                                <IconButton onClick={this.handleClickSearch} iconClassName={icons.search} />
                            </div>
                        </div>
                    </Paper>
                </div>
                <br />
                {this.showListOfSearchResults()}
            </div>
        );
    }
}

AddPodcast.propTypes = {
    messages: React.PropTypes.object,
    search_result: React.PropTypes.array,
    searchForTerm: React.PropTypes.func
};

// React-Redux integration...
function mapStateToProps(state) {
    return {
        messages: state.messages,
        search_result: state.search_result
    };
}

export default connect(mapStateToProps, {searchForTerm})(AddPodcast);
