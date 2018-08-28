import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import Flickr from '../components/Flickr/Flickr';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/flickr" component={Flickr} exact />
            </Switch>
        </Router>
    );
};

export default Root;

