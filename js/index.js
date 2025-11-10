const localStorageSessionKey = 'currentDemoUser';
const CART_ANON_KEY = 'carrito_anonimo';
const INVENTORY_STORAGE_KEY = 'valleVentas_inventario';
const REVIEWS_STORAGE_KEY = 'valleVentas_reviews';
const ORDERS_STORAGE_KEY = 'valleVentas_ordenes';

//Login
function verificarAutenticacion() {
    // 1. Declarar y ASIGNAR el valor de la sesión a una variable local
    const sessionValue = localStorage.getItem(localStorageSessionKey);

    // 2. Ahora sí podemos usar la variable 'sessionValue' para debugging
    console.log("DEBUG: Clave de Sesión:", localStorageSessionKey);
    console.log("DEBUG: Valor de la Sesión:", sessionValue);
    console.log("DEBUG: Estado de Autenticación (isLoggedIn):", !!sessionValue);

    // 3. Devolver el valor booleano
    return !!sessionValue;
}

function updateAuthUI() {

    const isLoggedIn = verificarAutenticacion();
    const profileMenu = document.getElementById('wrapperperfil');
    const guestButtons = document.getElementById('perfilnoautenticado');

    if (profileMenu && guestButtons) {
        if (isLoggedIn) {
            profileMenu.style.display = 'flex';
            guestButtons.style.display = 'none';
        } else {
            profileMenu.style.display = 'none';
            guestButtons.style.display = 'flex';
        }
    }
}

function cerrarSesion() {
    localStorage.removeItem(localStorageSessionKey);
    alert('Has cerrado sesión correctamente. ¡Vuelve pronto!');
    window.location.href = '../index.html';
}

//Inventario

const INVENTARIO_INICIAL = [
    {
        id: 1,
        name: "Escritorio Ejecutivo Nórdico en Madera de Nogal",
        price: 900000,
        stock: 8,
        description: "Elegancia Minimalista para el Profesional Moderno Transforme su espacio de trabajo con el Escritorio Nórdico Escandi una pieza que combina la calidez atemporal de la madera con un diseño limpio y minimalista. Creado para el profesional que valora tanto la estética como la funcionalidad, este escritorio es la pieza central perfecta para una oficina en casa o un despacho ejecutivo. <br><br> <b>Características Destacadas</b> <br><br>  <b>- Diseño Flotante y Estilizado:</b> Sus líneas puras y patas ligeramente inclinadas, características del diseño escandinavo, crean una apariencia ligera y aireada, maximizando la sensación de espacio en cualquier habitación. <br><br> <b>- Almacenamiento Discreto:</b> Incluye un cajón deslizable con herrajes de alta calidad, ideal para guardar de forma organizada sus esenciales de oficina y mantener la superficie de trabajo impecablemente despejada <br><br><b>- Acabado Premium:</b> La superficie de madera ha sido pulida y sellada para ofrecer una durabilidad superior y una resistencia notable a derrames y el desgaste diario.<br><br> <b>Especificaciones</b><br><br> <b>Material:</b> Madera maciza de Nogal y enchape de alta densidad.<br> <b>Medidas:</b> Ancho: 140 cm  Profundidad: 70 cm / Altura: 75 cm <br> <b>Peso:</b> 35 – 45 kg. <br> <b>Estilo:</b> Nórdico / Moderno <br> <b>Uso:</b> Oficina en Casa, Despacho, Estudio",
        image: "../assets/escritorioMadera/1.webp",
        secondary_images: [
            "../assets/escritorioMadera/2.webp",
            "../assets/escritorioMadera/3.webp",
            "../assets/escritorioMadera/4.webp",
        ],
        tags: ["mueble"]
    },
    {
        id: 2,
        name: "Archivador Minimalista 'Cubo'",
        price: 450000,
        stock: 10,
        description: "<b>Organización Vertical, Diseño de Vanguardia</b><br><br>Presentamos el archivador 'Cubo', la solución definitiva para mantener tu oficina impecable sin sacrificar el estilo. Diseñado bajo una estética minimalista, este archivador es un complemento perfecto para cualquier espacio de trabajo moderno, ofreciendo <b>almacenamiento de alto rendimiento</b> en una silueta compacta y elegante.<br><br><b>Características Clave</b><br><br>• <b>Líneas Puras:</b> Su diseño de cubo monolítico, sin tiradores visibles (gracias al sistema push-to-open o bordes integrados), se integra perfectamente en entornos ejecutivos o de home office contemporáneos.<br><br>• <b>Movilidad y Estabilidad:</b> Equipado con <b>ruedas ocultas</b> de alta resistencia que permiten moverlo fácilmente bajo cualquier escritorio o mesa, o con niveladores fijos para mayor estabilidad (dependiendo del modelo específico).<br><br>• <b>Capacidad Ejecutiva:</b> Perfecto para mantener documentos sensibles o de uso frecuente a la mano, con espacio diseñado para <b>carpetas colgantes</b> de tamaño carta u oficio.<br><br><b>Especificaciones Técnicas</b><br><br><b>Material:</b> Estructura en lámina de acero laminado en frío (Calibre 22-24) para máxima durabilidad, con acabado de pintura electrostática <b>blanca o negra mate</b>.<br><b>Medidas:</b> Alto: 70 cm / Fondo: 48 cm / Ancho: 47 cm.<br><b>Peso:</b> 16 kg<br><b>Cajones:</b> 2 cajones con <b>correderas telescópicas</b> de extensión total.<br><b>Seguridad:</b> Cerradura central con llave para bloquear todos los cajones.",
        image: "../assets/archivador/1.webp",
        secondary_images: [
            "../assets/archivador/2.webp"
        ],
        tags: ["mueble"]
    },
    {
        id: 3,
        name: "Silla Ejecutiva Ergonómica 'Vertex'",
        price: 850000,
        stock: 15,
        description: "Modelo deportivo y casual.",
        image: "../assets/sillaOficina/1.webp",
        secondary_images: [
            "../assets/sillaOficina/2.webp"
        ],
        tags: ["silla","ergonomía"]
    },
    {
        id: 4,
        name: "Reposapiés Ergonómico 'Aura'",
        price: 100000,
        stock: 6,
        description: "Modelo deportivo y casual.",
        image: "../assets/reposaPies/1.webp",
        secondary_images: [
            "../assets/reposaPies/2.webp"
        ],
        tags: ["ergonomía"]
    },
    {
        id: 5,
        name: "Soporte para Laptop 'Elevate'",
        price: 60000,
        stock: 20,
        description: "Modelo deportivo y casual.",
        image: "../assets/soporteLaptop/1.webp",
        secondary_images: [
            "../assets/soporteLaptop/2.webp"
        ],
        tags: ["ergonomía"]
    },
    {
        id: 6,
        name: "Escritorio Elevable 'Kinetic Pro'",
        price: 1600000,
        stock: 4,
        description: "Modelo deportivo y casual.",
        image: "../assets/escritorioMotor/1.webp",
        secondary_images: [
            "../assets/escritorioMotor/2.webp"
        ],
        tags: ["mueble"]
    }
];

function initializeInventory() {
    const storedInventory = localStorage.getItem(INVENTORY_STORAGE_KEY);

    if (!storedInventory) {
        console.log("Inicializando inventario por primera vez...");

        const inventoryJson = JSON.stringify(INVENTARIO_INICIAL);
        localStorage.setItem(INVENTORY_STORAGE_KEY, inventoryJson);
    } else {
        console.log("Inventario ya existe en localStorage.");
    }
}

function getProducts() {
    const inventoryJson = localStorage.getItem(INVENTORY_STORAGE_KEY);
    let products = INVENTARIO_INICIAL; // Usamos inicial por defecto

    if (inventoryJson) {
        try {
            products = JSON.parse(inventoryJson);
        } catch (e) {
            console.error("Error al parsear el inventario de localStorage. Usando iniciales.", e);
        }
    }

    // Mapear y asegurar que ID, stock y price son números válidos para evitar fallos.
    return products.map(p => ({
        ...p,
        // Convertimos el ID a número (ya que en INVENTARIO_INICIAL son números)
        id: Number(p.id) || p.id, 
        // Convertimos stock a número entero (lo más seguro)
        stock: Math.round(Number(p.stock) || 0), 
        // Convertimos price a número
        price: Number(p.price) || 0
    }));
}

function formatoMoneda(cantidad) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP', 
        minimumFractionDigits: 0,
    }).format(cantidad);
}

function renderProducts() {
    const productList = getProducts(); // Obtiene la lista de productos del inventario
    const container = document.getElementById('products-container');


    // Verifica si el contenedor existe
    if (!container) {
        console.error("El contenedor 'products-container' no fue encontrado.");
        return;
    }

    let html = '';

    productList.forEach(product => {
        // Preparación de variables
        const formattedPrice = formatoMoneda(product.price);
        const isSoldOut = product.stock === 0;
        const buttonText = isSoldOut ? 'Agotado' : 'Agregar al carrito';
        const buttonDisabled = isSoldOut ? 'disabled' : '';

        // Función de JS que se ejecuta al hacer clic
        // Importante: Escapar comillas en el nombre del producto
       
 const addItemCall = `agregarItem(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')`;

        // --- INICIO DEL TEMPLATE LITERAL (TU NUEVO ESTILO TAILWIND) ---
        html += `
            <div class="product-card">
                <a href="info.html?id=${product.id}" class="group relative block overflow-hidden">
                    
                    

                    <img 
                        src="${product.image}" 
                        alt="${product.name}" 
                        class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    >

                    <div class="relative border border-gray-100 bg-white p-6">
                        
                        <span class="bg-purple-800 px-3 py-1.5 text-xs text-white font-medium whitespace-nowrap"> 
                            Stock: ${product.stock}
                        </span>
                        
                        <h3 class="mt-4 text-lg font-medium text-gray-900">${product.name}</h3>
                        
                        <p class="mt-1.5 text-sm text-gray-700">${formattedPrice} COP</p>

                        <form class="mt-4">
                            <button 
                                onclick="event.preventDefault(); ${addItemCall}"
                                ${buttonDisabled}
                                class="block w-full rounded-sm text-white bg-blue-400 p-4 text-sm font-medium transition hover:scale-105 ${isSoldOut ? 'bg-gray-400 cursor-not-allowed' : ''}"
                            >
                                ${buttonText}
                            </button>
                        </form>
                    </div>
                </a>
            </div>
        `;

    });
    container.innerHTML = html;
}

//Carga y guardado del carrito

function getCartKey() {
    const userEmail = localStorage.getItem(localStorageSessionKey);

    if (userEmail) {
        return `carrito_usuario_${userEmail}`;
    } else {
        return CART_ANON_KEY;
    }
}

function cargarCarrito() {
    const key = getCartKey();
    const itemsJson = localStorage.getItem(key);
    return itemsJson ? JSON.parse(itemsJson) : [];
}

function guardarCarrito(items) {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(items));
}


//Funciones del carrito

function agregarItem(productId, name, price, image) {
    // 1. OBTENER INVENTARIO Y EL PRODUCTO ESPECÍFICO
    const inventory = getProducts();
    
    // 🛑 CLAVE 1: Convertir productId a número para la búsqueda (siempre viene como string del DOM)
    const numericProductId = Number(productId); 
    
    // CLAVE 2: Buscar el producto usando el ID numérico
    const productInStock = inventory.find(p => p.id === numericProductId);

    // Si no lo encuentra o el stock es cero, mostramos la advertencia
    if (!productInStock || productInStock.stock === 0) {
        console.warn(`Producto ID ${productId} agotado o no encontrado.`);
        alert(`Lo sentimos, el producto ${name} está agotado o no se encuentra.`);
        return; 
    }

    // 2. OBTENER Y BUSCAR EN CARRITO
    let carrito = cargarCarrito();
    // CLAVE 3: Usar el ID numérico para buscar el item en el carrito
    const itemExistente = carrito.find(item => item.id === numericProductId);

    if (itemExistente) {
        // 3. ACTUALIZAR CANTIDAD (con validación de stock)
        
        // CORRECCIÓN LÓGICA: Solo aumenta si la cantidad actual es ESTRICTAMENTE MENOR al stock
        if (itemExistente.quantity < productInStock.stock) {
            itemExistente.quantity += 1;
        } else {
            console.warn(`No se puede agregar más. Stock máximo alcanzado: ${productInStock.stock}`);
            alert(`Solo puedes agregar ${productInStock.stock} unidades de este producto (${name}).`);
        }
    } else {
        // 4. AGREGAR ITEM NUEVO
        const nuevoItem = {
            id: numericProductId, // Guardamos el ID como número
            name: name,
            // Aseguramos que el precio sea numérico antes de guardarlo
            price: Number(price) || 0, 
            quantity: 1,
            image: image,
        };
        carrito.push(nuevoItem);
    }
    
    // 5. GUARDAR Y LOGUEAR
    guardarCarrito(carrito);
    console.log("Producto agregado/actualizado. Carrito actual:", carrito);
}


function eliminarItem(productId) {
    const idBorrar = parseInt(productId);
    let carrito = cargarCarrito();

    carrito = carrito.filter(item => item.id !== idBorrar);
    guardarCarrito(carrito);
    console.log("Producto eliminado. Carrito actual:", carrito);

    if (window.location.pathname.includes('carrito.html')) {
        location.reload();
    }
}

function modificarCantidad(itemId, newQuantity) {
    let items = cargarCarrito();
    const quantity = parseInt(newQuantity);

    // Obtener el inventario para validar el stock
    const inventory = getProducts();
    const product = inventory.find(p => p.id == itemId);

    if (!product) return; // Si el producto no existe en el inventario, sal

    // 🛑 VALIDACIÓN CRÍTICA: Limitar la cantidad al stock disponible
    if (quantity > product.stock) {
        alert(`Solo quedan ${product.stock} unidades en stock, elije una cantidad valida.`);
        // Opcional: Establecer la cantidad máxima en lugar de salir
        items[itemIndex].quantity = product.stock;
    }

    if (quantity <= 0) {
        eliminarItem(itemId);
        return;
    }

    const itemIndex = items.findIndex(item => item.id == itemId);

    if (itemIndex !== -1) {
        // Asegúrate de que no se haya excedido el stock si no salimos antes
        items[itemIndex].quantity = Math.min(quantity, product.stock);
        guardarCarrito(items);

        if (window.location.pathname.includes('carrito.html')) {
            location.reload();
        }
    }
}

function vaciarCarrito() {
    guardarCarrito([]);
    console.log("Carrito vaciado.");

    if (window.location.pathname.includes('carrito.html')) {
        location.reload();
    }
}

//Reseñas

function loadReviews() {
    const reviewsJson = localStorage.getItem(REVIEWS_STORAGE_KEY);
    return reviewsJson ? JSON.parse(reviewsJson) : [];
}

function saveReviews(reviews) {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}

// --- Función para Guardar una Nueva Reseña ---
function submitReview(productId, rating, comment) {
    const currentUserEmail = localStorage.getItem(localStorageSessionKey);

    // 🛑 Bloqueo si el usuario no está logeado
    if (!currentUserEmail) {
        alert("Debes iniciar sesión para publicar una reseña.");
        return;
    }

    if (!comment || rating < 1 || rating > 5) {
        alert("Por favor, ingresa un comentario y una puntuación válida (1-5).");
        return;
    }

    const newReview = {
        productId: productId,
        rating: parseInt(rating),
        comment: comment,
        userEmail: currentUserEmail,
        date: new Date().toLocaleDateString('es-ES')
    };

    const allReviews = loadReviews();
    allReviews.push(newReview);
    saveReviews(allReviews);

    renderProductReviews(productId);

    document.getElementById('review-form').reset();
    alert("¡Reseña publicada con éxito!");
}

function loadOrders() {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
}

function saveOrders(orders) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

window.renderCheckoutSummary = function() {
    const items = cargarCarrito();
    const resumenContainer = document.getElementById('resumen-carrito');
    const resumenTotalSpan = document.getElementById('resumen-total');
    const totalPagarSpan = document.getElementById('total-a-pagar');

    if (!resumenContainer || items.length === 0) {
        resumenContainer.innerHTML = '<p class="text-red-500">Tu carrito está vacío. <a href="catalogo.html" class="text-blue-500 hover:underline">Ir a comprar</a></p>';
        resumenTotalSpan.textContent = formatoMoneda(0);
        totalPagarSpan.textContent = formatoMoneda(0);
        return;
    }

    let total = 0;
    let html = '';

    items.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        html += `
            <div class="flex justify-between text-sm">
                <span class="text-gray-600">${item.name} (x${item.quantity})</span>
                <span class="font-medium">${formatoMoneda(subtotal)}</span>
            </div>
        `;
    });

    resumenContainer.innerHTML = html;
    resumenTotalSpan.textContent = formatoMoneda(total);
    totalPagarSpan.textContent = formatoMoneda(total);
};


/**
 * Auto-rellena los campos de Nombre, Apellido y Email si el usuario está logeado.
 */
window.autofillUserData = function() {
    // Clave de datos: Donde se guarda el ARRAY de todos los perfiles de usuario ('demoUsers').
    const USERS_DATA_KEY = 'demoUsers'; 

    // 1. Obtener el email del usuario logueado
    const userEmail = localStorage.getItem(localStorageSessionKey);
    
    // 2. Referencias a los campos del formulario
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const telefonoInput = document.getElementById('telefono');
    const direccionInput = document.getElementById('direccion');

    if (userEmail && emailInput) {
        // Rellenar el email y hacerlo de solo lectura
        emailInput.value = userEmail;
        emailInput.readOnly = true; 
        
        // 3. Obtener el ARRAY de todos los usuarios
        const usersArrayJSON = localStorage.getItem(USERS_DATA_KEY); 
        
        if (usersArrayJSON) {
            try {
                // Parsear el array completo
                const usersArray = JSON.parse(usersArrayJSON); 
                
                // Buscar el usuario que coincida con el email logueado
                // La imagen de tu localStorage indica que el email está en el campo 'email'.
                const foundUser = usersArray.find(user => user.email === userEmail);
                
                if (foundUser) {
                    // 4. Rellenar todos los campos:
                    // Se usan las claves del objeto de usuario: name, lastname, phone, adress.
                    if (nombreInput) nombreInput.value = foundUser.name || '';
                    if (apellidoInput) apellidoInput.value = foundUser.lastname || ''; 
                    if (telefonoInput) telefonoInput.value = foundUser.phone || ''; 
                    if (direccionInput) direccionInput.value = foundUser.adress || ''; 
                    
                    console.log("Perfil autocompletado con éxito desde demoUsers.", foundUser);
                } else {
                    console.warn(`Usuario ${userEmail} logueado, pero no encontrado en el array 'demoUsers'.`);
                }
                
            } catch (e) {
                console.error("Error al parsear el array 'demoUsers' de localStorage:", e);
            }
        } else {
             console.log("La clave 'demoUsers' no se encontró. No se puede autocompletar el perfil.");
        }
        
    } else {
        // Si no hay sesión iniciada, el campo email es editable
        if (emailInput) emailInput.readOnly = false;
    }
};

function autofillFromEmail(email, nombreInput, apellidoInput) {
    if (!email || !nombreInput || !apellidoInput) return;
    
    try {
        const parts = email.split('@')[0].split('.');
        if (parts.length >= 2) {
            // Capitalizar la primera letra del nombre y apellido
            const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            const lastName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            
            nombreInput.value = firstName;
            apellidoInput.value = lastName;
        }
    } catch (e) {
        // En caso de emails extraños, se ignora
    }
}

window.handlePurchase = function() {
    clearMessage(); // Limpia mensajes anteriores al iniciar la compra
    
    const items = cargarCarrito();
    // Reusa el mensajeDiv para mostrar los errores, ya no lo definimos al inicio.
    const mensajeDiv = document.getElementById('mensaje-compra'); 

    // 1. Recolectar datos del formulario
    const customerData = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
    };

    // ------------------------------------
    // 2. VALIDACIONES DE DATOS (Usando showMessage en lugar de alert)
    // ------------------------------------
    
    // Validar Carrito
    if (items.length === 0) {
        showMessage("Error: No hay productos en el carrito para comprar. Por favor, agregue artículos.");
        return;
    }
    
    // Validar Campos Requeridos
    if (!customerData.nombre || !customerData.apellido || !customerData.telefono || !customerData.direccion || !customerData.email) {
        showMessage("Por favor, completa todos los campos.");
        return;
    }

     const nameRegex = /^[\p{L}\s'-]+$/u; 

    if (!nameRegex.test(customerData.nombre)) {
        showMessage("El campo Nombre solo debe contener letras, espacios y tildes.");
        return;
    }

    if (!nameRegex.test(customerData.apellido)) {
        showMessage("El campo Apellido solo debe contener letras, espacios y tildes.");
        return;
    }    
    // Validar Teléfono (Ejemplo: al menos 7 dígitos y solo números)
    const phoneRegex = /^\d{10}$/;
    if (!customerData.telefono || !phoneRegex.test(customerData.telefono)) {
        showMessage("Por favor, ingresa un número de teléfono válido (solo números, de 10 dígitos).");
        return;
    }
    
    // Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerData.email || !emailRegex.test(customerData.email)) {
        showMessage("Por favor, ingresa una dirección de email válida.");
        return;
    }
    
    // ------------------------------------
    // 3. CONTINUAR CON LA COMPRA 
    // ------------------------------------
    
    const totalElement = document.getElementById('resumen-total');
    const total = totalElement ? totalElement.textContent : 'N/A';

    // ... (El resto de la lógica de creación de newOrder, guardado, y actualización de stock) ...
    
    const newOrder = {
        id: Date.now(), 
        date: new Date().toLocaleString('es-ES'),
        total: total, 
        productos: items.map(item => ({ 
            id: item.id, 
            name: item.name, 
            quantity: item.quantity, 
            price: item.price 
        })),
        cliente: customerData
    };

    const allOrders = loadOrders();
    allOrders.push(newOrder);
    saveOrders(allOrders);

    const itemsBeforeEmptying = items; 
    vaciarCarrito();
    updateProductStock(itemsBeforeEmptying); 

    // 4. Mostrar mensaje de éxito (Usando showMessage de tipo 'success')
    document.getElementById('checkout-form').reset();
    
    const successMessage = `
        <p class="font-bold">¡Compra Exitosa! 🎉</p>
        <p>Tu orden #${newOrder.id} por ${newOrder.total} ha sido registrada.</p>
        <p class="text-sm mt-1">Recibirás un email de confirmación en ${customerData.email}.</p>
        <p class="mt-2"><a href="../index.html" class="text-purple-600 font-semibold hover:underline">Volver a la página principal</a></p>
    `;
    
    showMessage(successMessage, 'success');

    document.querySelector('button[type="submit"]').style.display = 'none';
    window.renderCheckoutSummary();
};

function updateProductStock(purchasedItems) {
    // 1. Obtener la versión actual y editable del inventario
    // Usamos getProducts() para obtener la lista del localStorage
    let currentInventory = getProducts(); 
    
    // Si getProducts devuelve INVENTARIO_INICIAL, necesitamos una copia editable.
    // Usamos .slice() para asegurarnos de que no modificamos el INVENTARIO_INICIAL
    // si estamos usando esa variable como fallback.
    
    // 2. Iterar sobre los artículos comprados
    purchasedItems.forEach(item => {
        // Aseguramos que el ID es un número para una búsqueda fiable
        const itemId = Number(item.id); 
        const purchasedQuantity = item.quantity;
        
        // 3. Encontrar el producto correspondiente en el inventario
        const productIndex = currentInventory.findIndex(p => Number(p.id) === itemId);
        
        if (productIndex !== -1) {
            const product = currentInventory[productIndex];
            
            // Validación de seguridad (debería ser innecesaria si ya se validó en el carrito)
            if (product.stock >= purchasedQuantity) {
                // 4. Reducir el stock
                product.stock -= purchasedQuantity;
                console.log(`Stock actualizado para ID ${itemId}: Nuevo stock = ${product.stock}`);
            } else {
                // Esto es un error grave en la lógica si ocurre en el checkout
                console.error(`¡Error de stock! Se intentó comprar ${purchasedQuantity} unidades, pero solo quedan ${product.stock}. No se pudo actualizar el stock.`);
            }
        } else {
            console.warn(`Producto con ID ${itemId} comprado no fue encontrado en el inventario.`);
        }
    });

    // 5. Guardar el inventario actualizado de nuevo en localStorage
    // Necesitamos la clave INVENTORY_STORAGE_KEY y JSON.stringify
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(currentInventory));
    console.log("Inventario guardado después de la compra.");
}

function showMessage(message, type = 'error') {
    const mensajeDiv = document.getElementById('mensaje-compra');
    if (!mensajeDiv) return;

    mensajeDiv.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'border-green-300', 'bg-red-100', 'text-red-700', 'border-red-300');
    
    if (type === 'success') {
        mensajeDiv.classList.add('bg-green-100', 'text-green-700', 'border-green-300');
    } else {
        mensajeDiv.classList.add('bg-red-100', 'text-red-700', 'border-red-300');
    }

    mensajeDiv.innerHTML = `<p>${message}</p>`;
}

/**
 * Limpia y oculta el div de mensajes.
 */
function clearMessage() {
    const mensajeDiv = document.getElementById('mensaje-compra');
    if (!mensajeDiv) return;
    mensajeDiv.classList.add('hidden');
    mensajeDiv.innerHTML = '';
}

window.renderOrderHistory = function() {
    // Definición global para que sea accesible desde perfil.js
    const orders = loadOrders();
    const historyContainer = document.getElementById('purchase-history');
    const userEmail = localStorage.getItem(localStorageSessionKey);

    if (!historyContainer) {
        console.warn("Contenedor 'purchase-history' no encontrado.");
        return;
    }

    if (!userEmail) {
        historyContainer.innerHTML = `
            <div class="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
                <p class="font-bold">Acceso Denegado</p>
                <p>Debes iniciar sesión para ver tu historial de pedidos.</p>
            </div>
        `;
        return;
    }

    // Filtrar órdenes por usuario loggeado
    const userOrders = orders.filter(order => order.cliente && order.cliente.email === userEmail);
    
    if (userOrders.length === 0) {
        historyContainer.innerHTML = '<p class="text-gray-500 p-4">Aún no has realizado ninguna compra con esta cuenta.</p>';
        return;
    }

    // Ordenar por fecha (más reciente primero)
    userOrders.sort((a, b) => b.id - a.id);

    let html = userOrders.map(order => {
        // Detalle de productos
        const productList = order.productos.map(p => `
            <li class="flex justify-between text-sm text-gray-700 ml-4">
                <span>${p.name} (x${p.quantity})</span>
                <span>${formatoMoneda(p.price * p.quantity)}</span>
            </li>
        `).join('');

        return `
            <div class="border border-gray-200 rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition duration-200">
                <div class="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
                    <span class="font-bold text-lg text-primary">Orden #${order.id}</span>
                    <span class="text-sm text-gray-500">Fecha: ${order.date}</span>
                </div>
                
                <p class="font-semibold text-2xl text-gray-800 mb-1">Artículos Comprados:</p>
                <ul class="font-semibold text-7xl list-disc space-y-1 pl-5">
                    ${productList}
                </ul>

                <div class="p-6 mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span class="font-bold text-xl text-gray-900">Total Pagado:</span>
                    <span class="font-bold text-xl text-primary">${order.total} COP</span>
                </div>
            </div>
        `;
    }).join('');

    historyContainer.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    initializeInventory();
    renderProducts();
    const logoutHeaderBtn = document.getElementById('logout');

    if (logoutHeaderBtn) {
        logoutHeaderBtn.addEventListener('click', cerrarSesion);
    }
});

