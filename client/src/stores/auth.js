import { defineStore } from 'pinia'

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('accessToken') || null,
    }),

    getters: {
        isAuth: (state) => !!state.user,
    },

    actions: {
        loadUserFromToken() {
            if (!this.token) return;

            const decoded = parseJwt(this.token);
            if (decoded && decoded.exp * 1000 > Date.now()) {
                this.user = decoded;
            } else {
                this.logout();
            }
        },

        login(token) {
            this.token = token;
            localStorage.setItem('accessToken', token);
            this.loadUserFromToken();
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('accessToken');
        },
    },
})
