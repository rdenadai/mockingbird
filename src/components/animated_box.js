import { css } from '../css';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Velocity from 'velocity-animate';

// const uuid = require('uuid');


class AnimatedBox extends Component {
    constructor(props) {
        super(props);

        this.state = { mounted: false };
    }

    componentWillMount() {
        // silence
    }

    componentWillAppear(callback) {
        // const el = findDOMNode(this);
        const el = findDOMNode(this);
        Velocity(el, { opacity: 1 }, { visibility: 'visible' }, 800)
        .then(() => {
            this.setState({ mounted: true });
            callback();
        });
    }

    componentWillEnter(callback) {
        // const el = findDOMNode(this);
        callback();
    }

    componentDidEnter() {
        const el = findDOMNode(this);
        Velocity(el, { opacity: 1 }, { visibility: 'visible' }, 800)
        .then(() => {
            this.setState({ mounted: true });
        });
    }

    componentWillLeave(callback) {
        const el = findDOMNode(this);
        Velocity(el, { opacity: 0 }, { visibility: 'hidden' }, { delay: 250, duration: 800 })
        .then(() => {
            this.setState({ mounted: false });
            callback();
        });
    }

    render() {
        const children = !!this.props.children ? this.props.children : null;
        return (
            <div className={css.baseCSS.animatedBox + ' ' + css.baseCSS.fullHeight}>
                {children}
            </div>
        );
    }
}

AnimatedBox.propTypes = {
    id: React.PropTypes.string,
    children: React.PropTypes.node
};

export default AnimatedBox;
