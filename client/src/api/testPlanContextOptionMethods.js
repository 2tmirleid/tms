import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class TestPlanContextOptionMethods extends BaseMethods {
    async getOptions() {
        return await axios.get(`${this.BASE_URI}/test-plan/option`);
    }
}