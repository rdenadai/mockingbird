import { css } from '../css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';


const center = {
    textAlign: 'center'
};

const minHeightStyle = {
    minHeight: '250px'
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

        this.state = {
            dataSource: [],
        };
    }

    handleUpdateInput = (value) => {
        this.setState({
            searchTerm: value,
            dataSource: [
                value,
                value + '_' + value,
            ],
        });
    }

    handleClickSearch = (evt) => {
        console.log(evt);
        console.log(this.state.searchTerm);
    }

    render() {
        const messages = this.props.messages;
        return (
            <div>
                <div style={{textAlign: 'justify'}}>
                    {messages.add_podcast_page_content}
                </div>
                <br />
                <div style={minHeightStyle}>
                    <Paper zDepth={1} style={{height: 55}}>
                        <div className={css.flexBoxGrid.row} style={{padding: 5}}>
                            <div className={firstColumn} style={center}>
                                <AutoComplete
                                    searchText={this.state.searchTerm}
                                    key="textfieldSearchPodcast"
                                    dataSource={this.state.dataSource}
                                    onUpdateInput={this.handleUpdateInput}
                                    hintText={messages.add_podcast_page_search_hint}
                                    fullWidth={true}
                                    style={{height: 60}} />
                            </div>
                            <div className={secondColumn}>
                                <IconButton onClick={this.handleClickSearch} iconClassName={icons.search} />
                            </div>
                        </div>
                    </Paper>
                </div>
                <br /><Divider /><br />
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
