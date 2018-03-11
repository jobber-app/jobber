import React from "react";
import { observer } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import store from "./store";

@observer class Summary extends React.Component {
    render () {
        return "Summary:";
    }
}
