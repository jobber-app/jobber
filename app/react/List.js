import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import store from "./store";

@observer class List extends React.Component {
    constructor () {
        super()
        this.state = {
            advanced: false,
            filters: new Set()
        }
    }

    toggleAdvanced () {
        var newState = Object.assign({}, this.state);
        newState.advanced = !newState.advanced;
        this.setState(newState);
    }

    addFilter (f) {
        var newState = Object.assign({}, this.state);
        newState.filters.add(f);
        this.setState(newState);
    }

    deleteFilter (f) {
        var newState = Object.assign({}, this.state);
        newState.filters.delete(f);
        this.setState(newState);
    }

    filterer (items) {
        var filtersArray = [...this.state.filters.values()] // Convert filters.values from iterable to Array, that way we can use .every
        return items.filter(item => filtersArray.every(f => f(item)));
    }

    render () {
        return (
<div className="d-flex flex-column h-100">   
    <div id="filter">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Filter by Name" id="search"/>
            <div className="input-group-append">
                <button class="btn btn-primary">Search</button>
            </div>
        </div>
        <div className="pt-1 btn-light w-100 text-center" style={{ "font-size": "10px", "font-family": "monospace", "cursor": "pointer" }} onClick={ this.toggleAdvanced.bind(this) }>Advanced Search { this.state.advanced ? "[-]" : "[+]" }</div>
        <div class={ "collapse pb-1 " + (this.state.advanced ? "show" : "") } id="advanced-search">{ this.advancedSearch() }</div>
    </div>
    <ul id="listItems" className="list-group active">{ this.filterer(this.items).map(this.itemToEl) }</ul>
</div>
        )
    }
}

@observer class JobsList extends List {
    items = store.jobs;
    itemToEl (a) {
        return <JobItem data={ a }/>
    }
    advancedSearch () {
        return (
            <div>
                <input type="checkbox" checked="true"/><label class="form-check-label">Planning Stage</label><br/>
                <input type="checkbox" checked="true"/><label class="form-check-label">Application Stage</label><br/>
                <input type="checkbox" checked="true"/><label class="form-check-label">Interviews Stage</label><br/>
                <input type="checkbox" checked="true"/><label class="form-check-label">Offer Stage</label><br/>
                <input type="checkbox" checked="true"/><label class="form-check-label">Archived</label><br/>
            </div>
        );
    }
}

@observer class CVsList extends List {
    items = [];
    itemToEl = a => a;
    advancedSearch () {
        return (
            <div>No advanced features for cvs</div>
        );
    }
}

@observer class JobItem extends React.Component {
    render () {
        return <Link to={ "/jobs/" + this.props.data.id.get() } className={ "text-left d-flex flex-column justify-content-center m-1 btn alert-" + this.props.data.colour }><h5>{ this.props.data.title.get() }</h5><h6>{ this.props.data.employer.get() }</h6></Link>
    }
}

export { JobsList, CVsList };
