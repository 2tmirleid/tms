import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class LaunchResultMethods extends BaseMethods {
    async getResults(id) {
        return await this.instance.get(`${this.BASE_URI}/launch/result/list/${id}`);
    }

    async getResult(id) {
        return await this.instance.get(`${this.BASE_URI}/launch/result/${id}`);
    }

    async updateResult(id, body) {
        return await this.instance.patch(`${this.BASE_URI}/launch/result/${id}`, body);
    }
}