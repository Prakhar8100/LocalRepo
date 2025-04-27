// Store inventory data
let inventory = [];

// Get references to the form elements
const stockForm = document.getElementById('stockForm');
const itemNameInput = document.getElementById('itemName');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const inventoryList = document.getElementById('inventoryList');
const salesForm = document.getElementById('salesForm');
const soldItemSelect = document.getElementById('soldItem');
const soldQuantityInput = document.getElementById('soldQuantity');

// Handle adding items to stock
stockForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const itemName = itemNameInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceInput.value);

    if (!itemName || quantity <= 0 || price <= 0) return;

    const newItem = { name: itemName, quantity, price };
    inventory.push(newItem);
    updateInventoryDisplay();
    updateSoldItemOptions();

    // Clear form
    itemNameInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
});

// Handle sales
salesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const soldItemName = soldItemSelect.value;
    const soldQuantity = parseInt(soldQuantityInput.value);

    if (!soldItemName || soldQuantity <= 0) return;

    const item = inventory.find((item) => item.name === soldItemName);
    if (!item || item.quantity < soldQuantity) {
        alert('Not enough stock available!');
        return;
    }

    item.quantity -= soldQuantity;
    if (item.quantity === 0) {
        item.soldOut = true;
    }

    updateInventoryDisplay();
    updateSoldItemOptions();

    soldQuantityInput.value = '';
});

// Update inventory display
function updateInventoryDisplay() {
    inventoryList.innerHTML = '';

    inventory.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} - ${item.quantity} in stock`;

        if (item.soldOut || item.quantity === 0) {
            li.classList.add('sold-out');
            li.textContent += ' (Sold Out)';
        }

        inventoryList.appendChild(li);
    });
}

// Update sold item options in sales form
function updateSoldItemOptions() {
    soldItemSelect.innerHTML = '';
    inventory.forEach((item) => {
        if (item.quantity > 0 && !item.soldOut) {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            soldItemSelect.appendChild(option);
        }
    });
}

// Initialize the application by updating the display
updateInventoryDisplay();
updateSoldItemOptions();
