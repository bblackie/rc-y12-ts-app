document.addEventListener("DOMContentLoaded", function () {
    const missionsList = document.getElementById("missions-list");
    const astronautsList = document.getElementById("astronauts-list");
    const spacecraftList = document.getElementById("spacecraft-list");
    const searchInput = document.getElementById("global-search");

    let allData = {
        missions: [],
        astronauts: [],
        spacecraft: []
    };

    function fetchAndDisplay(url, listElement, type) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                allData[type] = data;
                displayItems(data, listElement, type);
            });
    }

    function displayItems(items, listElement, type) {
        listElement.innerHTML = "";
        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <a href="mission.html?id=${item[type === 'missions' ? 'Mission_ID' : type === 'astronauts' ? 'Astronaut_ID' : 'Spacecraft_ID']}">
                    <img src="${item[`${type === 'missions' ? 'Mission_Img' : type === 'astronauts' ? 'Astronaut_Img' : 'Spacecraft_Img'}`]}" 
                         alt="${item.Name || item.Mission_Name || item.Spacecraft_Name}">
                    <h3>${item.Name || item.Mission_Name || item.Spacecraft_Name}</h3>
                </a>
            `;
            listElement.appendChild(card);
        });
    }

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredMissions = allData.missions.filter(mission => mission.Mission_Name.toLowerCase().includes(searchTerm));
        const filteredAstronauts = allData.astronauts.filter(astro => astro.Name.toLowerCase().includes(searchTerm));
        const filteredSpacecraft = allData.spacecraft.filter(sc => sc.Spacecraft_Name.toLowerCase().includes(searchTerm));

        displayItems(filteredMissions, missionsList, "missions");
        displayItems(filteredAstronauts, astronautsList, "astronauts");
        displayItems(filteredSpacecraft, spacecraftList, "spacecraft");
    });

    fetchAndDisplay("/api/missions", missionsList, "missions");
    fetchAndDisplay("/api/astronauts", astronautsList, "astronauts");
    fetchAndDisplay("/api/spacecraft", spacecraftList, "spacecraft");
});
