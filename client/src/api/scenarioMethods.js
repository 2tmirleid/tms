import axios from "axios";
import {BaseMethods} from "@/api/baseMethods.js";

export class ScenarioMethods extends BaseMethods{
    getScenariosList() {
        return axios.get(`${this.BASE_URI}/scenarios`);
    }

    getScenarioByID(id) {
        return axios.get(`${this.BASE_URI}/scenarios/${id}`);
    }
}