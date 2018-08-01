import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import { HashRouter, Route, Switch } from "react-router-dom";
import store from "./store";

var setTitle = title => { document.title = title;          return null; }
var addTitle = title => { document.title += " | " + title; return null; }
var setTitleFromId = function (id) {
    var id = parseInt(id); // Sanitize input, may be string instead
    var job = store.getJobById(id);
    setTitle(job.title.get());
    return null;
}

export default class Title extends React.Component {
    render () {
        return (null);
            /*
<div>
    <Route path="/" render={ () => setTitle("Jobber") }/>
    <Switch>
        <Route path="/cvs"  render={ () => setTitle("CVs") }/>
        <Route path="/jobs" render={ () => setTitle("Jobs") }/>
    </Switch>
    <Switch>
        <Route path="/cvs/:id"  
               render={ props => addTitle("<CV_ID>") }/>
        <Route path="/jobs/:id"  
               render={ props => setTitleFromId(props.match.params.id) }/>
    </Switch>
</div>
        );
            */
    }
}
