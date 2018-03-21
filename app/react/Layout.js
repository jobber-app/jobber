import React from "react";
import { Link, Switch, Route } from "react-router-dom";

import store from "./store";

import { JobsList, CVsList } from "./List";
import Details from "./Details";
import Summary from "./Summary";
import Title from "./Title";
import bootstrap from "bootstrap";

export default class Layout extends React.Component {
    constructor () {
        super()
    }

    get appsActive () { return this.props.location.pathname.match(/^\/jobs/); }
    get cvsActive () { return this.props.location.pathname.match(/^\/cvs/); }

    render () {
        return (
<div className="container-fluid no-gutters d-flex flex-column h-100">
    <Title />
    <div className="row no-flex" id="toolbar">
        <Link to="/jobs" className={ "col-2 rounded-0 btn-themed btn btn-lg ml-2 " + (this.appsActive ? "font-weight-bold active" : "") } id="jobs">Jobs</Link>
        <Link to="/cvs" className={ "col-2 rounded-0 btn-themed btn btn-lg ml-2 " + (this.cvsActive  ? "font-weight-bold active" : "") } id="cvs">CVs</Link>
    </div>
    <div className="row" id="page">
        <div class="col-3 p-1 list">
            <Switch>
                <Route path="/jobs/:id" component={ JobsList }/>
                <Route path="/jobs" component={ JobsList }/>
                <Route path="/cvs" component={ CVsList }/>
            </Switch>
        </div>
        <div className="col p-2 h-100" id="details">
            <div class="container-fluid no-gutters h-100">
                <Switch>
                    <Route path="/jobs/:id" component={ Details }/>
                    <Route path="/jobs" component={ Summary }/>
                </Switch>
            </div>
        </div>
    </div>
</div>
        );
    }
}


