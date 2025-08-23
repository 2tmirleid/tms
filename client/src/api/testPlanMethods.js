import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class TestPlanMethods extends BaseMethods {
    async getTestPlans() {
        return await axios.get(`${this.BASE_URI}/test-plan`);
    }

    async createTestPlan(body) {
        return await axios.post(`${this.BASE_URI}/test-plan`, body);
    }

    async updateTestPlan(id, body) {
        return await axios.patch(`${this.BASE_URI}/test-plan/${id}`, body);
    }

    async deleteTestPlan(id) {
        return await axios.delete(`${this.BASE_URI}/test-plan/${id}`);
    }

    async searchTestPlan(body) {
        return await axios.post(`${this.BASE_URI}/test-plan/search`, body);
    }
}