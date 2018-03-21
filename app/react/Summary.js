import React from "react";
import { observer } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import store from "./store";

export default @observer class Summary extends React.Component {
    render () {
        return (
<div>
    <h4>Your Overview:</h4>
    <p>You have { store.jobs.filter(job => job.status.get() === 0).length } jobs that are in the info stage.</p>
    <p>You have { store.jobs.filter(job => job.status.get() === 1).length } jobs that are in the application stage.</p>
    <p>You have { store.jobs.filter(job => job.status.get() === 2).length } jobs that are in the interview stage.</p>
    <p>You have { store.jobs.filter(job => job.status.get() === 3).length } jobs that are completed.</p>
</div>
        );
    }
}
