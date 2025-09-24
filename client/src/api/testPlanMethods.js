import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class TestPlanMethods extends BaseMethods {
    async getTestPlans(projectID) {
        return await this.instance.get(`${this.BASE_URI}/test-plan?projectID=${projectID}`);
    }

    async createTestPlan(projectID, body) {
        return await this.instance.post(`${this.BASE_URI}/test-plan?projectID=${projectID}`, body);
    }

    async updateTestPlan(id, body) {
        return await this.instance.patch(`${this.BASE_URI}/test-plan/${id}`, body);
    }

    async deleteTestPlan(id) {
        return await this.instance.delete(`${this.BASE_URI}/test-plan/${id}`);
    }

    async searchTestPlan(body) {
        return await this.instance.post(`${this.BASE_URI}/test-plan/search`, body);
    }
}