import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class AddPodcast extends Component {

    render() {
        return (
            <div>
                <div>
                    Search for a podcast we have in our knowledge base or type in the url for one that you know.
                </div>
                <div>
                    <TextField hintText="Hint Text" />
                </div>
            </div>
        );
    }
}
