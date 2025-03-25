document.addEventListener('DOMContentLoaded', () => {
    const rigs = [
        { 
            name: "SRE", 
            description: "Риг с множеством функций, но с багами", 
            creator: [{ name: "Aspirata", link: "https://aspirata.carrd.co/" }],
            tags: ["Популярный", "Устаревший", "Mixed"], 
            download: "https://aspirata.gumroad.com/l/SRE"
        },
        { 
            name: "Bubble Rig", 
            description: "Абоба", 
            creator: [{ name: "Alumio", link: "https://alumio.net/" }],
            tags: ["Simple"], 
            download: "https://discord.com/invite/FgHEWpCkzB",
            details: "https://bubblerig.net/"
        },
        { 
            name: "Zipi Rig", 
            description: "Абоба", 
            creator: [{ name: "Zipi", link: "" }],
            tags: ["Realistic"], 
            download: "rigs/Zipi Rig/ZipiRig.zip"
        },
        { 
            name: "Ice Cube", 
            description: "Абоба", 
            creator: [{ name: "DarthLilo", link: "https://darthlilo.carrd.co/" }],
            tags: ["Популярный", "Realistic"], 
            download: "https://github.com/DarthLilo/ice_cube/releases/latest"
        },
        { 
            name: "MCS Rig", 
            description: "Абоба", 
            creator: [{ name: "Endertainer007", link: "http://endertainer007.carrd.co/" }],
            tags: ["Realistic"], 
            download: "https://endertainer007.gumroad.com/l/EndRig_MCS2?layout=profile"
        },
        { 
            name: "Simple Rig", 
            description: "Абоба", 
            creator: [{ name: "Digital Dan Animations", link: "https://digitaldananimations.gumroad.com" }],
            tags: ["Популярный", "Simple"], 
            download: "https://digitaldananimations.gumroad.com/l/fjvmt"
        },
        { 
            name: "TheRig", 
            description: "Простой, но функциональный риг.", 
            creator: [{ name: "TheRatmir", link: "" }],
            tags: ["Mixed"], 
            download: "https://theratmir.gumroad.com/l/TheRig"
        },
        {
            name: "Promo Rig",
            description: "Абоба",
            creator: [{ name: "Azagwen", link: "https://azagwen.art/" }],
            tags: ["Simple"],
            download: "https://azagwen.gumroad.com/l/skEOo?layout=profile&recommended_by=library"
        },
        {
            name: "Endertainer Rig Remastered",
            description: "Абоба",
            creator: [{ name: "Endertainer007", link: "http://endertainer007.carrd.co/" }],
            tags: ["Устаревший", "Mixed"],
            details: "https://youtu.be/SgMcWIkkPSk?si=6tlIyscsXJmnqFd4",
            download: "https://archive.org/details/EndRig_R1_R1_RM"
        },
        {
            name: "Thomas Rig Legacy",
            description: "Абоба",
            creator: [{ name: "BlueEvil", link: "https://youtube.com/@blueevilgfx" }, { name: "Thomas", link: "https://www.youtube.com/@ThomasAnimations" }],
            tags: ["Realistic"],
            download: "https://extensions.blender.org/add-ons/thomas-rig-legacy/"
        },
        {
            name: "Thomas Rig",
            description: "Абоба",
            creator: [{ name: "Thomas", link: "https://www.youtube.com/@ThomasAnimations" }],
            tags: ["Realistic"],
            download: "https://youtu.be/2yn5I9B0Im4?si=MvQyVqh3P7tJtiwy"
        },
        {
            name: "ZAMination Rig",
            description: "Абоба",
            creator: [{ name: "ZAM", link: "https://www.youtube.com/@ThomasAnimations" }],
            tags: ["Realistic"],
            download: "https://youtu.be/kCCyZ53HubE?si=IIoaQZUAmJowbQ6I"
        },
        {
            name: "Wasabi Rig",
            description: "Абоба",
            creator: [{ name: "Gumbo", link: "" }],
            tags: ["Realistic"],
            download: "https://youtu.be/PbjNaT1EVXQ?si=bUiKhVCeaFYQt6Zz"
        },

    ];

    const tagClasses = {
        "Популярный": "tag tag-popular",
        "Устаревший": "tag tag-outdated",
        "Simple": "tag tag-simple",
        "Realistic": "tag tag-realistic"
    };

    const searchInput = document.getElementById('searchInput');
    const container = document.querySelector('.rig-container');

    function renderRigs(filteredRigs) {
        container.innerHTML = '';

        const sortedRigs = [...filteredRigs].sort((a, b) => 
            (b.tags.includes("Популярный") ? 1 : 0) - (a.tags.includes("Популярный") ? 1 : 0)
        );

        for (const rig of sortedRigs) {
            const rigFolder = `rigs/${rig.name}`;
            const previewPath = `${rigFolder}/preview.png`;
            const detailsPath = rig.details || `${rigFolder}/details.html`;

            const creatorHTML = rig.creator.map(c => `<a href="${c.link}" target="_blank">${c.name}</a>`).join(", ");

            const rigCard = document.createElement('div');
            rigCard.className = `rig-card hover:scale-105 transition-all ${rig.tags.includes("Популярный") ? 'popular' : ''}`;
            rigCard.dataset.folder = rigFolder;

            rigCard.innerHTML = `
                ${rig.tags.includes("Популярный") ? '<div class="popular-label">Популярен</div>' : ''}
                <div class="rig-image-wrapper">
                    <img src="placeholder_preview.png" data-src="${previewPath}" alt="${rig.name}" class="rig-image lazy">
                </div>
                <div class="p-4">
                    <h3>${rig.name}</h3>
                    <div class="info-tags">
                        <p class="creator-info">Создатель: ${creatorHTML}</p>
                        <p class="description-info">
                            Описание: ${rig.description} 
                            <a href="${detailsPath}" class="read-more">Читать далее...</a>
                        </p>
                    </div>
                    <div class="tags">
                        ${rig.tags.map(tag => `<span class="${getTagClass(tag)}" data-description="${getTagDescription(tag)}">${tag}</span>`).join('')}
                    </div>
                    <a href="${rig.download}" class="btn download w-full block text-center">Скачать</a>
                </div>
            `;

            container.appendChild(rigCard);
        }

        // Отложенная загрузка изображений
        document.querySelectorAll('.lazy').forEach(img => {
            const tempImg = new Image();
            tempImg.src = img.dataset.src;
            tempImg.onload = () => { img.src = img.dataset.src; };
        });
    }

    function getTagClass(tag) {
        return tagClasses[tag] || "tag";
    }

    function getTagDescription(tag) {
        const descriptions = {
            "Simple": "Легкий риг с базовыми функциями",
            "Realistic": "Риг с детализированной анимацией",
            "Популярный": "Риг, который используется многими",
            "Устаревший": "Риг больше не обновляется"
        };
        return descriptions[tag] || "";
    }

    function searchRigs() {
        const query = searchInput.value.toLowerCase();
        const filtered = rigs.filter(rig => 
            rig.name.toLowerCase().includes(query) || rig.tags.some(tag => tag.toLowerCase().includes(query))
        );
        renderRigs(filtered);
    }

    searchInput.addEventListener('input', searchRigs);
    renderRigs(rigs);

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            event.target.classList.toggle('tag-expanded');
        }
    });
});