import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import AnimatedBox from '../components/animated_box';

export default class AddPodcast extends Component {

    render() {
        return (
            <AnimatedBox id="AddPodcastPage">
                <div>
                    Search for a podcast we have in our knowledge base or type in the url for one that you know.
                </div>
                <div>
                    <TextField hintText="Hint Text" />
                </div>
            </AnimatedBox>
        );
    }
}
