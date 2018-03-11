import React from "react";
import { Link } from "react-router-dom";

import List from "./List";

export default class Layout extends React.Component {
    constructor () {
        super()
    }

    get appsActive () { return this.props.location.pathname === "/applications" }
    get cvsActive  () { return this.props.location.pathname === "/cvs" }

    render () {
        console.log(this.props.location, this.props.location.pathname === "/applications");
        return (
<div className="container-fluid no-gutters">
    <div className="row" id="toolbar">
        <div className={ "col-2 rounded-0 page-button btn btn-lg ml-2 " + (this.appsActive ? "font-weight-bold active" : "") } id="applications"><Link to="/applications">Applications</Link></div>
        <div className={ "col-2 rounded-0 page-button btn btn-lg ml-2 " + (this.cvsActive  ? "font-weight-bold active" : "") } id="cvs"><Link to="/cvs">CVs</Link></div>
    </div>
    <div className="row" id="page">
        <div className="col-2" id="list">a</div>
        <div className="col" id="details">b</div>
    </div>
</div>
        );
    }
}


