document.addEventListener('DOMContentLoaded', () => {
    const rigs = [
        { name: "SRE", description: "Риг, в котором есть множество функций и настроек, однако из-за этого в нём достаточно багов", creator: "Aspirata", tags: ["Simple", "Популярный"], 
            image: "rigs/SRE/preview.png", download: "https://aspirata.gumroad.com/l/SRE", details: "rigs/SRE/details.html" },
            
        { name: "Bubble Rig", description: "Абоба", tags: ["Simple"], 
            image: "rigs/Bubble Rig/preview.png", download: "https://discord.com/invite/FgHEWpCkzB", details: "https://bubblerig.net/" },
    
        { name: "Zipi Rig", description: "Абоба", tags: ["Realistic"], 
            image: "rigs/Zipi Rig/preview.png", download: "rigs/Zipi Rig/ZipiRig.zip", details: "rigs/Zipi Rig/details.html" },
    
        { name: "Ice Cube", description: "Абоба", tags: ["Realistic", "Популярный"], 
            image: "rigs/Ice Cube/preview.png", download: "https://github.com/DarthLilo/ice_cube/releases/latest", details: "https://ice-cube-rig.carrd.co/" },
    
        { name: "MCS Rig", description: "Абоба", tags: ["Realistic"], 
            image: "rigs/MCS Rig/preview.png", download: "https://endertainer007.gumroad.com/l/EndRig_MCS2?layout=profile", details: "rigs/MCS Rig/details.html" },
    
        { name: "Simple Rig", description: "Абоба", tags: ["Simple", "Популярный", "Устаревший"], 
            image: "rigs/Simple Rig/preview.png", download: "https://digitaldananimations.gumroad.com/l/fjvmt", details: "rigs/Simple Rig/details.html" },
    ];    

    const searchInput = document.getElementById('searchInput');
    const container = document.querySelector('.rig-container');

    function renderRigs(filteredRigs) {
        const sortedRigs = [...filteredRigs].sort((a, b) => 
            (b.tags.includes("Популярный") ? 1 : 0) - (a.tags.includes("Популярный") ? 1 : 0)
        );
    
        container.innerHTML = sortedRigs.map(rig => `
            <div class="rig-card hover:scale-105 transition-all ${rig.tags.includes("Популярный") ? 'popular' : ''}" style="position: relative;">
                <a href="${rig.details}">
                    ${rig.tags.includes("Популярный") ? '<div class="popular-label">Популярен</div>' : ''}
                    <div class="rig-image-wrapper">
                        <img src="${rig.image}" alt="${rig.name}" class="rig-image">
                    </div>
                    <div class="p-4">
                        <h3>${rig.name}</h3>
                        <p class="rig-creator">Создатель(и): ${rig.creator}</p>
                        <p class="rig-description">Описание: ${rig.description}</p>
                        </a>
                        <div class="tags">
                            ${rig.tags.map(tag => {
                                const tagClass = tag === "Устаревший" ? "tag tag-outdated" : "tag";
                                return `<span class="${tagClass}" data-description="${getTagDescription(tag)}">${tag}</span>`;
                            }).join('')}
                        </div>
                        <a href="${rig.download}" class="btn download w-full block mt-4 text-center">Скачать</a>
                    </div>
            </div>
        `).join('');            
    }

    // Функция для получения описания тега
    function getTagDescription(tag) {
        switch(tag) {
            case "Simple":
                return "Легкий риг с базовыми функциями";
            case "Realistic":
                return "Риг с более сложной и детализированной анимацией";
            case "Популярный":
                return "Риг, который используется многими пользователями";
            case "Устаревший":
                return "Риг, который больше не обновляется или имеет баги";
            default:
                return "";
        }
    }

    function searchRigs() {
        const query = searchInput.value.toLowerCase();
        const filtered = rigs.filter(rig => rig.name.toLowerCase().includes(query) || rig.tags.some(tag => tag.toLowerCase().includes(query)));
        renderRigs(filtered);
    }

    searchInput.addEventListener('input', searchRigs);
    renderRigs(rigs);

    // Обработчик клика по тегам
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            event.target.classList.toggle('tag-expanded');
        }
    });
});
