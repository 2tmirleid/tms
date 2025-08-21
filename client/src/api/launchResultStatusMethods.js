import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class LaunchResultStatusMethods extends BaseMethods {
    async getStatuses() {
        return await axios.get(`${this.BASE_URI}/launch/result/status`);
    }
}