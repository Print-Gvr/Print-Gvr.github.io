function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
}

// --- DATOS SIMULADOS ---
const userPurchases = [
    { id: 'ORD-001', date: '2024-10-15', total: 125.50, status: 'Entregado', items: 3 },
    { id: 'ORD-002', date: '2024-11-01', total: 79.99, status: 'En Proceso', items: 1 },
    { id: 'ORD-003', date: '2024-11-05', total: 340.00, status: 'Cancelado', items: 5 },
];

// --- LÓGICA DE PESTAÑAS ---
function openTab(tabName) {
    // Remover estilos de todos los botones y ocultar todos los contenidos
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(el => {
        el.classList.remove('bg-primary', 'text-white', 'shadow-md');
        el.classList.add('text-gray-600', 'hover:bg-gray-200');
    });

    // Activar contenido y botón seleccionado
    document.getElementById(`content-${tabName}`).classList.add('active');
    const tabButton = document.getElementById(`tab-${tabName}`);
    tabButton.classList.add('bg-primary', 'shadow-md');
    tabButton.classList.remove('text-gray-800', 'hover:bg-gray-400');
    
    // Si la pestaña de historial se abre, renderizar las compras
    if (tabName === 'history') {
        renderPurchaseHistory();
    }
}

// --- LÓGICA DE HISTORIAL DE COMPRAS ---
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
                    <p class="text-lg font-bold text-gray-900">Total: ${formatCurrency(purchase.total)}</p>
                </div>
                <button class="mt-3 text-primary text-sm font-medium hover:text-secondary transition">
                    Ver Detalles
                </button>
            </div>
        `;
    });
    historyContainer.innerHTML = html;
}

// --- LÓGICA DE FORMULARIOS Y MANEJADORES DE EVENTOS ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar: Abrir la primera pestaña al cargar
    openTab('data');

    // 2. Manejar el envío del formulario de datos personales
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const messageEl = document.getElementById('data-message');
        
        // Simulación de guardado de datos
        console.log('Guardando datos de perfil...');
        
        messageEl.textContent = '¡Datos actualizados correctamente!';
        messageEl.classList.remove('hidden', 'text-red-600');
        messageEl.classList.add('text-green-600');
        
        setTimeout(() => messageEl.classList.add('hidden'), 3000);
    });

    // 3. Manejar el envío del formulario de cambio de contraseña
    document.getElementById('password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const newPass = document.getElementById('new_password').value;
        const confirmPass = document.getElementById('confirm_password').value;
        const messageEl = document.getElementById('security-message');
        
        messageEl.classList.remove('hidden', 'text-green-600', 'text-red-600');
        
        if (newPass !== confirmPass) {
            messageEl.textContent = 'Error: Las contraseñas nuevas no coinciden.';
            messageEl.classList.add('text-red-600');
        } else if (newPass.length < 6) {
            messageEl.textContent = 'Error: La contraseña debe tener al menos 6 caracteres.';
            messageEl.classList.add('text-red-600');
        } else {
            // Simulación de cambio de contraseña exitoso
            console.log('Contraseña cambiada...');
            messageEl.textContent = 'Contraseña actualizada con éxito.';
            messageEl.classList.add('text-green-600');
            
            // Limpiar campos
            document.getElementById('current_password').value = '';
            document.getElementById('new_password').value = '';
            document.getElementById('confirm_password').value = '';
        }

        setTimeout(() => messageEl.classList.add('hidden'), 3000);
    });
});