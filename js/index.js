const localStorageSessionKey = 'currentDemoUser';
const CART_ANON_KEY = 'carrito_anonimo';
const INVENTORY_STORAGE_KEY = 'valleVentas_inventario';
const REVIEWS_STORAGE_KEY = 'valleVentas_reviews';

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
        price: 900.000,
        stock: 8,
        description: "Elegancia Minimalista para el Profesional Moderno Transforme su espacio de trabajo con el Escritorio Nórdico Escandi una pieza que combina la calidez atemporal de la madera con un diseño limpio y minimalista. Creado para el profesional que valora tanto la estética como la funcionalidad, este escritorio es la pieza central perfecta para una oficina en casa o un despacho ejecutivo. <br><br> <b>Características Destacadas</b> <br><br>  <b>- Diseño Flotante y Estilizado:</b> Sus líneas puras y patas ligeramente inclinadas, características del diseño escandinavo, crean una apariencia ligera y aireada, maximizando la sensación de espacio en cualquier habitación. <br><br> <b>- Almacenamiento Discreto:</b> Incluye un cajón deslizable con herrajes de alta calidad, ideal para guardar de forma organizada sus esenciales de oficina y mantener la superficie de trabajo impecablemente despejada <br><br><b>- Acabado Premium:</b> La superficie de madera ha sido pulida y sellada para ofrecer una durabilidad superior y una resistencia notable a derrames y el desgaste diario.<br><br> <b>Especificaciones</b><br><br> <b>Material:</b> Madera maciza de Nogal y enchape de alta densidad.<br> <b>Medidas:</b> Ancho: 140 cm  Profundidad: 70 cm / Altura: 75 cm <br> <b>Peso:</b> 35 – 45 kg. <br> <b>Estilo:</b> Nórdico / Moderno <br> <b>Uso:</b> Oficina en Casa, Despacho, Estudio",
        image: "../assets/escritorioMadera/1.webp",
        secondary_images: [
            "../assets/escritorioMadera/2.webp",
            "../assets/escritorioMadera/3.webp",
            "../assets/escritorioMadera/4.webp",
        ]
    },
    {
        id: 2,
        name: "Archivador Minimalista 'Cubo'",
        price: 450.000,
        stock: 10,
        description: "<b>Organización Vertical, Diseño de Vanguardia</b><br><br>Presentamos el archivador 'Cubo', la solución definitiva para mantener tu oficina impecable sin sacrificar el estilo. Diseñado bajo una estética minimalista, este archivador es un complemento perfecto para cualquier espacio de trabajo moderno, ofreciendo <b>almacenamiento de alto rendimiento</b> en una silueta compacta y elegante.<br><br><b>Características Clave</b><br><br>• <b>Líneas Puras:</b> Su diseño de cubo monolítico, sin tiradores visibles (gracias al sistema push-to-open o bordes integrados), se integra perfectamente en entornos ejecutivos o de home office contemporáneos.<br><br>• <b>Movilidad y Estabilidad:</b> Equipado con <b>ruedas ocultas</b> de alta resistencia que permiten moverlo fácilmente bajo cualquier escritorio o mesa, o con niveladores fijos para mayor estabilidad (dependiendo del modelo específico).<br><br>• <b>Capacidad Ejecutiva:</b> Perfecto para mantener documentos sensibles o de uso frecuente a la mano, con espacio diseñado para <b>carpetas colgantes</b> de tamaño carta u oficio.<br><br><b>Especificaciones Técnicas</b><br><br><b>Material:</b> Estructura en lámina de acero laminado en frío (Calibre 22-24) para máxima durabilidad, con acabado de pintura electrostática <b>blanca o negra mate</b>.<br><b>Medidas:</b> Alto: 70 cm / Fondo: 48 cm / Ancho: 47 cm.<br><b>Peso:</b> 16 kg<br><b>Cajones:</b> 2 cajones con <b>correderas telescópicas</b> de extensión total.<br><b>Seguridad:</b> Cerradura central con llave para bloquear todos los cajones.",
        image: "../assets/archivador/1.webp",
        secondary_images: [
            "../assets/archivador/2.webp"
        ]
    },
    {
        id: 3,
        name: "Silla Ejecutiva Ergonómica 'Vertex'",
        price: 850.000,
        stock: 15,
        description: "Modelo deportivo y casual.",
        image: "../assets/sillaOficina/1.webp",
        secondary_images: [
            "../assets/sillaOficina/2.webp"
        ]
    },
    {
        id: 4,
        name: "Reposapiés Ergonómico 'Aura'",
        price: 100.000,
        stock: 6,
        description: "Modelo deportivo y casual.",
        image: "../assets/reposaPies/1.webp",
        secondary_images: [
            "../assets/reposaPies/2.webp"
        ]
    },
    {
        id: 5,
        name: "Soporte para Laptop 'Elevate'",
        price: 60.000,
        stock: 20,
        description: "Modelo deportivo y casual.",
        image: "../assets/soporteLaptop/1.webp",
        secondary_images: [
            "../assets/soporteLaptop/2.webp"
        ]
    },
    {
        id: 6,
        name: "Escritorio Elevable 'Kinetic Pro'",
        price: 1600.000,
        stock: 4,
        description: "Modelo deportivo y casual.",
        image: "../assets/escritorioMotor/1.webp",
        secondary_images: [
            "../assets/escritorioMotor/2.webp"
        ]
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

    if (inventoryJson) {
        return JSON.parse(inventoryJson);
    }

    return INVENTARIO_INICIAL;
}

function formatoMoneda(cantidad) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP', 
        minimumFractionDigits: 3,
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
                    
                    <button class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                        <span class="sr-only">Wishlist</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                        </svg>
                    </button>

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
    let carrito = cargarCarrito();

    const itemExistente = carrito.find(item => item.id === productId)

    if (itemExistente) {
        itemExistente.quantity += 1;
    } else {
        const nuevoItem = {
            id: productId,
            name: name,
            price: price,
            quantity: 1,
            image: image,
        };
        console.log(image);
        carrito.push(nuevoItem);
    }
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

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    initializeInventory();
    renderProducts();
    const logoutHeaderBtn = document.getElementById('logout');

    if (logoutHeaderBtn) {
        logoutHeaderBtn.addEventListener('click', cerrarSesion);
    }
});

