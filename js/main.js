const bioGrid = document.getElementById('bioGrid');
const bioModal = document.getElementById('bioModal');
const bioDetails = document.getElementById('bioDetails');
const closeBtn = document.querySelector('.close');

// 初始化頁面
function initializePage() {
    displayBioCards();
    setupEventListeners();
}

// 設置事件監聽器
function setupEventListeners() {
    closeBtn.addEventListener('click', () => {
        bioModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === bioModal) {
            bioModal.style.display = 'none';
        }
    });
}

// 顯示生物卡片
function displayBioCards() {
    const plants = bioData.plants;
    bioGrid.innerHTML = '';
    
    plants.forEach(bio => {
        const card = createBioCard(bio);
        bioGrid.appendChild(card);
    });
}

// 創建生物卡片
function createBioCard(bio) {
    const card = document.createElement('div');
    card.className = 'bio-card';
    card.innerHTML = `
        <img src="${bio.image}" alt="${bio.name}">
        <div class="bio-card-content">
            <h3>${bio.name}</h3>
            <p>${bio.description.substring(0, 100)}...</p>
        </div>
    `;
    card.addEventListener('click', () => showBioDetails(bio.id));
    return card;
}

// 顯示生物詳情
function showBioDetails(id) {
    const bio = bioData.plants.find(bio => bio.id === id);
    if (!bio) return;
    
    let detailsHTML = `
        <h2>${bio.name}</h2>
        <div class="media-gallery">
            <div class="main-image">
                <img src="${bio.image}" alt="${bio.name}" style="max-width: 100%; height: auto;">
            </div>`;
    
    if (bio.images && bio.images.length > 0) {
        detailsHTML += `
            <div class="image-gallery">
                <h3>圖片庫</h3>
                <div class="gallery-grid">
                    ${bio.images.map(img => `
                        <div class="gallery-item">
                            <img src="${img}" alt="${bio.name}" onclick="updateMainImage(this.src)">
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }
    
    detailsHTML += `</div>
        <div class="bio-info">
            <h3>描述</h3>
            <p>${bio.description}</p>
            <h3>分布</h3>
            <p>${bio.distribution}</p>
            <h3>特徵</h3>
            <p>${bio.features}</p>`;
    
    if (bio.scientificName) {
        detailsHTML += `
            <h3>學名</h3>
            <p>${bio.scientificName}</p>`;
    }
    
    if (bio.classification) {
        detailsHTML += `
            <h3>分類</h3>
            <ul>
                <li>界：${bio.classification.kingdom}</li>
                <li>門：${bio.classification.phylum}</li>
                <li>綱：${bio.classification.class}</li>
                <li>目：${bio.classification.order}</li>
                <li>科：${bio.classification.family}</li>
                <li>屬：${bio.classification.genus}</li>
                <li>種：${bio.classification.species}</li>
            </ul>`;
    }
    
    if (bio.habitat) {
        detailsHTML += `
            <h3>棲息環境</h3>
            <p>${bio.habitat}</p>`;
    }
    
    detailsHTML += `</div>`;
    
    bioDetails.innerHTML = detailsHTML;
    bioModal.style.display = 'block';
}

// 更新主圖片
function updateMainImage(src) {
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = src;
    }
}

// 初始化頁面
initializePage();
