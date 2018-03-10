import React from "react";

export default class Layout extends React.Component {
    constructor () {
        super()
    }

    render () {
        return (
<div class="container-fluid no-gutters">
    <div class="row" id="toolbar">
        <div class="col-1 page-button " id="applications">Applications</div>
        <div class="col-1 page-button" id="cvs">CVs</div>
    </div>
</div>
        );
    }
}


