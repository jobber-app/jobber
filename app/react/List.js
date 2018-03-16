import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import store from "./store";

@observer class List extends React.Component {
    constructor () {
        super()
        this.state = {
            advanced: false,
            filters: new Set().add(this.matchTextSearch.bind(this)),
            interfaces: {
                "text": ""
            },
        }
    }

    matchTextSearch (item) {
        var regexp = new RegExp(this.state.interfaces["text"], "i");
        for (var prop in item) {
            if (regexp.test(item[prop])) return true;
        }
        return false;
    }

    updateTextSearch (newValue) {
        var newState = Object.assign({}, this.state);
        newState.interfaces["text"] = newValue;
        this.setState(newState);
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

    isValid (item) {
        var filtersArray = [...this.state.filters.values()] // Convert filters.values from iterable to Array, that way we can use .every
        return filtersArray.every(f => f(item));
    }

    render () {
        return (
<div className="d-flex flex-column h-100">   
    <div id="filter">
        <div class="input-group">
            <input type="text" class="form-control" onChange={ e => this.updateTextSearch(e.target.value) } placeholder="Search by Job Contents" id="search"/>
        </div>
        <div className="p-1 btn-light w-100 text-center" style={{ "font-size": "10px", "font-family": "monospace", "cursor": "pointer" }} onClick={ this.toggleAdvanced.bind(this) }>Advanced Search { this.state.advanced ? "[-]" : "[+]" }</div>
        <div class={ "collapse pb-1 " + (this.state.advanced ? "show" : "") } id="advanced-search">{ this.advancedSearch() }</div>
    </div>
    <ul id="listItems" className="list-group active">{ this.items.filter(this.isValid.bind(this)).map(this.itemToEl.bind(this)) }</ul>
</div>
        )
    }
}

@observer class JobsList extends List {
    constructor () {
        super()
        var checkboxes = ["planning", "application", "interviews", "offer"];
        this.statusFilters = {};
        for (var ii = 0; ii < checkboxes.length; ii++) {
            var name = checkboxes[ii];
            this.state.interfaces[name] = true;
            let status = ii;
            this.statusFilters[name] = item => { return item.status.get() !== status };
        }
    }
    itemToEl (a) {
        return <JobItem data={ a }/>
    }
    get items () { return store.jobs; }
    toggleFilter = (id, f) => () => {
        var newState = Object.assign({}, this.state);
        newState.interfaces[id] = !newState.interfaces[id];
        if (newState.filters.has(f)) newState.filters.delete(f);
        else                         newState.filters.add(f);
        this.setState(newState);
    }

    advancedSearch () {
        return (
            <div>
                <input type="checkbox" checked={ this.state.interfaces["planning"] } onChange={ this.toggleFilter("planning", this.statusFilters["planning"]) }/><label class="form-check-label">Planning Stage</label><br/>
                <input type="checkbox" checked={ this.state.interfaces["application"] } onChange={ this.toggleFilter("application", this.statusFilters["application"]) }/><label class="form-check-label">Application Stage</label><br/>
                <input type="checkbox" checked={ this.state.interfaces["interviews"] } onChange={ this.toggleFilter("interviews", this.statusFilters["interviews"]) }/><label class="form-check-label">Interviews Stage</label><br/>
                <input type="checkbox" checked={ this.state.interfaces["offer"] } onChange={ this.toggleFilter("offer", this.statusFilters["offer"]) }/><label class="form-check-label">Offer Stage</label><br/>
                <input type="checkbox" checked="true"/><label class="form-check-label">Archived</label><br/>
            </div>
        );
    }
}

@observer class CVsList extends List {
    items = [];
    itemToEl = a => a.toString();
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
