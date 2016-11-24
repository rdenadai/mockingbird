import { css } from '../css';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import AnimatedBox from '../components/animated_box';

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
            <AnimatedBox id="LandingPage">
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
                <Link to="/app/add">
                    <FloatingActionButton
                        className={css.baseCSS.floatActionButton}
                        secondary={true}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>
            </AnimatedBox>
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
