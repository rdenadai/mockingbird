import { css } from '../css';


import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import { searchingForTerm, getPodcasts } from '../actions/search';


const center = {
    textAlign: 'center'
};

const icons = {
    search: `${css.fontAwesome.fa} ${css.fontAwesome['fa-search']}`,
    add_podcast: `${css.fontAwesome.fa} ${css.fontAwesome['fa-plus-square']}`,
};

const firstColumn = css.flexBoxGrid['col-xs-10'] + ' ' + css.flexBoxGrid['col-sm-11'] + ' ' + css.flexBoxGrid['col-md-11'] + ' ' + css.flexBoxGrid['col-lg-11'];
const secondColumn = css.flexBoxGrid['col-xs-2'] + ' ' + css.flexBoxGrid['col-sm-1'] + ' ' + css.flexBoxGrid['col-md-1'] + ' ' + css.flexBoxGrid['col-lg-1'];

class SearchBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
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
        if(!!this.state.searchTerm) {
            this.props.getPodcasts(this.state.searchTerm);
        }
    }

    render() {
        const messages = this.props.messages;

        return (
            <Paper zDepth={1} style={{height: 55}}>
                <div className={css.flexBoxGrid.row} style={{padding: 5}}>
                    <div className={firstColumn} style={center}>
                        <TextField
                            key="textfieldSearchPodcast"
                            value={this.state.searchTerm}
                            hintText={messages.add_podcast_page_search_hint}
                            onChange={this.handleUpdateInput}
                            onKeyPress={this.handleSearchInputKeyPress}
                            autoFocus
                            fullWidth={true}
                            style={{height: 50}} />
                    </div>
                    <div className={secondColumn}>
                        <IconButton onClick={this.handleClickSearch} iconClassName={icons.search} />
                    </div>
                </div>
            </Paper>
        );
    }

}

SearchBox.propTypes = {
    messages: React.PropTypes.object,
    searching: React.PropTypes.bool,
    searchingForTerm: React.PropTypes.func,
    getPodcasts: React.PropTypes.func
};

// React-Redux integration...
function mapStateToProps(state) {
    return {
        messages: state.messages,
        searching: state.add_podcast.searching
    };
}

export default connect(mapStateToProps, { searchingForTerm, getPodcasts })(SearchBox);
