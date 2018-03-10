import React from "react";

export default class Layout extends React.Component {
    constructor () {
        super()
    }

    render () {
        return (
<div class="container-fluid no-gutters">
    <div class="row" id="toolbar">
        <div class={ "col-2 page-button btn btn-lg m-1" } id="applications">Applications</div>
        <div class={ "col-2 page-button btn btn-lg m-1" } id="cvs">CVs</div>
    </div>
</div>
        );
    }
}


