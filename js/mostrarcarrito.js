// En logica_carrito.js

function cargarPagCarrito() {
    const cartContainer = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total'); // Asume un div para el total


    if (!cartContainer || !totalElement) {
        console.error("Error: Contenedores de carrito no encontrados en carrito.html.");
        return;
    }

    const cartItems = cargarCarrito();
    console.log(cartItems);
    let cartTotal = 0;

    // --- Lógica si el Carrito está Vacío ---
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="p-8 text-center bg-gray-100 rounded-lg shadow-inner">
                <h2 class="text-2xl font-bold text-gray-700">Tu carrito está vacío 😔</h2>
                <p class="text-gray-500 mt-2">¡Explora nuestro catálogo para encontrar productos!</p>
                <a href="catalogo.html" class="mt-4 inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Ir al Catálogo
                </a>
            </div>
        `;
        totalElement.textContent = '$0.00';
        return;
    }

    // --- Lógica para Renderizar Items ---
    let cartHTML = '';
    
    

    cartItems.forEach(item => {
        const formattedPrice = formatoMoneda(item.price);
        const subtotal = item.price * item.quantity;
        const sumaFormato = formatoMoneda(subtotal)
        cartTotal += subtotal;
        
        
        // La función removerItem(itemId) debe existir en funciones_base.js
        const deleteCall = `eliminarItem('${item.id}')`; 
        const modifyCall = `modificarCantidad('${item.id}', this.value)`; 
        
        cartHTML += `
        <div class="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition">
            
            <div class="flex items-center space-x-4 flex-grow">
                <img src="${item.image || '../assets/default.png'}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                <div>
                    <h3 class="font-semibold text-gray-800">${item.name}</h3>
                    <p class="text-sm text-gray-500">${formattedPrice} c/u</p>
                </div>
            </div>

            <div class="flex items-center space-x-6">
                <input 
                    type="number"
                    min="1"
                    max="${item.stock}"
                    value="${item.quantity}"
                    onchange="${modifyCall}" 
                    class="p-1 text-center border rounded-md focus:ring-purple-500 focus:border-purple-500"
                    style="width: 35px;"
                    />
                
                <span class="font-bold text-lg text-purple-700 w-20 text-right">${sumaFormato}</span>
            </div>
            
            <div class="flex items-center justify-between p-4 hover:bg-gray-50 transition">
        
        <button 
    onclick="${deleteCall}"
    class="ml-4 text-red-500 hover:text-red-700 transition flex-shrink-0 p-2 rounded-full hover:bg-red-100 cursor-pointer" 
    title="Eliminar item"
>
    <svg width=30 height = 30 class="text-gray-500" stroke-width="1">
            <use xlink:href="../assets/sprites.svg#eliminar"></use>
          </svg>
</button>
    </div>
    </div>
    `;
    });
    const totalFormato = formatoMoneda(cartTotal);
    cartContainer.innerHTML = cartHTML;
    totalElement.textContent = `${totalFormato}`;
}

// --- Llamada al Cargar la Página ---
document.addEventListener('DOMContentLoaded', () => {
    cargarPagCarrito();
});