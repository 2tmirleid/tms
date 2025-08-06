import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class FolderContextOptionMethods extends BaseMethods {
    async getOptions() {
        return await axios.get(`${this.BASE_URI}/folder/option`);
    }
}