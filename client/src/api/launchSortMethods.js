import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class LaunchSortMethods extends BaseMethods{
    async getSortOptions() {
        return await axios.get(`${this.BASE_URI}/launch/sort`);
    }
}