import React from 'react';
import template from './Flickr.jsx';

class Flickr extends React.Component {
    render() {
        this.render = template;
        return this.render.call(this);
    }
}

export default Flickr;
