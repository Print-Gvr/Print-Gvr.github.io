const localStorageSessionKey = 'currentDemoUser';
const CART_ANON_KEY = 'carrito_anonimo';
const INVENTORY_STORAGE_KEY = 'valleVentas_inventario';
const REVIEWS_STORAGE_KEY = 'valleVentas_reviews';
const ORDERS_STORAGE_KEY = 'valleVentas_ordenes';

/** Verifica si existe una sesión activa en localStorage. */
function verificarAutenticacion() {
    const sessionValue = localStorage.getItem(localStorageSessionKey);
    return !!sessionValue;
}
/** Actualiza la interfaz de usuario (header) basándose en el estado de autenticación. */
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

/** Elimina la clave de sesión de localStorage y redirige al inicio. */
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
        description: "<b>Ergonomía de Alto Rendimiento para Jornadas Largas</b><br> Conoce la Silla Ejecutiva Vertex, diseñada para profesionales que exigen el máximo confort y soporte durante largas jornadas de trabajo. Fusionando un diseño vanguardista con principios ergonómicos avanzados, esta silla no solo transforma tu oficina, sino que también invierte en tu bienestar y productividad.<br><br><b>Características que Marcan la Diferencia</b><br><br>* <b>Respaldo Mallado Transpirable:</b> El tejido de malla de alta densidad favorece la circulación de aire, manteniendo tu espalda fresca y seca, a la vez que proporciona un soporte lumbar flexible y dinámico.<br>*<b>Soporte Completo:</b> Incluye un reposacabezas ajustable para aliviar la tensión cervical y brazos regulables que se adaptan a la altura de tu escritorio, promoviendo una postura corporal correcta.<br>* <b>Mecanismo Sincronizado:</b> Permite inclinar el respaldo y el asiento de forma coordinada, adaptándose a tu movimiento y asegurando un equilibrio perfecto en cualquier posición de descanso o trabajo.<br><br><b>Especificaciones Técnicas</b><br><br><b>Materiales:</b> Estructura/Base: Nylon de alta resistencia o Aluminio pulido. Tapicería: Malla técnica transpirable (Respaldo) y espuma de alta densidad con tapizado de tela (Asiento).<br><b>Medidas:</b> Altura Total: 115 cm a 130 cm (Ajustable) / Ancho Asiento: 50 cm / Profundidad Asiento: 50 cm.<br><b>Peso:</b> 18 kg, robusta para soportar hasta 120 kg).<br><b>Ajustes:</b> Altura, Inclinación (con bloqueo), Tensión lumbar, Altura de brazos, Ángulo de reposacabezas.<br>",
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
        description: "<b>Bienestar Silencioso Bajo tu Escritorio</b><br>Descubre el reposapiés Aura, la pieza que completa tu estación de trabajo ergonómica. Diseñado bajo el principio minimalista, ofrece un soporte esencial sin desentonar con la estética de tu oficina. Es la solución discreta para mejorar la postura, la circulación y reducir la fatiga durante largas horas sentado.<br><br><b>Características que Impulsan tu Comodidad</b><br><br>* <b>Ángulo de Inclinación Dinámico:</b> Permite un movimiento suave de balanceo, estimulando la circulación sanguínea en las piernas y previniendo la rigidez y el hormigueo.<br>* <b>Diseño Minimalista:</b> Su estructura limpia y su perfil bajo lo hacen virtualmente invisible, enfocándose solo en la función ergonómica sin añadir desorden visual.<br>* <b>Superficie Antideslizante:</b> La plataforma superior está diseñada con texturas o gomas para asegurar que tus pies permanezcan en su lugar de forma segura y cómoda.<br><br><b>Especificaciones Técnicas</b><br><br><b>Materiales:</b> Plataforma: Plástico ABS de alto impacto. Estructura/Base: Acero tubular.<br><b>Medidas:</b> Ancho: 45 cm / Fondo: 30 cm a 35 cm / Altura Mínima: 10 cm a 12 cm.<br><b>Peso:</b> 2 kg (Ligero para ajustar, pero firme y estable).<br><b>Ajustes:</b> Inclinación y/o Altura<br>",
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
        description: "<b>La Postura Perfecta para tu Productividad Móvil</b><br>Presentamos el soporte para laptop Elevate, la herramienta esencial para transformar cualquier superficie en una estación de trabajo ergonómica y moderna. Su diseño minimalista y estructura de líneas limpias no solo complementan tu estilo, sino que te ayudan a elevar la pantalla a la altura ideal de los ojos, aliviando la tensión en el cuello y la espalda.<br><br><b>Características que Optimizan tu Trabajo</b><br><br>* <b>Ergonomía Instantánea:</b> Eleva tu pantalla para alinearla con la vista, mejorando la postura y reduciendo la fatiga visual y cervical.<br>* <b>Refrigeración Activa:</b> El diseño abierto y minimalista maximiza el flujo de aire alrededor de tu laptop, previniendo el sobrecalentamiento y manteniendo el rendimiento óptimo del equipo.<br>* <b>Portabilidad y Estabilidad:</b> Es ligero y desmontable/plegable, facilitando su transporte. Sus bases de silicona o caucho aseguran que el soporte y la laptop permanezcan fijos.<br><br><b>Especificaciones Técnicas</b><br><br><b>Materiales:</b> Aluminio Anodizado.<br><b>Medidas:</b> Ancho de Base: 25 cm / Fondo: 28 cm / Altura Elevación: 10 cm<br><b>Peso:</b> 0.5 kg.<br><b>Capacidad:</b> Soporta laptops de hasta 5 kg.",
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
        description: "<b>Trabaja en Movimiento: Adaptabilidad y Ergonomía del Siglo XXI</b><br>El escritorio Kinetic Pro es más que una superficie de trabajo; es una inversión en tu salud y productividad. Con un diseño moderno y minimalista, este escritorio con motor te permite pasar fluidamente de la posición sentada a la posición de pie en segundos, ajustándose perfectamente a tu ritmo biológico y previniendo los problemas de salud asociados al sedentarismo.<br><br><b>Características que Impulsan tu Día</b><br><br>* <b>Ajuste Motorizado Silencioso:</b> Equipado con un sistema de motor dual potente y casi inaudible, el ajuste de altura es suave y rápido, sin interrumpir tu concentración.<br>* <b>Memoria Programable:</b> Incluye un panel de control digital con la opción de guardar 3 o 4 alturas preestablecidas (sentado, de pie, altura de reunión), cambiando solo con tocar un botón.<br>* <b>Diseño Robusto y Versátil:</b> La estructura de acero soporta con seguridad todo tu equipo, desde múltiples monitores hasta pesados archivos, asegurando cero tambaleo en cualquier altura.<br><br><b>Especificaciones Técnicas</b><br><br><b>Materiales:</b> Base/Patas: Acero laminado de alta resistencia con acabado de pintura electrostática. <br>Superficie: Tablero de Melamina de alta densidad (25 mm) con acabado en Nogal, Roble claro.<br><b>Medidas:</b> Ancho: 160 cm / Fondo: 80 cm.<br><b>Rango de Altura:</b> 70 cm (sentado) a 120 cm (de pie).<br><b>Peso:</b> 50 kg.<br><b>Capacidad de Carga:</b> 120 kg.",
        image: "../assets/escritorioMotor/1.webp",
        secondary_images: [
            "../assets/escritorioMotor/2.webp"
        ],
        tags: ["mueble"]
    }
];

/** Inicializa el inventario en localStorage si no existe, usando la clave INVENTORY_STORAGE_KEY. */
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

/** Recupera la lista de productos de localStorage o usa el inventario inicial, asegurando tipos de datos correctos. */
function getProducts() {
    const inventoryJson = localStorage.getItem(INVENTORY_STORAGE_KEY);
    let products = INVENTARIO_INICIAL; 

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
        id: Number(p.id) || p.id, 
        stock: Math.round(Number(p.stock) || 0), 
        price: Number(p.price) || 0
    }));
}

/** Formatear cantidades numéricas al formato COP. */
function formatoMoneda(cantidad) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP', 
        minimumFractionDigits: 0,
    }).format(cantidad);
}

/** Renderiza la tarjeta de los productos en el catálogo. */
function renderProducts() {
    const productList = getProducts(); 
    const container = document.getElementById('products-container');
    if (!container) {
        console.error("El contenedor 'products-container' no fue encontrado.");
        return;
    }

    let html = '';

    productList.forEach(product => {
        const formattedPrice = formatoMoneda(product.price);
        const isSoldOut = product.stock === 0;
        const buttonText = isSoldOut ? 'Agotado' : 'Agregar al carrito';
        const buttonDisabled = isSoldOut ? 'disabled' : '';

       
 const addItemCall = `agregarItem(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')`;

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

/** Determinar clave de almacenamiento del carrito usando el email */
function getCartKey() {
    const userEmail = localStorage.getItem(localStorageSessionKey);

    if (userEmail) {
        return `carrito_usuario_${userEmail}`;
    } else {
        return CART_ANON_KEY;
    }
}

/** Cargar carrito de localStorage basado en la clave de sesión. */
function cargarCarrito() {
    const key = getCartKey();
    const itemsJson = localStorage.getItem(key);
    return itemsJson ? JSON.parse(itemsJson) : [];
}

/** Guardar lista de ítems del carrito en localStorage usando la clave de sesión. */
function guardarCarrito(items) {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(items));
}

//Funciones del carrito

/** Agregar producto al carrito, verificar el stock y manejar cantidad máxima. */
function agregarItem(productId, name, price, image) {
    const inventory = getProducts();
    const numericProductId = Number(productId); 
    const productInStock = inventory.find(p => p.id === numericProductId);

    if (!productInStock || productInStock.stock === 0) {
        console.warn(`Producto ID ${productId} agotado o no encontrado.`);
        alert(`Lo sentimos, el producto ${name} está agotado o no se encuentra.`);
        return; 
    }
 
    let carrito = cargarCarrito();
    const itemExistente = carrito.find(item => item.id === numericProductId);

    if (itemExistente) {
        if (itemExistente.quantity < productInStock.stock) {
            itemExistente.quantity += 1;
        } else {
            console.warn(`No se puede agregar más. Stock máximo alcanzado: ${productInStock.stock}`);
            alert(`Solo puedes agregar ${productInStock.stock} unidades de este producto (${name}).`);
        }
    } else {
        const nuevoItem = {
            id: numericProductId, 
            name: name,
            price: Number(price) || 0, 
            quantity: 1,
            image: image,
        };
        carrito.push(nuevoItem);
    }
    guardarCarrito(carrito);
}

/** Eliminar producto específico del carrito por ID y recargar página. */
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

/** Modificar cantidad de un ítem del carrito, validar stock disponible y eliminar del carrito si es 0. */
function modificarCantidad(itemId, newQuantity) {
    let items = cargarCarrito();
    const quantity = parseInt(newQuantity);

    const inventory = getProducts();
    const product = inventory.find(p => p.id == itemId);

    if (!product) return; 

    if (quantity > product.stock) {
        alert(`Solo quedan ${product.stock} unidades en stock, elije una cantidad valida.`);
        items[itemIndex].quantity = product.stock;
    }

    if (quantity <= 0) {
        eliminarItem(itemId);
        return;
    }

    const itemIndex = items.findIndex(item => item.id == itemId);

    if (itemIndex !== -1) {
        items[itemIndex].quantity = Math.min(quantity, product.stock);
        guardarCarrito(items);

        if (window.location.pathname.includes('carrito.html')) {
            location.reload();
        }
    }
}

//Reseñas

/** Cargar reseñas del LocalStorage. */
function loadReviews() {
    const reviewsJson = localStorage.getItem(REVIEWS_STORAGE_KEY);
    return reviewsJson ? JSON.parse(reviewsJson) : [];
}

/** Guardar array de reseñas en localStorage. */
function saveReviews(reviews) {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}

/** Procesar y almacenar reseña de producto específico. */
function submitReview(productId, rating, comment) {
    const currentUserEmail = localStorage.getItem(localStorageSessionKey);

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

/** Cargar pedidos de LocalStorage. */
function loadOrders() {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
}

/** Guardar array de pedidos en localStorage. */
function saveOrders(orders) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

/** Renderiza el resumen de los productos en el carrito y calcula el total a pagar en la página de checkout. */
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


/**Auto-rellenar campos Nombre, Apellido y Email si el usuario está logeado para el checkout.*/
window.autofillUserData = function() {
    const USERS_DATA_KEY = 'demoUsers'; 
    const userEmail = localStorage.getItem(localStorageSessionKey);

    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const telefonoInput = document.getElementById('telefono');
    const direccionInput = document.getElementById('direccion');

    if (userEmail && emailInput) {
        emailInput.value = userEmail;
        emailInput.readOnly = true; 
        
        const usersArrayJSON = localStorage.getItem(USERS_DATA_KEY); 
        
        if (usersArrayJSON) {
            try {
                const usersArray = JSON.parse(usersArrayJSON); 
                const foundUser = usersArray.find(user => user.email === userEmail);
                
                if (foundUser) {
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
        if (emailInput) emailInput.readOnly = false;
    }
};

function autofillFromEmail(email, nombreInput, apellidoInput) {
    if (!email || !nombreInput || !apellidoInput) return;
    
    try {
        const parts = email.split('@')[0].split('.');
        if (parts.length >= 2) {
            const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            const lastName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            
            nombreInput.value = firstName;
            apellidoInput.value = lastName;
        }
    } catch (e) {
    }
}

//Obtener información cliente y almacenar información compra.
window.handlePurchase = function() {
    clearMessage(); 
    
    const items = cargarCarrito();
    const mensajeDiv = document.getElementById('mensaje-compra'); 

    const customerData = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
    };

    if (items.length === 0) {
        showMessage("Error: No hay productos en el carrito para comprar. Por favor, agregue artículos.");
        return;
    }
    //Validar campos
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
    
    const phoneRegex = /^\d{10}$/;
    if (!customerData.telefono || !phoneRegex.test(customerData.telefono)) {
        showMessage("Por favor, ingresa un número de teléfono válido (solo números, de 10 dígitos).");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerData.email || !emailRegex.test(customerData.email)) {
        showMessage("Por favor, ingresa una dirección de email válida.");
        return;
    }
    
    const totalElement = document.getElementById('resumen-total');
    const total = totalElement ? totalElement.textContent : 'N/A';
    
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

//Actualizar stock después de compra.
function updateProductStock(purchasedItems) {
    let currentInventory = getProducts(); 
    purchasedItems.forEach(item => {
        const itemId = Number(item.id); 
        const purchasedQuantity = item.quantity;
        
        const productIndex = currentInventory.findIndex(p => Number(p.id) === itemId);
        
        if (productIndex !== -1) {
            const product = currentInventory[productIndex];
            
            if (product.stock >= purchasedQuantity) {
                product.stock -= purchasedQuantity;
                console.log(`Stock actualizado para ID ${itemId}: Nuevo stock = ${product.stock}`);
            } else {
                console.error(`¡Error de stock! Se intentó comprar ${purchasedQuantity} unidades, pero solo quedan ${product.stock}. No se pudo actualizar el stock.`);
            }
        } else {
            console.warn(`Producto con ID ${itemId} comprado no fue encontrado en el inventario.`);
        }
    });
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(currentInventory));
    console.log("Inventario guardado después de la compra.");
}

//Mostrar mensaje de error o exito en checkout.
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

function clearMessage() {
    const mensajeDiv = document.getElementById('mensaje-compra');
    if (!mensajeDiv) return;
    mensajeDiv.classList.add('hidden');
    mensajeDiv.innerHTML = '';
}

//Mostrar historial de compras en el perfil
window.renderOrderHistory = function() {
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

    const userOrders = orders.filter(order => order.cliente && order.cliente.email === userEmail);
    
    if (userOrders.length === 0) {
        historyContainer.innerHTML = '<p class="text-gray-500 p-4">Aún no has realizado ninguna compra con esta cuenta.</p>';
        return;
    }

    userOrders.sort((a, b) => b.id - a.id);

    let html = userOrders.map(order => {
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

//Orden de funciones a ejecutar apenas se cargue la página.
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    initializeInventory();
    renderProducts();
    const logoutHeaderBtn = document.getElementById('logout');

    if (logoutHeaderBtn) {
        logoutHeaderBtn.addEventListener('click', cerrarSesion);
    }
});

