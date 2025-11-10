/**
 * =================================================================
 * MÓDULO DE INVENTARIO (Datos y Carga)
 * =================================================================
 */

const INVENTORY_STORAGE_KEY = 'valleVentas_inventario';

/**
 * Los datos iniciales se han simplificado a un array vacío
 * ya que asumimos que los datos ya están en localStorage.
 */
const initialProducts = []; 

/**
 * Inicializa el inventario: Carga SOLAMENTE desde localStorage usando la clave.
 * Si no encuentra nada, retorna un array vacío.
 * @returns {Array<Object>} La lista de productos.
 */
function initializeInventario() {
    try {
        const storedInventory = localStorage.getItem(INVENTORY_STORAGE_KEY);
        if (!storedInventory) return initialProducts;
        
        const products = JSON.parse(storedInventory).map(p => ({
            ...p,
            // CORRECCIÓN CLAVE: Aseguramos que el precio sea un número válido.
            price: Number(p.price) || 0 
        }));
        return products;

    } catch (e) {
        console.error("Error al acceder a localStorage. Retornando datos vacíos.", e);
        return initialProducts;
    }
}


/**
 * =================================================================
 * LÓGICA DEL CATÁLOGO (Control y Renderizado)
 * =================================================================
 */

// --- ESTADO GLOBAL ---
let allProducts = [];       
let activeTags = [];        
let allAvailableTags = [];  

// --- FUNCIONES NECESARIAS PARA EL RENDERIZADO (GLOBALES) ---

/**
 * Formatea un número como moneda (COP).
 * EXPONER GLOBALMENTE para que el HTML en el renderizado pueda llamarla
 */
    window.formatoMoneda = function(amount) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
    }

// --- LÓGICA DE FILTRADO, BÚSQUEDA Y ORDENAMIENTO ---

function filterAndSearchProducts(productsList, searchText, activeTags) {
    let filteredProducts = productsList;

    const searchLower = searchText.toLowerCase().trim();
    if (searchLower) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchLower)
        );
    }

    if (activeTags && activeTags.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return activeTags.every(activeTag =>
                product.tags.includes(activeTag)
            );
        });
    }
    return filteredProducts;
}

function sortProducts(productsList, sortKey, sortDirection) {
    return productsList.slice().sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        let comparison = 0;

        if (sortKey === 'name') {
            comparison = String(valA).localeCompare(String(valB));
        } else if (sortKey === 'price') {
            // Esto ordena de menor a mayor (ascendente)
            comparison = valA - valB; 
        }
        
        // Aquí aplicas el cambio de dirección.
        return sortDirection === 'desc' ? comparison * -1 : comparison;
    });
}

// --- RENDERIZADO Y CONTROL DE UI ---

/**
 * Renderiza la lista de productos usando el nuevo template literal y el contenedor 'products-container'.
 */
function renderProducts(productsToRender) {
    const container = document.getElementById('products-container'); 

    if (!container) {
        console.error("El contenedor 'products-container' no fue encontrado.");
        return;
    }
    
    container.innerHTML = ''; 
    console.log(`Intentando renderizar ${productsToRender.length} productos.`);

    if (productsToRender.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-xl text-gray-500 mt-10 p-6 bg-white rounded-lg shadow-inner">No se encontraron productos que coincidan con los filtros aplicados. Intenta cambiar los criterios de búsqueda o etiquetas.</p>';
        return;
    }

    let html = '';

    productsToRender.forEach(product => {
        // Preparación de variables
        const formattedPrice = formatoMoneda(product.price);
        const isSoldOut = product.stock <= 0; 
        const buttonText = isSoldOut ? 'Agotado' : 'Agregar al carrito';
        const buttonDisabled = isSoldOut ? 'disabled' : '';

        // Escapar comillas en el nombre del producto para la llamada JS
        const escapedName = product.name.replace(/'/g, "\\'"); 
        const addItemCall = `agregarItem('${product.id}', '${escapedName}', ${product.price}, '${product.image}')`;

        // --- TEMPLATE LITERAL ---
        html += `
            <div class="product-card">
                <a href="info.html?id=${product.id}" class="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition duration-300">

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

                        <div class="mt-4">
                            <button 
                                onclick="event.preventDefault(); ${addItemCall}"
                                ${buttonDisabled}
                                class="block w-full rounded-sm text-white bg-blue-400 y p-4 text-sm font-medium transition hover:scale-[1.02] ${isSoldOut ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-purple-900'}"
                            >
                                ${buttonText}
                            </button>
                        </div>
                    </div>
                </a>
            </div>
        `;

    });
    container.innerHTML = html;
}


function renderTags() {
    const tagsContainer = document.getElementById('tags-container');
    tagsContainer.innerHTML = '';

    allAvailableTags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.textContent = tag.charAt(0).toUpperCase() + tag.slice(1); 
        tagButton.dataset.tag = tag;
        
        const isActive = activeTags.includes(tag);
        
        tagButton.className = `tag-button w-full px-4 py-2 text-sm font-medium rounded-lg border transition duration-150 text-left shadow-sm 
            ${isActive ? 'tag-active border-accent' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`;
        
        tagButton.onclick = () => toggleTag(tag);
        tagsContainer.appendChild(tagButton);
    });
}

function toggleTag(tag) {
    const index = activeTags.indexOf(tag);
    if (index > -1) {
        activeTags.splice(index, 1); 
    } else {
        activeTags.push(tag); 
    }
    renderTags();
    updateCatalogView();
}

/**
 * Función maestra que recolecta todos los parámetros y renderiza la vista.
 */
function updateCatalogView() {
    console.log("Actualizando vista del catálogo...");
    const searchText = document.getElementById('search-input').value;
    const sortValue = document.getElementById('sort-select').value;
    const [sortKey, sortDirection] = sortValue.split('_');

    console.log(`Intentando ordenar por clave: ${sortKey}, dirección: ${sortDirection}`);

    const filtered = filterAndSearchProducts(allProducts, searchText, activeTags);
    const finalProducts = sortProducts(filtered, sortKey, sortDirection);

    renderProducts(finalProducts);
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Cargado. Iniciando aplicación del catálogo.");
    
    // 1. Cargar productos SOLAMENTE desde localStorage
    allProducts = initializeInventario();
    
    if (allProducts.length === 0) {
        document.getElementById('products-container').innerHTML = '<p class="col-span-full text-center text-xl text-red-500 mt-10 p-6 bg-white rounded-lg shadow-inner">Error: No se pudieron cargar datos. Asegúrate de que el inventario se haya guardado en localStorage correctamente.</p>';
        return;
    }
    
    // 2. Obtener todos los tags únicos
    const allTagsSet = new Set();
    allProducts.forEach(p => {
        if (p.tags && Array.isArray(p.tags)) {
            p.tags.forEach(tag => allTagsSet.add(tag.toLowerCase()));
        }
    });
    allAvailableTags = Array.from(allTagsSet).sort(); 
    console.log(`Tags disponibles (${allAvailableTags.length}): ${allAvailableTags.join(', ')}`);

    // 3. Renderizar vista inicial
    renderTags();
    updateCatalogView(); 

    // 4. Conectar Event Listeners
    document.getElementById('search-input').addEventListener('input', updateCatalogView);
    document.getElementById('sort-select').addEventListener('change', updateCatalogView);
    
    document.getElementById('clear-filters-btn').addEventListener('click', () => {
        activeTags = []; 
        document.getElementById('search-input').value = ''; 
        document.getElementById('sort-select').value = 'name_asc'; 
        renderTags(); 
        updateCatalogView(); 
    });
});