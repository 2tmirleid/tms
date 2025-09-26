import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class ProjectMethods extends BaseMethods {
    async getProjects() {
        return await this.instance.get(`${this.BASE_URI}/project`);
    }

    async createProject(body) {
        return await this.instance.post(`${this.BASE_URI}/project`, body);
    }

    async getProject(id) {
        return await this.instance.get(`${this.BASE_URI}/project/${id}`);
    }
}