document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const container = document.querySelector('.rig-container');

    let activeTag = null; // Хранит текущий активный тег

    const tagInfo = {
        "Популярный": { class: "tag tag-popular", desc: "Риг, который используется многими пользователями" },
        "Устаревший": { class: "tag tag-outdated", desc: "Риг работает некорректно на новых версиях Blender" },
        "Mixed": { class: "tag tag-mixed", desc: "Риг со смешанным стилем" },
        "Simple": { class: "tag tag-simple", desc: "Риг в Simple (Mojang) Стиле" },
        "Realistic": { class: "tag tag-realistic", desc: "Риг в Realistic Стиле" },
    };

    function fetchRigs() {
        fetch('rigs.json')
            .then(response => response.json())
            .then(renderRigs)
            .catch(error => console.error('Ошибка загрузки ригов:', error));
    }

    function renderRigs(rigs) {
        container.innerHTML = '';

        const sortedRigs = rigs.sort((a, b) => {
            const popA = a.tags.includes("Популярный") ? -1 : 0;
            const popB = b.tags.includes("Популярный") ? -1 : 0;
            const oldA = a.tags.includes("Устаревший") ? 1 : 0;
            const oldB = b.tags.includes("Устаревший") ? 1 : 0;
        
            return popA - popB || oldA - oldB || a.name.localeCompare(b.name);
        });        

        for (const rig of sortedRigs) {
            const folder = `rigs/${rig.name}`;
            const previewPath = `${folder}/preview.webp`;
            const detailsLink = rig.details ? `<a href="${rig.details}" class="read-more">Подробнее...</a>` : "";

            // Проверка количества создателей
            const creators = rig.creator.map(c => `<a href="${c.link}" target="_blank">${c.name}</a>`).join(", ");
            const creatorsLabel = rig.creator.length > 1 ? "Создатели" : "Создатель";

            const rigCard = document.createElement('div');
            rigCard.className = `rig-card ${rig.tags.includes("Популярный") ? 'popular' : ''}`;
            rigCard.innerHTML = `
                ${rig.tags.includes("Популярный") ? '<div class="popular-label">Популярный</div>' : ''}
                <div class="rig-image-wrapper">
                    <img class="rig-image" alt="${rig.name}" src="placeholder_preview.webp" loading="lazy">
                </div>
                <div class="p-4">
                    <h3>${rig.name}</h3>
                    <div class="info-tags">
                        <p class="creator-info">${creatorsLabel}: ${creators}</p>
                        <p class="description-info">
                            Описание: ${rig.description} ${detailsLink}
                        </p>
                    </div>
                    <div class="tags">
                        ${rig.tags.map(tag => {
                            const info = tagInfo[tag] || { class: "tag", desc: "" };
                            return `<span class="${info.class}" data-description="${info.desc}">${tag}</span>`;
                        }).join('')}
                    </div>
                    <a href="${rig.download}" class="btn download w-full block text-center">Скачать</a>
                </div>
            `;

            // Загружаем картинку только если она есть
            const imgElement = rigCard.querySelector('.rig-image');
            const tempImg = new Image();
            tempImg.src = previewPath;
            tempImg.onload = () => imgElement.src = previewPath;

            container.appendChild(rigCard);
        }
    }

    function searchRigs() {
        const query = searchInput.value.toLowerCase();
        fetch('/rigs.json')
            .then(response => response.json())
            .then(rigs => renderRigs(rigs.filter(rig => 
                rig.name.toLowerCase().includes(query) || 
                rig.tags.some(tag => tag.toLowerCase().includes(query))
            )));
    }

    // Обработчик кликов по тегам
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {
            const tagElement = e.target;
            const description = tagElement.dataset.description;

            // Если кликнули по активному тегу, скрываем описание
            if (activeTag === tagElement) {
                tagElement.nextElementSibling?.remove();
                activeTag = null;
                return;
            }

            // Удаляем предыдущее описание, если оно было
            document.querySelector('.tag-description')?.remove();

            // Создаем элемент для описания
            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'tag-description';
            descriptionElement.textContent = description;

            // Вставляем после тега
            tagElement.insertAdjacentElement('afterend', descriptionElement);
            activeTag = tagElement;
        }
    });

    searchInput.addEventListener('input', searchRigs);

    fetchRigs();
});