document.addEventListener('DOMContentLoaded', () => {
    if (!window.localStorage) {
        alert('Tu navegador no soporta LocalStorage. El checkout no funcionará.');
        return;
    }
    
    // Todas estas funciones fueron expuestas globalmente con 'window.' en index.js
    window.renderCheckoutSummary(); 
    window.autofillUserData();
    
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        window.handlePurchase();
    });
});