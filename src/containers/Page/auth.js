import history from './history';
export const TOKEN_KEY = "triangulo";
export const NAME_KEY = "nome";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token,name) => {localStorage.setItem(TOKEN_KEY, token);
localStorage.setItem(NAME_KEY,name);
};
export const logout = () => { localStorage.removeItem(TOKEN_KEY);

    history.replace('/');
};