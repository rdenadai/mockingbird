import React, { Component, findDOMNode } from 'react';
const Velocity = require('velocity-animate');

class AnimatedBox extends Component {
    componentWillEnter(callback) {
        const el = findDOMNode(this);
        console.log(el);
        console.log(callback);
        Velocity(el).velocity({ opacity: 1, visibility: 'visible' }, {
            complete: function(elements) {
                console.log(elements);
            }
        });
        // TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
    }

    componentWillLeave(callback) {
        const el = findDOMNode(this);
        console.log(el);
        console.log(callback);
        Velocity(el).velocity({ opacity: 0, visibility: 'hidden' }, {
            complete: function(elements) {
                console.log(elements);
            }
        });
        // TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
    }

    render() {
        const children = this.props.children;
        console.log('here');
        return (
            <div key={this.props.id}>
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
