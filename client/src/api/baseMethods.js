import axios from "axios";

export class BaseMethods {
    BASE_URI = "http://localhost:8080/api/v2";

    constructor() {
        this.instance = axios.create({
            baseURL: this.BASE_URI,
        });

        this.instance.interceptors.request.use((config) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
}
