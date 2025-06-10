import axios from "axios";
import {BaseMethods} from "@/api/baseMethods.js";

export class ScenarioMethods extends BaseMethods {
    getScenariosList() {
        return axios.get(`${this.BASE_URI}/scenarios`);
    }

    getScenarioByID(id) {
        return axios.get(`${this.BASE_URI}/scenarios/${id}`);
    }

    async createScenario(title) {
        const body = {
            "title": title
        }

        await axios.post(`${this.BASE_URI}/scenarios/create`, body);
    }

    async updateScenarioTitle(id, title) {
        const body = {
            "title": title
        }

        await axios.patch(`${this.BASE_URI}/scenarios/${id}`, body)
    }
}