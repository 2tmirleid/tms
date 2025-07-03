import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class SortMethods extends BaseMethods {
    async getSortOptions() {
        return await axios.get(`${this.BASE_URI}/scenario/sort`);
    }
}