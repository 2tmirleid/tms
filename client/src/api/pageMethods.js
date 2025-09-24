import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class PageMethods extends BaseMethods {
    async getPages() {
        return await this.instance.get(`${this.BASE_URI}/page`);
    }
}