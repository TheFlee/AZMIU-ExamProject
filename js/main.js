// Game Database
const gameDatabase = [
    // FPS Games
    { name: 'Valorant', category: 'fps', price: 19.99, image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Taktiki FPS oyunu, komanda əsaslı və rəqabətli döyüşlər.' },
    { name: 'Apex Legends', category: 'fps', price: 0.00, image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Pulsuz battle royale, sürətli və dinamik oyun mexanikası.' },
    { name: 'Call of Duty: Modern Warfare II', category: 'fps', price: 59.99, image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Müharibənin yeni üzü. İnanılmaz qrafika və realistik döyüş təcrübəsi.' },
    
    // RPG Games
    { name: 'The Witcher 3', category: 'rpg', price: 29.99, image: 'https://images.pexels.com/photos/3751739/pexels-photo-3751739.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Epik açıq dünya RPG, Geralt ilə macəra və canavar ovları.' },
    { name: 'Skyrim', category: 'rpg', price: 24.99, image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Əfsanəvi fantaziya dünyasında sərbəst kəşfiyyat və döyüşlər.' },
    { name: 'Elden Ring', category: 'rpg', price: 49.99, image: 'https://images.pexels.com/photos/3751739/pexels-photo-3751739.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Açıq dünya RPG macərası. Sərhədsiz kəşfiyyat və epik döyüşlər.' },
    { name: 'Cyberpunk 2077', category: 'rpg', price: 39.99, image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Gələcəyin şəhərində açıq dünya və kiberpunk atmosferi.' },
    
    // Adventure Games
    { name: 'The Legend of Zelda', category: 'adventure', price: 44.99, image: 'https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Macəra və tapmaca dolu klassik oyun seriyası.' },
    { name: 'Uncharted 4', category: 'adventure', price: 34.99, image: 'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Kino tərzində macəra, xəzinə axtarışı və aksiyon səhnələri.' },
    
    // Sport Games
    { name: 'FIFA 24', category: 'sport', price: 59.99, image: 'https://images.pexels.com/photos/262506/pexels-photo-262506.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Ən son futbol simulyatoru, real komandalar və turnirlər.' },
    { name: 'NBA 2K24', category: 'sport', price: 49.99, image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop', description: 'Peşəkar basketbol təcrübəsi, yeni nəsil qrafika və oyun rejimləri.' }
];

// Basket
let basket = JSON.parse(localStorage.getItem('gameBasket')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateBasketCount();
    updateBasketDisplay();
});

function addToBasket(gameName, gameImage) {
    const existingGame = basket.find(game => game.name === gameName);
    
    if (existingGame) {
        showNotification('Bu oyun artıq səbətdədir!', 'warning');
        return;
    }
    
    const gameData = gameDatabase.find(game => game.name === gameName);
    const category = gameData ? gameData.category : 'unknown';
    const price = gameData ? gameData.price : 0;
    
    basket.push({
        name: gameName,
        image: gameImage,
        category: category,
        price: price,
        id: Date.now()
    });
    
    localStorage.setItem('gameBasket', JSON.stringify(basket));
    
    updateBasketCount();
    updateBasketDisplay();
    
    showNotification(`${gameName} səbətə əlavə edildi!`, 'success');
}

function removeFromBasket(gameId) {
    basket = basket.filter(game => game.id !== gameId);
    localStorage.setItem('gameBasket', JSON.stringify(basket));
    updateBasketCount();
    updateBasketDisplay();
    showNotification('Oyun səbətdən silindi!', 'info');
}

function clearBasket() {
    if (basket.length === 0) {
        showNotification('Səbət artıq boşdur!', 'info');
        return;
    }
    
    basket = [];
    localStorage.setItem('gameBasket', JSON.stringify(basket));
    updateBasketCount();
    updateBasketDisplay();
    showNotification('Səbət təmizləndi!', 'success');
}

function updateBasketCount() {
    const basketCount = document.getElementById('basketCount');
    if (basketCount) {
        basketCount.textContent = basket.length;
        basketCount.style.display = basket.length > 0 ? 'flex' : 'none';
    }
}

function updateBasketDisplay() {
    const basketItems = document.getElementById('basketItems');
    if (!basketItems) return;
    if (basket.length === 0) {
        basketItems.innerHTML = '<p class="empty-basket">Səbət boşdur</p>';
        return;
    }
    basketItems.innerHTML = basket.map(game => `
        <div class="basket-item">
            <img src="${game.image}" alt="${game.name}" class="basket-item-image">
            <div class="basket-item-info">
                <div class="basket-item-name">${game.name}</div>
                <div class="basket-item-category">${getCategoryName(game.category)}</div>
                <div class="basket-item-price">${game.price.toFixed(2)} AZN</div>
            </div>
            <button class="remove-item" onclick="removeFromBasket(${game.id})">Sil</button>
        </div>
    `).join('');
    // Update total price in basket footer if exists
    const basketFooter = document.querySelector('.basket-footer');
    if (basketFooter) {
        const total = basket.reduce((sum, game) => sum + (game.price || 0), 0);
        // Only one buy button and one clear button
        basketFooter.innerHTML = `
            <div class="basket-total">Cəmi: <b>${total.toFixed(2)} AZN</b></div>
            <button class="btn btn-success" onclick="buyBasket()">Al</button>
            <button class="btn btn-primary" onclick="clearBasket()">Səbəti Təmizlə</button>
        `;
    }
}

function buyBasket() {
    if (basket.length === 0) {
        showNotification('Səbət boşdur!', 'info');
        return;
    }
    showNotification('Sifarişiniz qəbul edildi! Təşəkkür edirik.', 'success');
    clearBasket();
}

function getCategoryName(category) {
    const categoryNames = {
        'fps': 'FPS',
        'rpg': 'RPG',
        'adventure': 'Macəra',
        'sport': 'İdman',
        'unknown': 'Digər'
    };
    return categoryNames[category] || 'Digər';
}

function toggleBasket() {
    const basketDropdown = document.getElementById('basketDropdown');
    if (basketDropdown) {
        basketDropdown.classList.toggle('active');
    }
}

document.addEventListener('click', function(event) {
    const basketContainer = document.querySelector('.basket-container');
    const basketDropdown = document.getElementById('basketDropdown');
    
    if (basketContainer && basketDropdown && !basketContainer.contains(event.target)) {
        basketDropdown.classList.remove('active');
    }
});

// Search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        showNotification('Axtarış üçün oyun adı daxil edin!', 'warning');
        return;
    }
    
    const searchResults = gameDatabase.filter(game => 
        game.name.toLowerCase().includes(searchTerm) ||
        game.category.toLowerCase().includes(searchTerm)
    );
    
    displaySearchResults(searchResults, searchTerm);
}

function displaySearchResults(results, searchTerm) {
    const searchResults = document.getElementById('searchResults');
    const searchGamesGrid = document.getElementById('searchGamesGrid');
    if (!searchResults || !searchGamesGrid) return;
    searchResults.style.display = 'block';
    if (results.length === 0) {
        searchGamesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3 style="color: var(--text-secondary); margin-bottom: 1rem;">
                    "${searchTerm}" üçün nəticə tapılmadı
                </h3>
                <p style="color: var(--text-secondary);">
                    Başqa açar sözlər ilə axtarış edin
                </p>
            </div>
        `;
        return;
    }
    
    searchGamesGrid.innerHTML = results.map(game => `
        <div class="game-card" data-game-name="${game.name}" data-category="${game.category}">
            <div class="game-image">
                <img src="${game.image}" alt="${game.name}">
            </div>
            <div class="game-content">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-description">${game.description || ''}</p>
                <div class="game-price">${game.price ? game.price.toFixed(2) : '0.00'} AZN</div>
                <button class="btn btn-primary btn-full add-to-basket" onclick="addToBasket('${game.name.replace(/'/g, "\'")}', '${game.image}')">Səbətə əlavə et</button>
            </div>
        </div>
    `).join('');
}

function closeSearch() {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchInput');
    
    if (searchResults) {
        searchResults.style.display = 'none';
    }
    
    if (searchInput) {
        searchInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSearch();
    }
});

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6'
    };
    return colors[type] || colors.info;
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);