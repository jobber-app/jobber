import React from "react";
import { Link, Switch, Route } from "react-router-dom";

import store from "./store";

import { JobsList, CVsList } from "./List";
import Details from "./Details";
import Summary from "./Summary";
import Title from "./Title";
import ResourceCreator from "./ResourceCreator";

export default class Layout extends React.Component {
    get appsActive () { return this.props.location.pathname.match(/^\/jobs/); }
    get cvsActive () { return this.props.location.pathname.match(/^\/cvs/); }
    toolbarDefault = "col-2 rounded-0 btn-themed btn btn-lg ml-2";
    toolbarClass (isActive) { 
        if (!isActive) return this.toolbarDefault;
        return this.toolbarDefault + " active";
    }

    render () {
        return (
<div class="container-fluid no-gutters d-flex flex-column h-100">
    <Title />
    <div class="row no-flex" id="toolbar">
        <Link to="/jobs" 
              class={ this.toolbarClass(this.appsActive) } 
              id="jobs">
            Jobs
        </Link>
        <Link to="/cvs" 
              class={ this.toolbarClass(this.cvsActive) } 
              id="cvs">
            CVs
        </Link>
    </div>
    <div class="row" id="page">
        <div class="col-3 p-1 h-100 list">
            <ResourceCreator class="w-100 d-flex justify-content-center"
                             subject="Job">
                <input class="form-control" type="text" require="true"
                       placeholder="Name for new job"/>
            </ResourceCreator>
            <Switch>
                <Route path="/jobs/:id?" component={ JobsList }/>
                <Route path="/cvs" component={ CVsList }/>
            </Switch>
        </div>
        <div class="col p-2 h-100" id="details">
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


