import axios from "axios";
import {BaseMethods} from "@/api/baseMethods.js";

export class ScenarioMethods extends BaseMethods {
    getScenariosList() {
        return axios.get(`${this.BASE_URI}/scenario`);
    }

    getScenarioByID(id) {
        return axios.get(`${this.BASE_URI}/scenario/${id}`);
    }

    async createScenario(body) {
        await axios.post(`${this.BASE_URI}/scenario`, body);
    }

    async updateScenario(id, body) {
        await axios.patch(`${this.BASE_URI}/scenario/${id}`, body);
    }

    async deleteScenario(id) {
        await axios.delete(`${this.BASE_URI}/scenario/${id}`)
    }

    async deleteStep(id) {
        await axios.delete(`${this.BASE_URI}/scenario/step/${id}`);
    }

    async deleteTag(id) {
        await axios.delete(`${this.BASE_URI}/scenario/tag/${id}`);
    }

    async searchScenario(body) {
        return await axios.post(`${this.BASE_URI}/scenario/search`, body);
    }
}