import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class ProjectMethods extends BaseMethods {
    async getProjects() {
        return await axios.get(`${this.BASE_URI}/project`);
    }

    async createProject(body) {
        return await axios.post(`${this.BASE_URI}/project`, body);
    }
}