import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class PageMethods extends BaseMethods {
    async getPages() {
        return axios.get(`${this.BASE_URI}/page`);
    }
}