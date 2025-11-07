// --- CONSTANTES ---
const localStorageKey = 'demoUsers';
const localStorageSessionKey = 'currentDemoUser';
const authMessage = document.getElementById('auth-message');
const loginForm = document.getElementById('login-form');
// El link para ir a la página de registro (asegúrate que el nombre de archivo sea correcto)
const registerLink = document.getElementById('show-register'); 

// --- UTILIDADES ---
function showMessage(message, isError = false) {
    authMessage.textContent = message;
    authMessage.className = `mt-4 p-3 rounded-lg text-sm font-medium ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
    authMessage.classList.remove('hidden');
    setTimeout(() => {
        authMessage.classList.add('hidden');
    }, 5000);
}

function getUsers() {
    const usersJson = localStorage.getItem(localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
}

// --- LÓGICA DE LOGIN ---
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const users = getUsers();
    // Verifica credenciales (inseguro, solo para demo)
    const user = users.find(u => u.email === email && u.password === password); 

    if (user) {
        localStorage.setItem(localStorageSessionKey, email); // Inicia la sesión
        showMessage(`✅ Acceso concedido. Redirigiendo a la página principal...`, false);
        
        // Redirección exitosa: ve a la página principal
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 2000);
    } else {
        showMessage('Email o contraseña incorrectos.', true);
    }
});

// --- GESTIÓN DE ENLACE ---
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Redirige a la página de Registro
    window.location.href = 'registro.html'; 
});