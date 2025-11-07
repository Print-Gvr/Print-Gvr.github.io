  const localStorageSessionKey = 'currentDemoUser';
  const CART_ANON_KEY = 'carrito_anonimo';
  const INVENTORY_STORAGE_KEY = 'valleVentas_inventario';
  const REVIEWS_STORAGE_KEY = 'valleVentas_reviews'; 

//Login
    function verificarAutenticacion() {
    // 1. Declarar y ASIGNAR el valor de la sesión a una variable local
    const sessionValue =  localStorage.getItem(localStorageSessionKey); 
    
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
    window.location.href = 'login.html'; 
    }

//Inventario

const INVENTARIO_INICIAL = [
    {
        id: 1001,
        name: "Camiseta Clásica",
        price: 29.99,
        stock: 50,
        description: "Algodón 100% orgánico, color blanco.",
        image: "img/camiseta.jpg",
        secondary_images: [ 
        "assets/img/camiseta1_vista_trasera.jpg",
        "assets/img/camiseta1_detalle_tela.jpg",
        "assets/img/camiseta1_puesta.jpg"
    ]
    },
    {
        id: 1002,
        name: "Pantalón Denim Ajustado",
        price: 75.50,
        stock: 25,
        description: "Diseño Slim-Fit, talla 30-36.",
        image: "img/pantalon.jpg",
        secondary_images: [ 
        "assets/img/camiseta1_vista_trasera.jpg",
        "assets/img/camiseta1_detalle_tela.jpg",
        "assets/img/camiseta1_puesta.jpg"
    ]
    },
    {
        id: 1003,
        name: "Zapatillas Urbanas",
        price: 110.00,
        stock: 15,
        description: "Modelo deportivo y casual.",
        image: "img/zapatillas.jpg",
        secondary_images: [ 
        "assets/img/camiseta1_vista_trasera.jpg",
        "assets/img/camiseta1_detalle_tela.jpg",
        "assets/img/camiseta1_puesta.jpg"
    ]
    },
    {
        id: 103,
        name: "Zapatillas Urbanas",
        price: 110.00,
        stock: 15,
        description: "Modelo deportivo y casual.",
        image: "img/zapatillas.jpg",
        secondary_images: [ 
        "assets/img/camiseta1_vista_trasera.jpg",
        "assets/img/camiseta1_detalle_tela.jpg",
        "assets/img/camiseta1_puesta.jpg"
        ]
    },
    {
        id: 1022,
        name: "Zapatillas Urbanas",
        price: 110.00,
        stock: 15,
        description: "Modelo deportivo y casual.",
        image: "img/zapatillas.jpg",
        secondary_images: [ 
        "assets/img/camiseta1_vista_trasera.jpg",
        "assets/img/camiseta1_detalle_tela.jpg",
        "assets/img/camiseta1_puesta.jpg"
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
    function renderProducts() {
    const productList = getProducts(); // Obtiene la lista de productos del inventario
    const container = document.getElementById('products-container'); 

    if (!container) {
        console.log("No se encontró el contenedor de productos. Saltando renderizado.");
        return; 
    }
    
    // Verifica si el contenedor existe
    if (!container) {
        console.error("El contenedor 'products-container' no fue encontrado.");
        return; 
    }

    let html = '';
    
    productList.forEach(product => {
        // Preparación de variables
        const isSoldOut = product.stock === 0;
        const buttonText = isSoldOut ? 'Agotado' : 'Agregar al carrito';
        const buttonDisabled = isSoldOut ? 'disabled' : '';
        
        // Función de JS que se ejecuta al hacer clic
        // Importante: Escapar comillas en el nombre del producto
        const addItemCall = `agregarItem(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price})`;


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
                        
                        <p class="mt-1.5 text-sm text-gray-700">$${product.price.toFixed(2)}</p>

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

    function agregarItem(productId, name, price) {
    let carrito = cargarCarrito();
    
    const itemExistente = carrito.find(item => item.id === productId);
    
    if (itemExistente) {
        itemExistente.quantity += 1;
    } else {
        const nuevoItem = {
            id: productId,
            name: name,
            price: price,
            quantity: 1, 
        };
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

