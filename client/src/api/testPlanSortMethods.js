import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class TestPlanSortMethods extends BaseMethods {
    async getSortOptions() {
        return await axios.get(`${this.BASE_URI}/test-plan/sort`);
    }
}