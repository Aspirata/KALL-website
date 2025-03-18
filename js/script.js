document.addEventListener('DOMContentLoaded', () => {
    const rigs = [
        {
            name: "SRE",
            description: "Риг, в котором есть множество функций и настроек, однако из-за этого в нём достаточно багов",
            tags: ["Simple"],
            image: "rigs/SRE/preview.png",
            download: "https://aspirata.gumroad.com/l/SRE",
            details: "rigs/SRE/details.html"
        },

        {
            name: "Bubble Rig",
            description: "Абоба",
            tags: ["Simple"],
            image: "rigs/Bubble Rig/preview.png",
            download: "https://discord.com/invite/FgHEWpCkzB",
            details: "https://bubblerig.net/"
        },

        {
            name: "Zipi Rig",
            description: "Абоба",
            tags: ["Realistic"],
            image: "rigs/Zipi Rig/preview.png",
            download: "rigs/Zipi Rig/ZipiRig.zip",
            details: "rigs/Zipi Rig/details.html"
        },

        {
            name: "Ice Cube",
            description: "Абоба",
            tags: ["Realistic"],
            image: "rigs/Ice Cube/preview.png",
            download: "https://github.com/DarthLilo/ice_cube/releases/latest",
            details: "https://ice-cube-rig.carrd.co/"
        },

        {
            name: "MCS Rig",
            description: "Абоба",
            tags: ["Realistic"],
            image: "rigs/MCS Rig/preview.png",
            download: "https://endertainer007.gumroad.com/l/EndRig_MCS2?layout=profile",
            details: "rigs/MCS Rig/details.html"
        },

    ];

    const searchInput = document.getElementById('searchInput');
    const container = document.querySelector('main .grid');

    function renderRigs(filteredRigs) {
        const container = document.querySelector('.rig-container');
        container.innerHTML = '';
    
        filteredRigs.forEach(rig => {
            const card = `
                <div class="rig-card bg-gray-800 rounded-2xl overflow-hidden shadow-2xl mb-8 transition-all duration-300 hover:scale-105">
                    <img src="${rig.image}" alt="${rig.name}" class="w-full h-64 object-cover rounded-t-2xl">
                    <div class="p-6">
                        <h3 class="text-white text-2xl font-bold mb-4">${rig.name}</h3>
                        <p class="text-gray-400 text-sm mb-6">${rig.description}</p>
                        <div class="flex justify-between mb-4">
                            <a href="${rig.details}" class="btn btn-detail bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-1/2 transition-all">Подробнее</a>
                            <a href="${rig.download}" class="btn btn-download bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-1/2 transition-all">Скачать</a>
                        </div>
                        <div class="flex space-x-2">
                            ${rig.tags.map(tag => `<span class="tag bg-gray-600 text-white px-3 py-1 rounded-full text-xs">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }

    function searchRigs() {
        const query = searchInput.value.toLowerCase();
        const filtered = rigs.filter(rig => {
            const nameMatch = rig.name.toLowerCase().includes(query);
            const tagsMatch = rig.tags.some(tag => tag.toLowerCase().includes(query));
            return nameMatch || tagsMatch;
        });
        renderRigs(filtered);
    }

    searchInput.addEventListener('input', searchRigs);
    renderRigs(rigs);
});