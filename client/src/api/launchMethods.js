import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class LaunchMethods extends BaseMethods {
    async createLaunch(body) {
        return await axios.post(`${this.BASE_URI}/launch`, body);
    }

    async getLaunches() {
        return await axios.get(`${this.BASE_URI}/launch`);
    }

    async getLaunch(id) {
        return await axios.get(`${this.BASE_URI}/launch/${id}`);
    }

    async updateLaunch(id, body) {
        return await axios.patch(`${this.BASE_URI}/launch/${id}`, body);
    }
}