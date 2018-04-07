import React from "react";
import { observer } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import store from "./store";

export default @observer class Summary extends React.Component {
    jobsWithStatus (status) {
        var jobs = store.jobs.filter(job => job.status.get() === status);
        var c = jobs.length;
        return c;
    }

    render () {
        return (
<div>
    <h4>Your Overview:</h4>
    <p>You have 
       { " " + this.jobsWithStatus(0).toString() + " " } 
       jobs that are in the info stage.</p>
    <p>You have
       { " " + this.jobsWithStatus(1).toString() + " " } 
       jobs that are in the application stage.</p>
    <p>You have
       { " " + this.jobsWithStatus(2).toString() + " " } 
       jobs that are in the interview stage.</p>
    <p>You have
       { " " + this.jobsWithStatus(3).toString() + " " } 
       jobs that are completed.</p>
</div>
        );
    }
}
