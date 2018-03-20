import { action, observable, computed } from "mobx";

class Store {
    constructor (apiData) {
        var apiJobs = apiData.jobs;
        for (var ii in apiJobs) this.rawJobs.push(apiJobs[ii]);
    }

    /* User Jobs */
    focusedJobId = observable(-1);
    @computed get focusedJob () {
        return this.getJobById(this.focusedJobId.get());
    }
    @observable rawJobs = [];
    @computed get jobs () {
        var jobs = this.rawJobs.map(job => new Job(job));
        return jobs;
    }

    @action.bound updateFocusedId (id) {
        this.focusedJobId.set(id);
    }

    getJobById (id) {
        for (var ii in this.jobs) {
            if (this.jobs[ii].id.get() === id) return this.jobs[ii];
        }
    }
    
    /* REST API communications */
    @action.bound createJob () {}
    @action.bound updateJob () {}
    @action.bound deleteJob () {}

    /* User Settings */
    settings = observable({
        splittable: false, // Whether or not job view has splittable tabs
    });
}

class Job {
    constructor (fields) {
        for (var index in fields) this[index] = observable(fields[index]);
    }
    @computed get colour () {
        switch (this.status.get()) {
            case 0:  return "danger";   break;
            case 1:  return "warning";  break;
            case 2:  return "info";     break;
            case 3:  return "success";  break;
            default: return "";         break;
        }
    }
}

var mockStoreData = {
    jobs: [
        { id: 12, title: "Analyst",         status: 0, employer: "Beare's Boys", description: "Analyze for us!" },
        { id: 93, title: "Central Manager", status: 1, employer: "Derek and Sons", description: "Manage things!" },
        { id: 54, title: "Etherium Expert", status: 2, employer: "Fully Loaded Inc.", description: "Give us blockchain." },
        { id: 51, title: "Gardening Guru",  status: 1, employer: "Happy Records", description: "Demanding shrubberies!" },
    ]
}
var store = new Store(mockStoreData);
window.store = store;
export default store;
