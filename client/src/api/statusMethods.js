import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class StatusMethods extends BaseMethods {
    async getStatuses() {
        return await this.instance.get(`${this.BASE_URI}/scenario/status`);
    }
}