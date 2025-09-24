import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class LaunchMethods extends BaseMethods {
    async createLaunch(projectID, body) {
        return await this.instance.post(`${this.BASE_URI}/launch?projectID=${projectID}`, body);
    }

    async getLaunches(projectID) {
        return await this.instance.get(`${this.BASE_URI}/launch?projectID=${projectID}`);
    }

    async getLaunch(id) {
        return await this.instance.get(`${this.BASE_URI}/launch/${id}`);
    }

    async updateLaunch(id, body) {
        return await this.instance.patch(`${this.BASE_URI}/launch/${id}`, body);
    }

    async searchLaunch(body) {
        return await this.instance.post(`${this.BASE_URI}/launch/search`, body);
    }
}