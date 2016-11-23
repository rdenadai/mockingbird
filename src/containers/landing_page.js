import { css } from '../css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cardImg: '/static/img/cover.png'
        };
    }

    render() {
        return (
            <div>
                <Card>
                    <CardMedia>
                        <img src={this.state.cardImg} />
                    </CardMedia>
                    <CardTitle title="{this.props.messages.title}" />
                    <CardText>{this.props.messages.title_text}</CardText>
                    <CardActions>
                        <FlatButton label="{this.props.messages.btn_new_podcast_label}" />
                    </CardActions>
                </Card>
                <FloatingActionButton
                    href="/app/add"
                    className={css.baseCSS.floatActionButton}
                    secondary={true}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

LandingPage.propTypes = {
    messages: React.PropTypes.object.isRequired
};

// React-Redux integration...
function mapStateToProps(state) {
    return { messages: state.messages };
}

export default connect(mapStateToProps)(LandingPage);
