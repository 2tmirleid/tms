import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class FolderMethods extends BaseMethods {
    async getFolders(projectID) {
        return await this.instance.get(`${this.BASE_URI}/folder?projectID=${projectID}`);
    }

    async createFolder(projectID, body) {
        return await this.instance.post(`${this.BASE_URI}/folder?projectID=${projectID}`, body);
    }

    async putScenario(scenarioID, folderID) {
        return await this.instance.post(`${this.BASE_URI}/folder/put/scenario?scenarioID=${scenarioID}&folderID=${folderID}`);
    }

    async putFolder(childFolderID, parentFolderID) {
        return await this.instance.post(`${this.BASE_URI}/folder/put/folder?childID=${childFolderID}&parentID=${parentFolderID}`);
    }

    async pullOutScenario(scenarioID) {
        return await this.instance.post(`${this.BASE_URI}/folder/pullout/scenario?scenarioID=${scenarioID}`);
    }

    async pullOutFolder(folderID) {
        return await this.instance.post(`${this.BASE_URI}/folder/pullout/folder?folderID=${folderID}`);
    }

    async updateFolder(id, body) {
        return await this.instance.patch(`${this.BASE_URI}/folder/${id}`, body);
    }

    async deleteFolder(id) {
        return await this.instance.delete(`${this.BASE_URI}/folder/${id}`);
    }
}