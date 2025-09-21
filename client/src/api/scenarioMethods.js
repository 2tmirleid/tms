import axios from "axios";
import {BaseMethods} from "@/api/baseMethods.js";

export class ScenarioMethods extends BaseMethods {
    getScenariosList(projectID) {
        return this.instance.get(`${this.BASE_URI}/scenario?projectID=${projectID}`);
    }

    getScenarioByID(id) {
        return this.instance.get(`${this.BASE_URI}/scenario/${id}`);
    }

    async createScenario(projectID, body) {
        return await this.instance.post(`${this.BASE_URI}/scenario?projectID=${projectID}`, body);
    }

    async updateScenario(id, body) {
        return await this.instance.patch(`${this.BASE_URI}/scenario/${id}`, body);
    }

    async deleteScenario(id) {
        return await this.instance.delete(`${this.BASE_URI}/scenario/${id}`)
    }

    async deleteStep(id) {
        return await this.instance.delete(`${this.BASE_URI}/scenario/step/${id}`);
    }

    async deleteTag(id) {
        return await this.instance.delete(`${this.BASE_URI}/scenario/tag/${id}`);
    }

    async deleteAttachment(id) {
        return await this.instance.delete(`${this.BASE_URI}/scenario/attachment/${id}`);
    }

    async searchScenario(body) {
        return await this.instance.post(`${this.BASE_URI}/scenario/search`, body);
    }

    async importScenario(projectID, formData) {
        return await this.instance.post(`${this.BASE_URI}/scenario/import?projectID=${projectID}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    async uploadAttachment(id, formData) {
        return await this.instance.post(`${this.BASE_URI}/scenario/attachment/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}