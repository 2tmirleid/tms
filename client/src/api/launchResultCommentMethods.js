import {BaseMethods} from "@/api/baseMethods.js";

export class LaunchResultCommentMethods extends BaseMethods {
    async getComments(resultID) {
        return await this.instance.get(`${this.BASE_URI}/launch/result/comment?resultID=${resultID}`);
    }

    async createComment(resultID, body) {
        return await this.instance.post(`${this.BASE_URI}/launch/result/comment?resultID=${resultID}`, body);
    }
}