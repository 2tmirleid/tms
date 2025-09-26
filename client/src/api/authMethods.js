import {BaseMethods} from "@/api/baseMethods.js";
import axios from "axios";

export class AuthMethods extends BaseMethods {
    async register(body) {
        return await this.instance.post(`${this.BASE_URI}/auth/register`, body);
    }

    async login(body) {
        return await this.instance.post(`${this.BASE_URI}/auth/login`, body);
    }
}