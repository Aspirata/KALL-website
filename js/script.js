document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const container = document.querySelector('.rig-container');
    const filtersContainer = document.querySelector('.filters-container'); // Контейнер с фильтрами
    let activeTags = new Set(); // Хранит активные теги
    let allRigs = []; // Кешируем риги

    const tagInfo = {
        "Популярный": { class: "tag tag-popular", desc: "Риг, который используется многими пользователями" },
        "Устаревший": { class: "tag tag-outdated", desc: "Риг работает некорректно на новых версиях Blender" },
        "Смешанный": { class: "tag tag-mixed", desc: "Риг со смешанным стилем" },
        "Mojang": { class: "tag tag-mojang", desc: "Риг в Simple (Mojang) Стиле" },
        "Реалистичный": { class: "tag tag-realistic", desc: "Риг в Realistic Стиле" },
        "Лёгкий для изменения модели": { class: "tag tag-easy-to-modify", desc: "Риг, у которого легко изменить модель" },
        "Минимальная функциональность": { class: "tag tag-minimal", desc: "Риг с минимальным количеством настроек" },
        "Достаточная функциональность": { class: "tag tag-sufficient", desc: "Риг с некоторым количеством настроек" },
        "Продвинутая функциональность": { class: "tag tag-advanced", desc: "Риг с большим количеством настроек" },
        "Максимальная функциональность": { class: "tag tag-maximum", desc: "Риг с огромным количеством настроек" },
    };

    async function fetchRigs() {
        try {
            const response = await fetch('rigs.json');
            allRigs = await response.json();
            populateFilters();
            renderRigs(allRigs);
        } catch (error) {
            console.error('Ошибка загрузки ригов:', error);
        }
    }

    function populateFilters() {
        const uniqueTags = new Set(allRigs.flatMap(rig => rig.tags));
        filtersContainer.innerHTML = '<h2 class="text-xl font-semibold text-white">Фильтры:</h2>';
    
        uniqueTags.forEach(tag => {
            const tagData = tagInfo[tag] || { class: "tag-default", desc: "Нет описания" };
    
            const button = document.createElement("button");
            button.className = `filter-tag ${tagData.class || "tag-default"} px-4 py-2 text-white rounded-lg hover:opacity-80 transition-all`;
            button.textContent = tag;
            button.dataset.filter = tag;
    
            // Добавляем всплывающее описание (tooltip)
            button.addEventListener("mouseenter", function () {
                const tooltip = document.createElement("div");
                tooltip.className = "tooltip absolute bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg";
                tooltip.textContent = tagData.desc;
                tooltip.style.top = `${this.offsetTop - 30}px`;
                tooltip.style.left = `${this.offsetLeft}px`;
                tooltip.style.position = "absolute";
                tooltip.dataset.tooltip = tag;
                document.body.appendChild(tooltip);
            });
    
            button.addEventListener("mouseleave", function () {
                document.querySelector(`[data-tooltip="${tag}"]`)?.remove();
            });
    
            button.addEventListener("click", function () {
                this.classList.toggle("active-filter");
                updateActiveTags();
            });
    
            filtersContainer.appendChild(button);
        });
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
        
            const creators = rig.creator.map(c => `<a href="${c.link}" target="_blank">${c.name}</a>`).join(", ");
            const creatorsLabel = rig.creator.length > 1 ? "Создатели" : "Создатель";
        
            const rigCard = document.createElement('div');
            rigCard.className = `rig-card ${rig.tags.includes("Популярный") ? 'popular' : ''}`;
            rigCard.innerHTML = `
                ${rig.tags.includes("Популярный") ? '<div class="popular-label">Популярный</div>' : ''}
                <div class="rig-image-wrapper">
                    <a ${rig.details ? `href="${rig.details}" target="_blank"` : 'style="pointer-events: none"'}>
                        <img class="rig-image" alt="${rig.name}" src="/images/placeholder_preview.webp" loading="lazy">
                    </a>
                </div>
                <div class="p-4">
                    <h3>${rig.name}</h3>
                    <div class="info-tags">
                        <p class="creator-info">${creatorsLabel}: ${creators}</p>
                        <p class="description-info">Описание: ${rig.description}</p>
                    </div>
                    <div class="tags">
                        ${rig.tags.map(tag => {
                            const info = tagInfo[tag] || { class: "tag", desc: "" };
                            return `<span class="${info.class}" title="${info.desc}">${tag}</span>`;
                        }).join('')}
                    </div>
                    <a href="${rig.download}" class="btn download w-full block text-center">Скачать</a>
                </div>
            `;
        
            const imgElement = rigCard.querySelector('.rig-image');
            const tempImg = new Image();
            tempImg.src = previewPath;
            tempImg.onload = () => imgElement.src = previewPath;
        
            container.appendChild(rigCard);
        }
    }

    function filterRigs() {
        const query = searchInput.value.toLowerCase().trim();

        let filteredRigs = allRigs;

        // Фильтрация только по названию рига
        if (query) {
            filteredRigs = filteredRigs.filter(rig => rig.name.toLowerCase().includes(query));
        }

        // Фильтрация по активным тегам (если есть)
        if (activeTags.size > 0) {
            filteredRigs = filteredRigs.filter(rig =>
                [...activeTags].every(tag => rig.tags.includes(tag))
            );
        }

        if (filteredRigs.length === 0) {
            container.innerHTML = '<div class="no-results">По вашему запросу ничего не найдено</div>';
        } else {
            renderRigs(filteredRigs);
        }
    }

    searchInput.addEventListener('input', filterRigs);

    filtersContainer.addEventListener('click', (event) => {
        const tag = event.target.closest('.filter-tag');
        if (!tag) return;

        const tagText = tag.textContent.trim();
        if (activeTags.has(tagText)) {
            activeTags.delete(tagText);
            tag.classList.remove('active-filter');
        } else {
            activeTags.add(tagText);
            tag.classList.add('active-filter');
        }

        filterRigs();
    });

    fetchRigs();
});
