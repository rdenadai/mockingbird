import { css } from '../css';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Velocity from 'velocity-animate';


class AnimatedBox extends Component {
    constructor(props) {
        super(props);

        this.state = { mounted: false };
    }

    componentWillMount() {

    }

    componentWillAppear(callback) {
        // const el = findDOMNode(this);
        callback();
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
            <div className={css.baseCSS.animatedBox}>
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
