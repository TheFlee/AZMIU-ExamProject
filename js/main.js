// Game Database
const gameDatabase = [
    // FPS Games
    { name: 'Valorant', category: 'fps', image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    { name: 'Apex Legends', category: 'fps', image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    { name: 'Call of Duty: Modern Warfare II', category: 'fps', image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    
    // RPG Games
    { name: 'The Witcher 3', category: 'rpg', image: 'https://images.pexels.com/photos/3751739/pexels-photo-3751739.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    { name: 'Skyrim', category: 'rpg', image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    { name: 'Elden Ring', category: 'rpg', image: 'https://images.pexels.com/photos/3751739/pexels-photo-3751739.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    { name: 'Cyberpunk 2077', category: 'rpg', image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    
    // Adventure Games
    { name: 'The Legend of Zelda', category: 'adventure', image: 'https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    { name: 'Uncharted 4', category: 'adventure', image: 'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    
    // Sport Games
    { name: 'FIFA 24', category: 'sport', image: 'https://images.pexels.com/photos/262506/pexels-photo-262506.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    { name: 'NBA 2K24', category: 'sport', image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' }
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
    
    basket.push({
        name: gameName,
        image: gameImage,
        category: category,
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
            </div>
            <button class="remove-item" onclick="removeFromBasket(${game.id})">Sil</button>
        </div>
    `).join('');
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
                <div class="game-overlay"></div>
            </div>
            <div class="game-content">
                <h3 class="game-title">${game.name}</h3>
                <div class="game-rating">
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                </div>
                <button class="btn btn-primary add-to-basket" onclick="addToBasket('${game.name}', '${game.image}')">
                    Əlavə et
                </button>
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