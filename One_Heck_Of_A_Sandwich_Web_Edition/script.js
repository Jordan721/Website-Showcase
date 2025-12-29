// Order state
let currentOrder = {
    sandwiches: [],
    drinks: [],
    chips: [],
    total: 0
};

// Current sandwich being built
let currentSandwich = {
    size: null,
    bread: null,
    toasted: false,
    toppings: [],
    surcharges: 0
};

// Topping counter for surcharges
let toppingCounter = {
    totalToppings: 0,
    extraToppings: 0,
    totalSauces: 0,
    extraSauces: 0,
    chargesMade: 0
};

// Pricing constants
const SURCHARGE_AMOUNT = 0.50;

const SANDWICH_PRICES = {
    '4': 5.50,
    '8': 7.00,
    '12': 8.50
};

const DRINK_PRICES = {
    'SMALL': 2.00,
    'MEDIUM': 2.50,
    'LARGE': 3.00
};

const CHIPS_PRICE = 1.50;

// Toppings data
const MEATS = ['🥩 Steak', '🍖 Ham', '🥪 Salami', '🥩 Roast Beef', '🍗 Chicken', '🥓 Bacon'];
const CHEESES = ['🧀 American', '🧀 Provolone', '🧀 Cheddar', '🧀 Swiss'];
const REGULAR_TOPPINGS = ['🥬 Lettuce', '🌶️ Peppers', '🧅 Onions', '🍅 Tomatoes', '🌶️ Jalapeños', '🥒 Cucumbers', '🥒 Pickles', '🥑 Guacamole', '🍄 Mushrooms'];
const SAUCES = ['🥪 Mayo', '💛 Honey Mustard', '🍅 Ketchup', '🥗 Ranch', '🧡 Thousand Islands', '🥗 Vinaigrette'];

// Clock update function
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const clockElement = document.getElementById('current-time');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Navigation functions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    // Add screen transition sound effect (visual feedback)
    const screen = document.getElementById(screenId);
    screen.style.animation = 'none';
    setTimeout(() => {
        screen.style.animation = '';
    }, 10);
}

function startNewOrder() {
    currentOrder = {
        sandwiches: [],
        drinks: [],
        chips: [],
        total: 0
    };
    updateOrderSummary();
    showScreen('order-menu');
}

function backToOrderMenu() {
    showScreen('order-menu');
}

function cancelOrder() {
    if (confirm('Are you sure you want to cancel this order? 🪦')) {
        showScreen('main-menu');
    }
}

function exitApp() {
    alert('Thank you for using One Heck Of A Sandwich! 🙇🏾\nHave one Heck of a Day Now 😈');
}

function returnToMain() {
    showScreen('main-menu');
}

function showAboutProject() {
    showScreen('about-project');
}

function goBackToMainSite() {
    // Navigate to the main index.html in the parent directory
    window.location.href = '../index.html';
}

// Sandwich building functions
function showBuildSandwich() {
    currentSandwich = {
        size: null,
        bread: null,
        toasted: false,
        toppings: [],
        surcharges: 0
    };
    toppingCounter = {
        totalToppings: 0,
        extraToppings: 0,
        totalSauces: 0,
        extraSauces: 0,
        chargesMade: 0
    };

    // Clear selections
    document.querySelectorAll('.btn-option-kiosk').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Reset toasted toggle
    const toastedBtn = document.getElementById('toasted-btn');
    if (toastedBtn) {
        toastedBtn.classList.remove('active');
        document.getElementById('toasted-text').textContent = 'TAP TO TOAST';
    }

    showScreen('build-sandwich');
}

// Toggle toasted function
function toggleToasted() {
    const btn = document.getElementById('toasted-btn');
    const text = document.getElementById('toasted-text');

    currentSandwich.toasted = !currentSandwich.toasted;

    if (currentSandwich.toasted) {
        btn.classList.add('active');
        text.textContent = 'TOASTED! 🔥';
    } else {
        btn.classList.remove('active');
        text.textContent = 'TAP TO TOAST';
    }
}

function selectSize(size) {
    currentSandwich.size = size;
    document.querySelectorAll('#build-sandwich .button-group-kiosk:first-of-type .btn-option-kiosk').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function selectBread(bread) {
    currentSandwich.bread = bread;
    document.querySelectorAll('#build-sandwich .button-group-kiosk:nth-of-type(2) .btn-option-kiosk').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function showToppingsSelection() {
    if (!currentSandwich.size || !currentSandwich.bread) {
        alert('Please select a size and bread type! 🥪');
        return;
    }

    // Populate toppings
    populateToppings('meats-list', MEATS, true, 'meat');
    populateToppings('cheese-list', CHEESES, true, 'cheese');
    populateToppings('regular-list', REGULAR_TOPPINGS, false, 'regular');
    populateToppings('sauce-list', SAUCES, false, 'sauce');

    updateSurchargeMessage();
    showScreen('toppings-selection');
}

function populateToppings(containerId, items, isPremium, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'topping-item';
        div.innerHTML = `
            <input type="checkbox" id="${type}-${index}" onchange="toggleTopping('${type}', ${index}, ${isPremium})">
            <label for="${type}-${index}">${item}</label>
            ${isPremium ? `<label class="topping-extra"><input type="checkbox" id="${type}-extra-${index}" onchange="toggleExtra('${type}', ${index})"> Extra</label>` : ''}
        `;
        container.appendChild(div);
    });
}

function toggleTopping(type, index, isPremium) {
    const checkbox = document.getElementById(`${type}-${index}`);
    const item = getToppingItem(type, index);

    if (checkbox.checked) {
        currentSandwich.toppings.push({
            name: item,
            type: type,
            isPremium: isPremium,
            isExtra: false,
            index: index
        });

        checkbox.parentElement.classList.add('selected');

        if (isPremium) {
            toppingCounter.totalToppings++;
        }

        checkForSurcharge();
    } else {
        currentSandwich.toppings = currentSandwich.toppings.filter(t =>
            !(t.type === type && t.index === index)
        );

        checkbox.parentElement.classList.remove('selected');

        if (isPremium) {
            const extraCheckbox = document.getElementById(`${type}-extra-${index}`);
            if (extraCheckbox && extraCheckbox.checked) {
                toppingCounter.extraToppings--;
            }
            toppingCounter.totalToppings--;
        }

        // Clear extra checkbox
        const extraCheckbox = document.getElementById(`${type}-extra-${index}`);
        if (extraCheckbox) {
            extraCheckbox.checked = false;
        }

        updateSurchargeMessage();
    }
}

function toggleExtra(type, index) {
    const extraCheckbox = document.getElementById(`${type}-extra-${index}`);
    const topping = currentSandwich.toppings.find(t => t.type === type && t.index === index);

    if (topping) {
        topping.isExtra = extraCheckbox.checked;

        if (extraCheckbox.checked) {
            toppingCounter.extraToppings++;
        } else {
            toppingCounter.extraToppings--;
        }

        checkForSurcharge();
    }
}

function getToppingItem(type, index) {
    switch(type) {
        case 'meat': return MEATS[index];
        case 'cheese': return CHEESES[index];
        case 'regular': return REGULAR_TOPPINGS[index];
        case 'sauce': return SAUCES[index];
    }
}

function checkForSurcharge() {
    const combinedTotal = toppingCounter.totalToppings + toppingCounter.totalSauces;
    const combinedExtras = toppingCounter.extraToppings + toppingCounter.extraSauces;

    let shouldCharge = false;
    let chargeReason = '';

    // Charge for every 3 total items
    if (combinedTotal > 0 && combinedTotal % 3 === 0) {
        const expectedCharges = Math.floor(combinedTotal / 3);
        if (expectedCharges > toppingCounter.chargesMade) {
            shouldCharge = true;
            chargeReason = 'every 3 total toppings/sauces';
        }
    }

    // Charge for every 2 extras
    if (combinedExtras > 0 && combinedExtras % 2 === 0) {
        const expectedExtraCharges = Math.floor(combinedExtras / 2);
        if (expectedExtraCharges > (toppingCounter.chargesMade - Math.floor(combinedTotal / 3))) {
            shouldCharge = true;
            chargeReason = 'every 2 extras (toppings/premium sauces)';
        }
    }

    if (shouldCharge) {
        currentSandwich.surcharges += SURCHARGE_AMOUNT;
        toppingCounter.chargesMade++;
    }

    updateSurchargeMessage();
}

function updateSurchargeMessage() {
    const message = document.getElementById('surcharge-message');
    if (currentSandwich.surcharges > 0) {
        message.innerHTML = `💰 Additional charges: $${currentSandwich.surcharges.toFixed(2)} 💸`;
    } else {
        message.innerHTML = 'No additional charges yet. (Charges apply for every 3 toppings or every 2 extras)';
    }
}

function backToBuildSandwich() {
    showScreen('build-sandwich');
}

function finishSandwich() {
    const sandwich = {
        size: currentSandwich.size,
        bread: currentSandwich.bread,
        toasted: currentSandwich.toasted,
        toppings: [...currentSandwich.toppings],
        surcharges: currentSandwich.surcharges,
        price: calculateSandwichPrice()
    };

    currentOrder.sandwiches.push(sandwich);
    updateOrderSummary();
    showScreen('order-menu');
}

function calculateSandwichPrice() {
    const basePrice = SANDWICH_PRICES[currentSandwich.size];
    const toppingsPrice = currentSandwich.toppings.reduce((sum, topping) => {
        if (topping.isPremium) {
            const premiumPrice = currentSandwich.size === '4' ? 1.00 :
                                currentSandwich.size === '8' ? 2.00 : 3.00;
            const extraPrice = topping.isExtra ? (currentSandwich.size === '4' ? 0.50 :
                                                  currentSandwich.size === '8' ? 1.00 : 1.50) : 0;
            return sum + premiumPrice + extraPrice;
        }
        return sum;
    }, 0);

    return basePrice + toppingsPrice + currentSandwich.surcharges;
}

// Signature sandwiches
function showSignatureSandwiches() {
    showScreen('signature-sandwiches');
}

function addSignatureSandwich(type) {
    let sandwich;

    switch(type) {
        case 'BLT':
            sandwich = {
                name: '🥓 BLT O Heck',
                size: '8',
                bread: 'WHITE',
                toasted: true,
                toppings: [
                    {name: '🥓 Bacon', isPremium: true},
                    {name: '🥬 Lettuce', isPremium: false},
                    {name: '🍅 Tomatoes', isPremium: false},
                    {name: '🥪 Mayo', isPremium: false}
                ],
                price: 10.50
            };
            break;
        case 'PHILLY':
            sandwich = {
                name: '🧀 Heck O Alot Of Philly Cheese Steak',
                size: '12',
                bread: 'ITALIAN',
                toasted: true,
                toppings: [
                    {name: '🥩 Steak', isPremium: true, isExtra: true},
                    {name: '🌶️ Peppers', isPremium: false},
                    {name: '🧅 Onions', isPremium: false},
                    {name: '🧀 Provolone', isPremium: true}
                ],
                price: 14.00
            };
            break;
        case 'ITALIAN':
            sandwich = {
                name: '🍅 Heckin Italian',
                size: '8',
                bread: 'ITALIAN',
                toasted: false,
                toppings: [
                    {name: '🥪 Salami', isPremium: true},
                    {name: '🍖 Ham', isPremium: true},
                    {name: '🧀 Provolone', isPremium: true},
                    {name: '🥬 Lettuce', isPremium: false},
                    {name: '🍅 Tomatoes', isPremium: false},
                    {name: '🥗 Vinaigrette', isPremium: false}
                ],
                price: 12.00
            };
            break;
        case 'CHICKEN':
            sandwich = {
                name: '🍗 The Cluckin Chicken',
                size: '8',
                bread: 'WHEAT',
                toasted: true,
                toppings: [
                    {name: '🍗 Chicken', isPremium: true},
                    {name: '🥬 Lettuce', isPremium: false},
                    {name: '🍅 Tomatoes', isPremium: false},
                    {name: '🥗 Ranch', isPremium: false}
                ],
                price: 10.00
            };
            break;
    }

    currentOrder.sandwiches.push(sandwich);
    updateOrderSummary();
    alert(`✅ Added ${sandwich.name} to your order!`);
    showScreen('order-menu');
}

// Drinks
let selectedDrinkSize = null;

function showAddDrink() {
    selectedDrinkSize = null;
    document.querySelectorAll('#add-drink .btn-option-kiosk').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('drink-flavor').value = '';
    showScreen('add-drink');
}

function selectDrinkSize(size) {
    selectedDrinkSize = size;
    document.querySelectorAll('#add-drink .btn-option-kiosk').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function addDrink() {
    const flavor = document.getElementById('drink-flavor').value.trim();

    if (!selectedDrinkSize) {
        alert('Please select a drink size! 🥤');
        return;
    }

    if (!flavor) {
        alert('Please enter a drink flavor! 🍹');
        return;
    }

    const drink = {
        size: selectedDrinkSize,
        flavor: flavor,
        price: DRINK_PRICES[selectedDrinkSize]
    };

    currentOrder.drinks.push(drink);
    updateOrderSummary();
    alert(`✅ Added ${selectedDrinkSize.toLowerCase()} ${flavor} to your order!`);
    showScreen('order-menu');
}

// Chips
function showAddChips() {
    document.getElementById('chips-flavor').value = '';
    showScreen('add-chips');
}

function addChips() {
    const flavor = document.getElementById('chips-flavor').value.trim();

    if (!flavor) {
        alert('Please enter a chips flavor! 🥔');
        return;
    }

    const chips = {
        flavor: flavor,
        price: CHIPS_PRICE
    };

    currentOrder.chips.push(chips);
    updateOrderSummary();
    alert(`✅ Added ${flavor} chips to your order!`);
    showScreen('order-menu');
}

// Order summary
function updateOrderSummary() {
    const itemsContainer = document.getElementById('order-items');
    const totalContainer = document.getElementById('order-total');

    if (currentOrder.sandwiches.length === 0 &&
        currentOrder.drinks.length === 0 &&
        currentOrder.chips.length === 0) {
        itemsContainer.innerHTML = '<p>No items yet. Start adding to your order!</p>';
        totalContainer.innerHTML = '';
        return;
    }

    let html = '';
    let total = 0;

    currentOrder.sandwiches.forEach((sandwich, index) => {
        const name = sandwich.name || `${sandwich.size}" ${sandwich.bread}${sandwich.toasted ? ' (Toasted)' : ''} Sandwich`;
        html += `<div class="order-item">🥪 ${name} - $${sandwich.price.toFixed(2)}</div>`;
        total += sandwich.price;
    });

    currentOrder.drinks.forEach((drink, index) => {
        html += `<div class="order-item">🍹 ${drink.size} ${drink.flavor} - $${drink.price.toFixed(2)}</div>`;
        total += drink.price;
    });

    currentOrder.chips.forEach((chips, index) => {
        html += `<div class="order-item">🥔 ${chips.flavor} Chips - $${chips.price.toFixed(2)}</div>`;
        total += chips.price;
    });

    itemsContainer.innerHTML = html;
    totalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
    currentOrder.total = total;
}

// Checkout
function showCheckout() {
    if (currentOrder.sandwiches.length === 0 &&
        currentOrder.drinks.length === 0 &&
        currentOrder.chips.length === 0) {
        alert('Your order is empty! Add some items first. 🥪');
        return;
    }

    generateReceipt();
    showScreen('checkout');
}

function generateReceipt() {
    const receiptContainer = document.getElementById('receipt');
    let html = '<div class="receipt-header">🫂 One Heck Of A Sandwich 🥵<br>RECEIPT</div>';

    html += '<div style="margin-bottom: 20px;">';
    html += `<div style="text-align: center; color: #a0a0a0; margin-bottom: 20px;">Order Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>`;

    currentOrder.sandwiches.forEach((sandwich, index) => {
        const name = sandwich.name || `${sandwich.size}" ${sandwich.bread}${sandwich.toasted ? ' (Toasted)' : ''} Sandwich`;
        html += `<div class="receipt-item">`;
        html += `<strong>🥪 ${name}</strong><br>`;
        if (sandwich.toppings && sandwich.toppings.length > 0) {
            html += `Toppings: ${sandwich.toppings.map(t => t.name + (t.isExtra ? ' (Extra)' : '')).join(', ')}<br>`;
        }
        if (sandwich.surcharges > 0) {
            html += `Additional Charges: $${sandwich.surcharges.toFixed(2)}<br>`;
        }
        html += `Price: $${sandwich.price.toFixed(2)}`;
        html += `</div>`;
    });

    currentOrder.drinks.forEach((drink, index) => {
        html += `<div class="receipt-item">`;
        html += `<strong>🍹 ${drink.size} ${drink.flavor}</strong><br>`;
        html += `Price: $${drink.price.toFixed(2)}`;
        html += `</div>`;
    });

    currentOrder.chips.forEach((chips, index) => {
        html += `<div class="receipt-item">`;
        html += `<strong>🥔 ${chips.flavor} Chips</strong><br>`;
        html += `Price: $${chips.price.toFixed(2)}`;
        html += `</div>`;
    });

    html += '</div>';
    html += `<div class="receipt-total">Total: $${currentOrder.total.toFixed(2)}</div>`;

    receiptContainer.innerHTML = html;
}

function confirmOrder() {
    const orderData = {
        timestamp: new Date().toISOString(),
        ...currentOrder
    };

    console.log('Order confirmed:', orderData);

    // Save to localStorage for demonstration
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    showScreen('thank-you');

    setTimeout(() => {
        currentOrder = {
            sandwiches: [],
            drinks: [],
            chips: [],
            total: 0
        };
    }, 1000);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    showScreen('main-menu');

    // Start clock
    updateClock();
    setInterval(updateClock, 1000);

    // Add click ripple effect to all buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn') || e.target.closest('.kiosk-card') || e.target.closest('.signature-card-kiosk')) {
            const element = e.target.closest('.btn') || e.target.closest('.kiosk-card') || e.target.closest('.signature-card-kiosk');
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
                element.style.transform = '';
            }, 100);
        }
    });
});
