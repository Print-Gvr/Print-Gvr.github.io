const userPurchases = [
    { id: 'ORD-001', date: '2024-10-15', total: 125.50, status: 'Entregado', items: 3 },
    { id: 'ORD-002', date: '2024-11-01', total: 79.99, status: 'En Proceso', items: 1 },
    { id: 'ORD-003', date: '2024-11-05', total: 340.00, status: 'Cancelado', items: 5 },
];

const localStorageKey = 'demoUsers'; // Llave para almacenar la lista completa de usuarios

// --- FUNCIONES DE GESTIÓN DE USUARIO (LocalStorage) ---

/**
 * Retorna el objeto de usuario actual usando ambas llaves.
 */
function getCurrentUser() {
    // CORRECCIÓN CLAVE: Usar localStorageSessionKey para obtener el email logeado.
    const loggedInEmail = localStorage.getItem(localStorageSessionKey); 
    
    // Mostrar el email en el encabezado
    const displayElement = document.getElementById('user-email-display');
    if (displayElement) {
        displayElement.textContent = loggedInEmail || 'Ninguno';
    }

    if (!loggedInEmail) {
        return null; // No hay sesión activa.
    }

    // Usar localStorageKey para obtener la lista completa y buscar el usuario.
    const allUsers = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    return allUsers.find(user => user.email === loggedInEmail);
}

/**
 * Guarda los datos de perfil actualizados en la lista de usuarios.
 * @param {object} updatedData - Datos a actualizar (ej: { name: 'Nuevo' })
 */
function saveCurrentUser(updatedData) {
    const loggedInEmail = localStorage.getItem(localStorageSessionKey);
    if (!loggedInEmail) return false;

    let allUsers = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const userIndex = allUsers.findIndex(user => user.email === loggedInEmail);
    
    if (userIndex !== -1) {
        // Combina los datos antiguos con los nuevos y actualiza la lista.
        allUsers[userIndex] = { ...allUsers[userIndex], ...updatedData };
        localStorage.setItem(localStorageKey, JSON.stringify(allUsers));
        return true;
    }
    return false;
}

// --- MANEJO DE VISTA Y UTILIDADES ---

function formatoMoneda(amount) {
    // Usando COP (Peso Colombiano) como moneda de ejemplo para formato.
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

function showMessage(elementId, message, isSuccess) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.classList.remove('hidden', 'text-green-600', 'text-red-600');
    el.classList.add(isSuccess ? 'text-green-600' : 'text-red-600');
    setTimeout(() => el.classList.add('hidden'), 5000);
}

function loadProfileData() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('first_name').value = user.name || '';
        document.getElementById('last_name').value = user.lastname || '';
        // El email se rellena automáticamente
        document.getElementById('email').value = user.email || ''; 
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('address').value = user.adress || ''; 
    } else {
        // Opcional: Redirigir si no hay usuario logeado (depende de tu flujo de seguridad)
        console.error("No hay sesión activa. Campos de perfil no cargados.");
    }
}

/**
 * Cambia la pestaña de contenido activa.
 * @param {string} tabName - Nombre de la pestaña (data, security, history).
 */
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    
    // Estado INACTIVO: Asegura que el botón sea transparente/sin fondo, pero tenga efecto hover
    document.querySelectorAll('.tab-button').forEach(el => {
        el.classList.remove('bg-purple-800', 'shadow-md');
        // El botón inactivo debe poder hacer hover (por eso se añade hover:bg-secondary)
        el.classList.add('hover:bg-secondary'); 
    });

    document.getElementById(`content-${tabName}`).classList.add('active');
    const tabButton = document.getElementById(`tab-${tabName}`);
    
    // Estado ACTIVO: Pone el color fijo y quita el efecto hover (ya no se necesita)
    tabButton.classList.add('bg-purple-800', 'shadow-md');
    tabButton.classList.remove('hover:bg-secondary');
    
    if (tabName === 'history') {
        renderPurchaseHistory();
    }
}

/**
 * Renderiza el historial de compras simulado.
 */
function renderPurchaseHistory() {
    const historyContainer = document.getElementById('purchase-history');
    if (userPurchases.length === 0) {
        historyContainer.innerHTML = '<p class="text-gray-500">Aún no tienes compras registradas.</p>';
        return;
    }

    let html = '';
    userPurchases.forEach(purchase => {
        let statusColor;
        switch (purchase.status) {
            case 'Entregado':
                statusColor = 'bg-green-100 text-green-800';
                break;
            case 'En Proceso':
                statusColor = 'bg-yellow-100 text-yellow-800';
                break;
            case 'Cancelado':
                statusColor = 'bg-red-100 text-red-800';
                break;
            default:
                statusColor = 'bg-gray-100 text-gray-800';
        }

        html += `
            <div class="p-4 border border-gray-200 rounded-lg shadow-sm">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-semibold text-gray-800">Orden #${purchase.id}</span>
                    <span class="px-3 py-1 text-xs font-semibold rounded-full ${statusColor}">
                        ${purchase.status}
                    </span>
                </div>
                <div class="text-gray-600 text-sm space-y-1">
                    <p><strong>Fecha:</strong> ${purchase.date}</p>
                    <p><strong>Artículos:</strong> ${purchase.items}</p>
                    <p class="text-lg font-bold text-gray-900">Total: ${formatoMoneda(purchase.total)}</p>
                </div>
                <button class="mt-3 text-primary text-sm font-medium hover:text-secondary transition">
                    Ver Detalles
                </button>
            </div>
        `;
    });
    historyContainer.innerHTML = html;
}

// --- MANEJADORES DE EVENTOS CON VALIDACIONES ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Hacemos la función openTab global para que pueda ser llamada desde el HTML (onclick)
    window.openTab = openTab;

    // 1. Cargar datos (Depende de que las claves ya existan)
    loadProfileData(); 
    openTab('data');

    // 2. Manejar el envío del formulario de datos personales
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const oldEmail = localStorage.getItem(localStorageSessionKey);
        
        const newName = document.getElementById('first_name').value.trim();
        const newLastname = document.getElementById('last_name').value.trim();
        const newAddress = document.getElementById('address').value.trim();
        const newPhone = document.getElementById('phone').value.trim();
        const newEmail = document.getElementById('email').value.trim(); // <-- CAPTURA EL NUEVO EMAIL

        // VALIDACIONES
        if (!newName || !newLastname || !newPhone || !newAddress || !newEmail) {
            showMessage('data-message', 'Error: Todos los campos son obligatorios.', false);
            return;
        }

        if (/\d/.test(newName) || /\d/.test(newLastname)) {
            showMessage('data-message', 'Error: El Nombre y Apellido no pueden contener números.', false);
            return;
        }

        if (!/^\d{10}$/.test(newPhone)) {
            showMessage('data-message', 'Error: El teléfono debe contener exactamente 10 dígitos numéricos.', false);
            return;
        }
        
        // Guardar datos actualizados (El objeto se actualiza usando oldEmail como clave de búsqueda)
        const updatedData = { 
            name: newName, 
            lastname: newLastname, 
            adress: newAddress, 
            phone: newPhone,
            email: newEmail // Incluimos el nuevo email en los datos a guardar
        };
        
        if (saveCurrentUser(updatedData)) {
            
            // 2. ACTUALIZACIÓN CRÍTICA DE LA CLAVE DE SESIÓN
            if (oldEmail && oldEmail !== newEmail) {
                // Si la actualización en demoUsers fue exitosa y el email cambió, actualizamos la sesión
                localStorage.setItem(localStorageSessionKey, newEmail);
                // Opcional: Recargar los datos con el nuevo email para actualizar el encabezado
                loadProfileData();
            }

            showMessage('data-message', '¡Datos actualizados correctamente!', true);
        } else {
            showMessage('data-message', 'Error: No se pudo guardar el usuario o no hay sesión activa.', false);
        }
    });

    // 3. Manejar el envío del formulario de cambio de contraseña
    document.getElementById('password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPass = document.getElementById('current_password').value.trim(); 
        const newPass = document.getElementById('new_password').value.trim();
        const confirmPass = document.getElementById('confirm_password').value.trim();
        
        if (!currentPass || !newPass || !confirmPass) {
             showMessage('security-message', 'Error: Por favor, rellena todos los campos de contraseña.', false);
             return;
        }

        // VALIDACIÓN A: Coincidencia
        if (newPass !== confirmPass) {
            showMessage('security-message', 'Error: Las contraseñas nuevas no coinciden.', false);
            return;
        }

        // VALIDACIÓN B: Fortaleza de la Contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        
        if (!passwordRegex.test(newPass)) {
            showMessage('security-message', 'Error: La nueva contraseña debe tener al menos 8 caracteres e incluir una mayúscula, una minúscula, un número y un símbolo (!@#$%^&*).', false);
            return;
        }

        // VALIDACIÓN C: Verificar Contraseña Actual
        const user = getCurrentUser();
        if (!user) {
            showMessage('security-message', 'Error: No hay sesión de usuario activa.', false);
            return;
        }
        if (user.password !== currentPass) { 
             showMessage('security-message', 'Error: La contraseña actual es incorrecta.', false);
             return;
        }
        
        // Guardar la nueva contraseña
        if (saveCurrentUser({ password: newPass })) {
            showMessage('security-message', 'Contraseña actualizada con éxito.', true);
            
            // Limpiar campos
            document.getElementById('current_password').value = '';
            document.getElementById('new_password').value = '';
            document.getElementById('confirm_password').value = '';
        } else {
            showMessage('security-message', 'Error al actualizar la contraseña.', false);
        }
    });

    function openTab(tabName) {
    // Clases que definen el estado ACTIVO del botón
    const activeClasses = ['bg-primary', 'shadow-md'];
    
    // Clases que definen el estado INACTIVO (incluyendo el hover)
    const inactiveClasses = ['hover:bg-secondary']; 

    // 1. Ocultar todos los contenidos
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    
    // 2. Gestionar el estado de todos los botones
    document.querySelectorAll('.tab-button').forEach(button => {
        const buttonTabId = button.id.replace('tab-', '');

        if (buttonTabId === tabName) {
            // Botón ACTIVO
            button.classList.add(...activeClasses);
            button.classList.remove(...inactiveClasses);

        } else {
            // Botón INACTIVO
            button.classList.remove(...activeClasses); 
            button.classList.add(...inactiveClasses); 
        }
    });

    // 3. Mostrar el contenido deseado
    document.getElementById(`content-${tabName}`).classList.add('active');
    
    // 4. Lógica específica para Historial (¡La Corrección!)
    if (tabName === 'history') {
        // CORRECCIÓN: Llama a la función global que accede a localStorage desde index.js
        if (window.renderOrderHistory) { 
            window.renderOrderHistory(); 
        } else {
            // Fallback si la función no se cargó
            console.error("Error: window.renderOrderHistory no está definida. Asegúrate de que index.js se cargue correctamente.");
            document.getElementById('purchase-history').innerHTML = '<p class="text-red-500">Error al cargar historial (función no encontrada).</p>';
        }
    } else if (tabName === 'data' && window.loadProfileData) {
        loadProfileData(); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    openTab('data'); 
});
});