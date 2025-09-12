import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class LaunchMethods extends BaseMethods {
    async createLaunch(projectID, body) {
        return await axios.post(`${this.BASE_URI}/launch?projectID=${projectID}`, body);
    }

    async getLaunches(projectID) {
        return await axios.get(`${this.BASE_URI}/launch?projectID=${projectID}`);
    }

    async getLaunch(id) {
        return await axios.get(`${this.BASE_URI}/launch/${id}`);
    }

    async updateLaunch(id, body) {
        return await axios.patch(`${this.BASE_URI}/launch/${id}`, body);
    }

    async searchLaunch(body) {
        return await axios.post(`${this.BASE_URI}/launch/search`, body);
    }
}