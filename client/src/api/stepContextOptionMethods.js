import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class StepContextOptionMethods extends BaseMethods {
    async getOptions() {
        return await this.instance.get(`${this.BASE_URI}/scenario/step/option`)
    }
}