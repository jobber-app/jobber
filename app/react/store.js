import MobX from "react-mobx";
import lodash from "lodash";

class Store {
    @observable applications = [];
    @computed get titles () {
        this.applications
    }
}
