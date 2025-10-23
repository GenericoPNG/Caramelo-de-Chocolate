// auth.js
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.loadCurrentUser();
    }

    loadCurrentUser() {
        const userData = localStorage.getItem('current_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    saveCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('current_user', JSON.stringify(user));
    }

    async login(email, password) {
        try {
            const usuario = await reposteriaDB.autenticarUsuario(email, password);
            if (usuario) {
                this.saveCurrentUser(usuario);
                return { success: true, usuario };
            } else {
                return { success: false, error: 'Credenciales incorrectas' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('current_user');
    }
}

const auth = new AuthSystem();
