// --- CONSTANTES ---
const localStorageSessionKey = 'currentDemoUser'; //Identificar
const localStorageKey = 'demoUsers'; // Llave para almacenar los usuarios
const authMessage = document.getElementById('auth-message'); // Contenedor para mensajes (éxito/error)
const registerForm = document.getElementById('register-form'); // El formulario de registro
// Enlace para ir a login (segun tu HTML: <a href="login.html" id="show-login" ...)
const loginLink = document.getElementById('show-login'); 

// --- UTILIDADES ---

// Muestra mensajes de estado
function showMessage(message, isError = false) {
    authMessage.textContent = message;
    // Asigna clases de Tailwind para estilo de éxito (verde) o error (rojo)
    authMessage.className = `mt-4 p-3 rounded-lg text-sm font-medium ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
    authMessage.classList.remove('hidden');
}

// Obtiene todos los usuarios del localStorage
function getUsers() {
    const usersJson = localStorage.getItem(localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
}

// Guarda los usuarios en el localStorage
function saveUsers(users) {
    localStorage.setItem(localStorageKey, JSON.stringify(users));
}

// --- LÓGICA DE REGISTRO ---
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const lastname = document.getElementById('register-lastname').value.trim();
    const adress = document.getElementById('register-adress').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim(); 
    

    if (!name || !lastname || !adress || !phone || !email || !password) {
        showMessage('Por favor, rellena todos los campos.', true);
        return;
    }

    if (/\d/.test(name) || /\d/.test(lastname)) {
        showMessage('El Nombre y Apellido no pueden contener números.', true);
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        showMessage('El teléfono debe contener exactamente 10 dígitos numéricos.', true);
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    
    if (!passwordRegex.test(password)) {
        showMessage('Error: La contraseña debe tener al menos 8 caracteres e incluir una mayúscula, una minúscula, un número y un símbolo (!@#$%^&*).', true);
        return;
    }


    let users = getUsers();

    // Comprueba si el usuario ya existe
    if (users.some(user => user.email === email)) {
        showMessage('El email ya está registrado.', true);
        return;
    }

    // Guarda el nuevo usuario (DEMO INSEGURA)
    const newUser = { name,lastname,adress,phone,email, password }; 
    users.push(newUser);
    saveUsers(users);

    showMessage('✅ Registro exitoso. Redirigiendo a Iniciar Sesión...', false);
    
    // REDIRECCIÓN CLAVE: Envía al usuario a la página de login después de 2 segundos
    setTimeout(() => {
        // Asegúrate de que este nombre de archivo coincida con tu página de login
        window.location.href = 'login.html'; 
    }, 2000);
});

// --- GESTIÓN DE ENLACE DE NAVEGACIÓN ---
if (loginLink) {
    loginLink.addEventListener('click', (e) => {
        // La redirección ya está en el atributo href="login.html" del HTML, 
        // pero este código asegura la navegación por JS si el href falla o es '#'
        // e.preventDefault();
        // window.location.href = 'login.html'; 
    });
}