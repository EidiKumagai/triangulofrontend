import history from './history';
export const TOKEN_KEY = "triangulo";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {localStorage.setItem(TOKEN_KEY, token);};
export const logout = () => { localStorage.removeItem(TOKEN_KEY);

    history.replace('/');
};