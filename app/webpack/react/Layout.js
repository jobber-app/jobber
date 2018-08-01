import React from "react";
//import { Link, Switch, Route } from "react-router-dom";
import { Router } from "preact-router";
import { Match, Link } from "preact-router/match";

import store from "./store";

import { JobsList, CVsList } from "./List";
import { JobCreator, CVCreator } from "./ResourceCreator";
import Job from "./Job";
import JobSummary from "./JobSummary";
import Title from "./Title";

export default class Layout extends React.Component {
    get creator () {
        return (
        <Router>
            <JobCreator path="/app/jobs/:id?" />
            <CVCreator  path="/app/cvs"       />
        </Router>
        );
    }
    get list () {
        return (
        <Router>
            <JobsList   path="/app/jobs/:id?" />
            <CVsList    path="/app/cvs"       />
        </Router>
        )
    }

    get focus () {
        return (
        <Router>
            <Job        path="/jobs/:id" />
            <JobSummary path="/jobs"     />
            <Match path="/">
                { _ => (
                    `Welcome to Jobber!
                    Click a tab above to start!`
                ) }
            </Match>
        </Router>
        )
    }

    render () {
        return (
<div class="container-fluid no-gutters d-flex flex-column h-100">
    <Title />
    <Toolbar />
    <div class="row" id="page">
        <div class="list">
            { this.creator }
            { this.list }
        </div>
        <div class="col p-2 h-100" id="details">
            <div class="container-fluid no-gutters h-100">
                { this.focus }
            </div>
        </div>
    </div>
</div>
        );
    }
}

class Toolbar extends React.Component {
    get appsActive () { return this.props.location.pathname.match(/^\/jobs/); }
    get cvsActive () { return this.props.location.pathname.match(/^\/cvs/); }
    toolbarDefault = "col-2 rounded-0 btn-themed btn btn-lg ml-2";
    toolbarClass (isActive) {
        if (!isActive) return this.toolbarDefault;
        return this.toolbarDefault + " active";
    }

    render () {
        return (
        <div class="row no-flex" id="toolbar">
            <Link href="/app/jobs"
                  class={ this.toolbarClass(true) }
                  id="jobs">
                Jobs
            </Link>
            <Link href="/app/cvs"
                  class={ this.toolbarClass(false) }
                  id="cvs">
                CVs
            </Link>
        </div>
        );
    }
}
