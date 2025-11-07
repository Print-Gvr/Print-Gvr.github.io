

// Asegúrate de que getProducts() y agregarItem() están disponibles en este archivo



function loadProductDetail() {
    // 1. Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')); 

    if (isNaN(productId) || !productId) {
        console.error("Producto no encontrado o ID inválido.");
        window.location.href = 'catalogo.html'; 
        return;
    }
    
    // 2. Buscar el producto (Asume que getProducts() está disponible globalmente)
    const productList = getProducts(); 
    const product = productList.find(p => p.id === productId);

    if (!product) {
        console.error("Producto no encontrado en el inventario.");
        window.location.href = 'catalogo.html'; 
        return;
    }

    // 3. Contenedores
    const imageContainer = document.getElementById('product-image-container');
    const infoContainer = document.getElementById('product-info-container');
    
    // 4. Lógica para la Galería de Imágenes
    const secondaryImages = product.secondary_images || []; 
    // Unir la imagen principal con todas las imágenes secundarias sin límite
    const allImages = [product.image, ...secondaryImages];

    // Almacenamos todas las URLs de imagen en un atributo para el JS de navegación
    imageContainer.setAttribute('data-all-images', JSON.stringify(allImages));

    // Estructura de la galería (Imagen Principal + Miniaturas)
    imageContainer.innerHTML = `
        <div id="product-thumbnails" class="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 order-2 lg:order-1">
            </div>
        <div id="main-product-image" class="w-full lg:w-4/5 shadow-xl rounded-lg overflow-hidden order-1 lg:order-2">
            <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="w-full h-full object-cover rounded-lg"
                data-current-index="0"
            >
        </div>
    `;

    // 5. Renderizar Miniaturas
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    let thumbnailsHTML = '';

    allImages.forEach((url, index) => {
        // Marcamos la primera imagen (principal) como activa
        const isActive = index === 0 ? 'border-purple-500 border-2' : 'border-transparent';
        
        // La llamada pasa la URL y el índice para que changeMainImage actualice el estado
        thumbnailsHTML += `
            <img src="${url}" 
                 alt="Vista ${index + 1}"
                 class="thumbnail w-16 h-16 object-cover rounded-md cursor-pointer hover:border-purple-400 transition ${isActive}"
                 onclick="changeMainImage('${url}', event, ${index})"
            >
        `;
    });

    thumbnailsContainer.innerHTML = thumbnailsHTML;


    // 6. Generar el HTML de INFO
    
    // Limpieza de datos para evitar errores de comillas en el onclick
    const formattedPrice = formatoMoneda(product.price);
    const cleanName = product.name.replace(/'/g, "\\'");
    const imagePath = product.image || ''; 
    const cleanImage = imagePath.replace(/'/g, "\\'"); 

    // Función de JS para el botón: ID, NOMBRE, PRECIO, IMAGEN
    const addItemCall = `agregarItem(${product.id}, '${cleanName}', ${product.price}, '${cleanImage}')`;

    infoContainer.innerHTML = `
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">${product.name}</h1>
        <p class="text-5xl font-bold text-purple-700 mb-6">${formattedPrice} COP</p>
        
        <h2 class="text-2xl font-semibold text-gray-800 mt-4 mb-2">Descripción</h2>
        <p class="text-xl text-gray-600 leading-relaxed">${product.description}</p>
        
        <div class="mt-8 flex items-center gap-4">
            <button 
                onclick="${addItemCall}"
                class="px-8 py-4 bg-blue-400 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-purple-800 transition duration-300 w-full lg:w-auto"
            >
                Agregar al Carrito
            </button>
            <span class="text-lg text-gray-500">Stock: ${product.stock}</span>
        </div>
    `;

    // Asume que renderReviewSection() está definido y accesible
    // renderReviewSection(productId); 

    // 🛑 LLAMADA CLAVE: Configurar la navegación por teclado
    setupKeyboardNavigation(); 
}

// -------------------------------------------------------------------------
// FUNCIÓN AUXILIAR PARA CAMBIAR LA IMAGEN PRINCIPAL (usada por clic y teclado)
// -------------------------------------------------------------------------
function changeMainImage(newSrc, event, newIndex) {
    const mainImageElement = document.querySelector('#main-product-image img');
    if (mainImageElement) {
        mainImageElement.src = newSrc;
        // Actualiza el índice actual
        mainImageElement.setAttribute('data-current-index', newIndex); 
    }

    // Remover la clase activa de todas las miniaturas
    document.querySelectorAll('#product-thumbnails img').forEach(img => {
        img.classList.remove('border-purple-500', 'border-2');
        img.classList.add('border-transparent');
    });

    // Añadir la clase activa solo a la miniatura clickeada o seleccionada
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('border-purple-500', 'border-2');
        event.currentTarget.classList.remove('border-transparent');
    }
}

// -------------------------------------------------------------------------
// FUNCIÓN NUEVA: NAVEGACIÓN POR TECLADO
// -------------------------------------------------------------------------
function setupKeyboardNavigation() {
    // 1. Obtener la lista de URLs y la imagen principal
    const imageContainer = document.getElementById('product-image-container');
    const allImages = JSON.parse(imageContainer.getAttribute('data-all-images') || '[]');
    const mainImageElement = document.querySelector('#main-product-image img');

    if (allImages.length <= 1) return; // No hay navegación si solo hay 1 imagen

    document.addEventListener('keydown', (e) => {
        // Asegurarse de que no estamos escribiendo en un formulario
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return; 

        if (!mainImageElement) return;

        let currentIndex = parseInt(mainImageElement.getAttribute('data-current-index'));
        let nextIndex = currentIndex;

        if (e.key === 'ArrowRight') {
            // Avanzar: Si no es la última imagen, ir a la siguiente, sino volver a la primera (0)
            nextIndex = (currentIndex < allImages.length - 1) ? currentIndex + 1 : 0;
            e.preventDefault(); // Evitar desplazamiento de página
        } else if (e.key === 'ArrowLeft') {
            // Retroceder: Si no es la primera, ir a la anterior, sino ir a la última
            nextIndex = (currentIndex > 0) ? currentIndex - 1 : allImages.length - 1;
            e.preventDefault(); // Evitar desplazamiento de página
        } else {
            return; // No es una tecla de flecha relevante
        }

        // 2. Obtener la nueva URL y la miniatura correspondiente
        const newSrc = allImages[nextIndex];
        const newThumbnail = document.querySelectorAll('#product-thumbnails img')[nextIndex];
        
        // 3. Aplicar el cambio a través de changeMainImage
        // Simulamos un evento para que changeMainImage actualice el borde
        const mockEvent = { currentTarget: newThumbnail };

        changeMainImage(newSrc, mockEvent, nextIndex);
    });
    renderReviewSection();
}

//Comentarios

function renderReviewSection(productId) {
    const formContainer = document.getElementById('review-form-container');
    const reviewsListContainer = document.getElementById('reviews-list');
    const currentUserEmail = localStorage.getItem('currentDemoUser');
    
    // --- Lógica de Autenticación (Formulario vs. Mensaje) ---
    if (currentUserEmail) {
        // 1. USUARIO LOGEADO: Renderiza el Formulario
        formContainer.innerHTML = `
            <h3 class="text-xl font-semibold mb-3">Deja tu Reseña como ${currentUserEmail}</h3>
            <form id="review-form" class="bg-gray-50 p-6 rounded-lg shadow-md">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Puntuación (1-5)</label>
                    <input type="number" id="review-rating" min="1" max="5" value="5" required
                        class="mt-1 block w-20 rounded-md border-gray-300 shadow-sm p-2"
                    >
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Comentario</label>
                    <textarea id="review-comment" rows="4" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3"
                    ></textarea>
                </div>
                <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                    Enviar Reseña
                </button>
            </form>
        `;
        
        // 🚨 Conecta el evento de envío del formulario
        document.getElementById('review-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const rating = document.getElementById('review-rating').value;
            const comment = document.getElementById('review-comment').value;
            // Llama a la función de envío que está en funciones_base.js
            submitReview(productId, rating, comment); 
        });

    } else {
        // 2. USUARIO NO LOGEADO: Renderiza el mensaje de inicio de sesión
        formContainer.innerHTML = `
            <div class="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                <p class="font-semibold">¡Inicia Sesión para Comentar!</p>
                <p>Solo los usuarios registrados pueden dejar valoraciones. 
                <a href="login.html" class="text-blue-600 hover:underline">Ir a Iniciar Sesión</a></p>
            </div>
        `;
    }

    // --- Carga la Lista de Reseñas sin importar el estado de la sesión ---
    renderProductReviews(productId);
}


function renderProductReviews(productId, container = document.getElementById('reviews-list')) {
    // La función loadReviews() está en funciones_base.js
    const allReviews = loadReviews(); 
    const productReviews = allReviews.filter(r => r.productId === productId);
    
    if (productReviews.length === 0) {
        container.innerHTML = '<p class="text-gray-500">Sé el primero en dejar una reseña para este producto.</p>';
        return;
    }

    let reviewsHTML = productReviews.map(review => `
        <div class="border-b border-gray-200 pb-4 mb-4">
            <div class="flex items-center justify-between">
                <p class="font-bold text-gray-800">${review.userEmail.split('@')[0]}</p>
                <p class="text-sm text-gray-500">${review.date}</p>
            </div>
            <p class="text-yellow-500 font-bold mt-1">Puntuación: ${'⭐'.repeat(review.rating)}</p>
            <p class="mt-2 text-gray-700">${review.comment}</p>
        </div>
    `).join('');

    container.innerHTML = reviewsHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail(); 
});