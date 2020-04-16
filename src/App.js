/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/img-has-alt */
import React, { Component } from 'react';
import moment from 'moment';

import io from 'socket.io-client';

const locationHost = window.location.host ||'';
const endpoint = locationHost.indexOf('localhost') >= 0 ?  "http://127.0.0.1:5000" : "https://online-friendly-poker.herokuapp.com";

const socket =  io(endpoint);
import OnlineMode from "./components/OnlineMode";

const ONLINE = 'online';
// eslint-disable-next-line
Date.prototype.AsGameName = function() {
    const stringValue = this.toISOString().substr(0,10);
    const day = stringValue.substr(8,2);
    const month = stringValue.substr(5,2);
    const year = stringValue.substr(0,4);
    return `${day}/${month}/${year}`;
};

// eslint-disable-next-line
Date.prototype.AsExactTime = function() {
    return this.toISOString().substr(11,5);
};
// eslint-disable-next-line
String.prototype.AsGameName = function() {
    const date = new Date(this);
    return date.AsGameName()
};

// eslint-disable-next-line
String.prototype.AsExactTime = function(hours) {
    return moment(this).add(hours, 'hours').toDate().AsExactTime()
};

class App extends Component {
    render() {
        return <OnlineMode socket={socket}/>
    }
}

export default App;

