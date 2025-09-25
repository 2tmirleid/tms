import {BaseMethods} from "@/api/baseMethods.js";

export class ScenarioCommentMethods extends BaseMethods {
    async getComments(scenarioID) {
        return await this.instance.get(`${this.BASE_URI}/scenario/comment?scenarioID=${scenarioID}`);
    }

    async createComment(scenarioID, body) {
        return await this.instance.post(`${this.BASE_URI}/scenario/comment?scenarioID=${scenarioID}`, body);
    }
}