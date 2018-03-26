import { action, observable, computed } from "mobx";

class Store {
    constructor (apiData) {
        var apiJobs = apiData.jobs;
        for (var ii in apiJobs) this.rawJobs.push(apiJobs[ii]);
        var apiCVs = apiData.cvs;
        for (var ii in apiCVs) this.rawCVs.push(apiCVs[ii]);
    }

    /* User CVs */
    @observable rawCVs = [];
    @computed get cvs () {
        var cvs = this.rawCVs.map(cv => new CV(cv));
        return cvs;
    }

    getCVById (id) {
        for (var ii in this.cvs) {
            if (this.cvs[ii].id.get() === id) return this.cvs[ii];
        }
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
        // Whether or not job view has splittable tabs
        splittable: false, 
        yankeeDates: false,
    });
}

class Job {
    constructor (fields) {
        for (var index in fields) this[index] = observable(fields[index]);
        this.key = this.id.get();
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
    @computed get stage () {
        switch (this.status.get()) {
            case 0:  return "Info";   break;
            case 1:  return "Application";  break;
            case 2:  return "Interviews";     break;
            case 3:  return "Offer";  break;
            default: return "";         break;
        }
    }
}

class CV {
    constructor (fields) {
        for (var index in fields) this[index] = observable(fields[index]);
        this.key = this.id.get();
    }
}

var mockStoreData = {
    jobs: [
        { id: 12, title: "Analyst", status: 0, 
          date: "2018-03-02 17:02:01",
          employer: "Beare's Boys", cv: 13,
          description: "Analyze for us!" },
        { id: 93, title: "Central Manager", status: 1,
          date: "2018-03-02 17:02:01",
          employer: "Derek and Sons", cv: 93, 
          description: "Manage things!" },
        { id: 54, title: "Etherium Expert", status: 2, 
          date: "2018-03-02 17:02:01",
          employer: "Fully Loaded Inc.", cv: 11, 
          description: "Give us blockchain." },
        { id: 51, title: "Gardening Guru",  status: 1, 
          date: "2018-03-02 17:02:01",
          employer: "Happy Records", cv: null, 
          description: "Demanding shrubberies!" },
    ],
    cvs: [
        { id: 13, name: "Web Dev 1", 
          description: "My first web dev cv." },
        { id: 93, name: "Web Dev 2", 
          description: "My second web dev cv, with React experience!" },
        { id: 11, name: "Manager", 
          description: "For applying to juicy management positions." },
    ]
}
var store = new Store(mockStoreData);
window.store = store;
export default store;
