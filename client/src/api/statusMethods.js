import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class StatusMethods extends BaseMethods {
    async getStatuses() {
        return await axios.get(`${this.BASE_URI}/scenario/status`);
    }
}