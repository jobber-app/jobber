import React from "react";
import { Link } from "preact-router/match";
import { observer } from "mobx-react";
import Modal from "./Modal";
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

    componentWillMount () {
        if (this.props.onSelect === undefined) this.onSelect = () => {}
        else {
            this.onSelect = function (id, e) {
                e.preventDefault();
                this.props.onSelect(id);
            }
        }
    }

    // If there is no Route match, then return undefined. Else parseInt
    get matchId () {
        if (this.props.match === undefined) return;
        if (this.props.match.params === undefined) return;
        if (this.props.match.params.id === undefined) return;
        
        return parseInt(this.props.match.params.id);
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
        // Convert filters.values from iterable to Array
        var filtersArray = [...this.state.filters.values()] 
        // Iterate over every filter, if all pass then return true
        return filtersArray.every(f => f(item));
    }

    subject () { return ""; }

    render () {
        return (
<div class="d-flex flex-column yes-flex">
    <div id="filter">
        <div class="input-group">
            <input type="text"
                   class="form-control" 
                   onChange={ e => this.updateTextSearch(e.target.value) }
                   placeholder={ "Search Your " + this.subject(true) }
                   id="search"/>
        </div>
        <div class="btn-mini w-100" onClick={ this.toggleAdvanced.bind(this) }>
             Advanced Search { this.state.advanced ? "[-]" : "[+]" }
        </div>
        <div class={ "collapse pb-1 " + (this.state.advanced ? "show" : "") }
             id="advanced-search">
            { this.advancedSearch() }
        </div>
    </div>
    <ul class="listItems list-group active">
        { this.items.filter(this.isValid, this).map(this.itemToEl, this) }
    </ul>
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
            this.statusFilters[name] = item => (item.status.get() !== status);
        }
    }

    subject (pluralize) { return "Job" + (pluralize ? "s" : ""); }

    itemToEl (data) {
        var active = this.matchId === data.id.get() ? " active " : "";
        return (
<Link href={ "/app/jobs/" + data.id.get() } 
      class={ "text-left list-item list-item-" + data.colour + active }
      key={ data.id.get() }
      onClick={ this.onSelect.bind(this, data.id.get()) }
      >
    <h5>{ data.title.get() }</h5>
    <h6>{ data.employer.get() }</h6>
    <span>
        <small><b>Stage: </b></small>
        <span class={ "badge badge-pill badge-" + data.colour }>
            { data.stage }
        </span>
    </span>
</Link>
        )
    }
    
    get items () { return store.jobs; }

    toggleFilter = (id, f) => () => {
        var f = f || this.statusFilters[id];
        var newState = Object.assign({}, this.state);
        newState.interfaces[id] = !newState.interfaces[id];
        if (newState.filters.has(f)) newState.filters.delete(f);
        else                         newState.filters.add(f);
        this.setState(newState);
    }

    advancedSearch () {
        return (
<div>
    <input type="checkbox" 
           checked={ this.state.interfaces["planning"] } 
           onChange={ this.toggleFilter("planning") }
           />
    <label class="form-check-label">Planning Stage</label><br/>

    <input type="checkbox"
           checked={ this.state.interfaces["application"] }
           onChange={ this.toggleFilter("application") }
           />
    <label class="form-check-label">Application Stage</label><br/>
    
    <input type="checkbox" 
           checked={ this.state.interfaces["interviews"] } 
           onChange={ this.toggleFilter("interviews") }
           />
    <label class="form-check-label">Interviews Stage</label><br/>
    
    <input type="checkbox" 
           checked={ this.state.interfaces["offer"] } 
           onChange={ this.toggleFilter("offer") }
           />
    <label class="form-check-label">Offer Stage</label><br/>
    {/*<input type="checkbox" checked="true"/>
       <label class="form-check-label">Archived</label><br/>*/}
</div>
        );
    }
}

@observer class CVsList extends List {
    get items () { return store.cvs; }
    itemToEl (cv) {
        return (
        <Link href={ "/app/cvs/" + cv.id.get() }
              class="list-item"
              key={ cv.key }
              onClick={ this.onSelect.bind(this, cv.id.get()) }>
            { cv.name.get() }
        </Link>
        );
    }
    advancedSearch () {
        return (
            <div>No advanced features for cvs</div>
        );
    }
}

export { JobsList, CVsList };
