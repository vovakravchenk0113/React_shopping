import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/Home';
import Categories from './components/Categories';
import ItemsList from './components/ItemsList';
import Item from './components/Item';
import Demo from './components/Demo';
import Participant from './components/Participant'

let router =  (
    <Router history={browserHistory}>
        <Route path = '/' component={Categories}></Route>
        <Route path = '/home' component={Categories}></Route>
        <Route path = '/categories' component={Categories}></Route>
        <Route path = '/items' component={ItemsList}></Route>
        <Route path = '/item' component={Item}></Route>
        <Route path = '/demo' component={Demo}></Route>
        <Route path = '/participant' component={Participant}></Route>
    </Router>
);

ReactDOM.render(
    router,
    document.getElementById('app')
);;