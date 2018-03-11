import React from "react";
import { Link, Switch, Route } from "react-router-dom";

import store from "./store";

import List from "./List";
import Details from "./Details";
import Summary from "./Summary";

export default class Layout extends React.Component {
    constructor () {
        super()
    }

    get appsActive () { return this.props.location.pathname === "/jobs" }
    get cvsActive  () { return this.props.location.pathname === "/cvs" }

    render () {
        return (
<div className="container-fluid no-gutters">
    <div className="row" id="toolbar">
        <Link to="/jobs" className={ "col-2 rounded-0 page-button btn btn-lg ml-2 " + (this.appsActive ? "font-weight-bold active" : "") } id="jobs">Jobs</Link>
        <Link to="/cvs" className={ "col-2 rounded-0 page-button btn btn-lg ml-2 " + (this.cvsActive  ? "font-weight-bold active" : "") } id="cvs">CVs</Link>
    </div>
    <div className="row" id="page">
        <div className="col-3 m-1 p-0" id="list"><List /></div>
        <div className="col m-2" id="details">
            <Switch>
                <Route path="/jobs/:id" component={ Details }/>
                <Route path="/jobs" component={ Summary }/>
            </Switch>
        </div>
    </div>
</div>
        );
    }
}


