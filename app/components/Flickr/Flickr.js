import React from 'react';
import {
    curry,
    compose,
    prop,
    map,
} from 'ramda';
import $ from 'jquery';
import template from './Flickr.jsx';

class Flickr extends React.Component {
    constructor(props) {
        super(props);
        this.impure = {
            getJSON: curry((callback, url) => $.getJSON(url, callback)),
            setHtml: curry((sel, html) => {
                // console.error('html', html);
                $(sel).html(html);
            }),
            trace: curry((tag, x) => { console.log(tag, x); return x; }),
        };

        // pure
        this.host = 'api.flickr.com';
        this.path = '/services/feeds/photos_public.gne';
        this.query = t => `?tags=${t}&format=json&jsoncallback=?`;
        this.url = t => `https://${this.host}${this.path}${this.query(t)}`;
        this.img = src => $('<img />', { src });
        this.mediaUrl = compose(prop('m'), prop('media'));
        this.mediaToImg = compose(this.img, this.mediaUrl);
        this.images = compose(map(this.mediaToImg), prop('items'));

        // impure
        this.append = compose(this.impure.setHtml('#js-main'), this.images);
        this.app = compose(this.impure.getJSON(this.append), this.url);
    }

    componentDidMount() {
        this.app('cats');
    }

    render() {
        this.render = template;
        return this.render.call(this);
    }
}

export default Flickr;
