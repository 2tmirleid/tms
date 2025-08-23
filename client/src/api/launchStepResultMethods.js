import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class LaunchStepResultMethods extends BaseMethods {
    async getSteps(id) {
        return await axios.get(`${this.BASE_URI}/launch/result/step/list/${id}`);
    }

    async updateStepResult(id, body) {
        return await axios.patch(`${this.BASE_URI}/launch/result/step/${id}`, body);
    }
}