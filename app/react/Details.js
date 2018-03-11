import React from "react";
import { observer } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import store from "./store";

export default @observer class Details extends React.Component {
    get job () {
        return store.getJobById(parseInt(this.props.match.params.id));
    }
    render () {
        return (
<div class="container-fluid no-gutters">
    <h3>{ this.job.title.value }</h3>
</div>
        )
    }
}
