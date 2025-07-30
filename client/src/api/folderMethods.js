import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class FolderMethods extends BaseMethods {
    async getFolders() {
        return await axios.get(`${this.BASE_URI}/folder`);
    }

    async createFolder(body) {
        return await axios.post(`${this.BASE_URI}/folder`, body);
    }

    async putScenario(scenarioID, folderID) {
        return await axios.post(`${this.BASE_URI}/folder/put/scenario?scenarioID=${scenarioID}&folderID=${folderID}`);
    }

    async putFolder(childFolderID, parentFolderID) {
        return await axios.post(`${this.BASE_URI}/folder/put/folder?childID=${childFolderID}&parentID=${parentFolderID}`);
    }

    async pullOutScenario(scenarioID) {
        return await axios.post(`${this.BASE_URI}/folder/pullout/scenario?scenarioID=${scenarioID}`);
    }

    async pullOutFolder(folderID) {
        return await axios.post(`${this.BASE_URI}/folder/pullout/folder?folderID=${folderID}`);
    }
}