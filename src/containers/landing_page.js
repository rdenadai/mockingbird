import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class LandingPage extends Component {
    render() {
        let messages = this.props.messages;
        if(!(!!messages)) {
            messages = {
                'title': 'Mockingbird',
                'title_text': 'Podcast App',
                'btn_new_podcast_label': 'New Podcast'
            };
        }

        const content = messages.title_text;

        return (
            <div key="LandingPage">
                <Card>
                    <CardMedia>
                        <img src="/static/img/cover.png" />
                    </CardMedia>
                    <CardTitle title={messages.title} />
                    <CardText>
                        <div dangerouslySetInnerHTML={{__html: content}} />
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
    return { messages: state.messages.messages };
}

export default connect(mapStateToProps)(LandingPage);
