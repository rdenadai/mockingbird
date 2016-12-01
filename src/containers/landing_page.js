import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class LandingPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const messages = this.props.messages;
        const content = messages.title_text;

        return (
            <div>
                <Card>
                    <CardMedia>
                        <img src="/static/img/cover.png" alt="Cover" />
                    </CardMedia>
                    <CardTitle title={messages.title} />
                    <CardText>
                        <div style={{textAlign: 'justify'}} dangerouslySetInnerHTML={{__html: content}} />
                    </CardText>
                    <CardActions>
                        <Link to="/app/add">
                            <FlatButton label={messages.btn_new_podcast_label} />
                        </Link>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

LandingPage.propTypes = {
    messages: React.PropTypes.object
};

// React-Redux integration...
function mapStateToProps(state) {
    return { messages: state.messages };
}

export default connect(mapStateToProps)(LandingPage);
