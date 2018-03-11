import React from "react";
import store from "./store";
import { observer } from "mobx-react";

const UPTODATE = 0;
const UPDATING = 1;

export @observer class Editable extends React.Component {
    constructor () {
        super();
        this.state = {};
        this.state.mode = UPTODATE;
    }

    updateRemote () {
        
    }

    render () {
        updateRemote();
        return (
        )
    }
}
