export function parseToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
}