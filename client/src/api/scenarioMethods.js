import axios from "axios";
import {BaseMethods} from "@/api/baseMethods.js";

export class ScenarioMethods extends BaseMethods {
    getScenariosList() {
        return axios.get(`${this.BASE_URI}/scenarios`);
    }

    getScenarioByID(id) {
        return axios.get(`${this.BASE_URI}/scenarios/${id}`);
    }

    async createScenario(body) {
        await axios.post(`${this.BASE_URI}/scenarios/create`, body);
    }

    async updateScenario(id, body) {
        await axios.patch(`${this.BASE_URI}/scenarios/${id}`, body);
    }

    async deleteStep(id) {
        await axios.delete(`${this.BASE_URI}/scenarios/steps/${id}`);
    }
}