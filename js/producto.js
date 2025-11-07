

// Asegúrate de que getProducts() y agregarItem() están disponibles en este archivo

function changeMainImage(newSrc) {
    const mainImageElement = document.querySelector('#main-product-image img');
    if (mainImageElement) {
        // 1. Cambiar la fuente de la imagen grande
        mainImageElement.src = newSrc;
        
        // 2. Opcional: Actualizar el estado "activo" de las miniaturas
        const thumbnails = document.querySelectorAll('#product-thumbnails img');
        thumbnails.forEach(thumb => {
            thumb.classList.remove('border-purple-500', 'border-2');
            thumb.classList.add('border', 'border-gray-200');
        });
        
        // El elemento que llamó la función (this)
        const clickedThumbnail = event.currentTarget; 
        clickedThumbnail.classList.add('border-purple-500', 'border-2');
        clickedThumbnail.classList.remove('border', 'border-gray-200');
    }
}

function loadProductDetail() {
     const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')); 
    
    // NOTA: Los IDs para los contenedores de la galería ya no se buscan aquí 
    // porque ya están en el HTML estático.
    const mainImageContainer = document.getElementById('main-product-image');
    const thumbnailsContainer = document.getElementById('product-thumbnails');

    // 2. Si no hay ID o no es válido, redirigir o mostrar error
    if (isNaN(productId) || !productId) {
        // NOTA: Usar custom modal en lugar de alert()
        console.error("Producto no encontrado o ID inválido.");
        window.location.href = 'catalogo.html'; 
        return;
    }
    
    // 3. Buscar el producto en el inventario de localStorage
    const productList = getProducts(); 
    const product = productList.find(p => p.id === productId);

    if (!product) {
        console.error("Producto no encontrado en el inventario.");
        window.location.href = 'catalogo.html'; 
        return;
    }

    // ----------------------------------------------------
    // 4. GENERACIÓN DE LA GALERÍA DE IMÁGENES (NUEVA LÓGICA)
    // ----------------------------------------------------
    
    // A. Crea una lista de todas las imágenes (Principal + Secundarias)
    const allImages = [product.image];
    if (product.secondary_images && Array.isArray(product.secondary_images)) {
        allImages.push(...product.secondary_images);
    }
    
    // B. Inyectar la Imagen Principal
    mainImageContainer.innerHTML = `
        <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-full h-auto object-cover"
        >
    `;

    // C. Generar las Miniaturas
    let thumbnailsHTML = '';
    
    allImages.forEach((url, index) => {
        // La primera miniatura estará activa por defecto (clase border-purple-500)
        const activeClass = index === 0 ? 'border-purple-500 border-2' : 'border border-gray-200';
        
        // Usamos la función changeMainImage con la URL y el evento 'this'
        thumbnailsHTML += `
            <img 
                src="${url}" 
                alt="Vista ${index + 1}" 
                onclick="changeMainImage('${url}', event)"
                class="w-16 h-16 object-cover rounded-md cursor-pointer transition duration-150 transform hover:scale-105 ${activeClass}"
            >
        `;
    });

    thumbnailsContainer.innerHTML = thumbnailsHTML;
    
    // ----------------------------------------------------
    // 5. GENERAR INFO DEL PRODUCTO (LÓGICA EXISTENTE)
    // ----------------------------------------------------

    const infoContainer = document.getElementById('product-info-container');
    
    // Función de JS para el botón (usa el ID y precio del producto actual)
    const addItemCall = `agregarItem(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price})`;

    infoContainer.innerHTML = `
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">${product.name}</h1>
        <p class="text-5xl font-bold text-purple-700 mb-6">$${product.price.toFixed(2)}</p>
        
        <h2 class="text-xl font-semibold text-gray-800 mt-4 mb-2">Descripción</h2>
        <p class="text-gray-600 leading-relaxed">${product.description}</p>
        
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

    renderReviewSection(productId);
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