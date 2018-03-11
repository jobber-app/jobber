import { observable, computed } from "mobx";

class Store {
    constructor (apiData) {
        var apiJobs = apiData.jobs;
        for (var ii in apiJobs) this.rawJobs.push(apiJobs[ii]);
    }
    @observable rawJobs = [];
    @computed get jobs () {
        var jobs = this.rawJobs.map(job => new Job(job));
        return jobs;
    }

    getJobById (id) {
        for (var ii in this.jobs) {
            if (this.jobs[ii].id.value === id) return this.jobs[ii];
        }
    }
}

class Job {
    constructor (fields) {
        for (var index in fields) this[index] = observable(fields[index]);
    }
    @computed get colour () {
        switch (this.status) {
            case 0: "danger"; break;
            case 1: "warning"; break;
            case 2: "info"; break;
            case 3: "success"; break;
        }
    }
}

var mockStoreData = {
    jobs: [
        { id: 12, title: "Analyst",         employer: "Beare's Boys" },
        { id: 93, title: "Central Gibbit",  employer: "Derek and Sons" }
    ]
}
var store = new Store(mockStoreData);
window.store = store;
export default store;
