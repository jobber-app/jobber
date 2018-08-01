'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import { HashRouter, Route } from "react-router-dom";
import store from "./store";

var root = document.getElementById("react-app");
ReactDOM.render(
    <Layout />
, root);
