/** @jsx React.DOM */

'use strict';

var React = require('react');
window.React = React;

var App = require('./components/app.jsx');

React.renderComponent(<App />, document.getElementById('content'));
