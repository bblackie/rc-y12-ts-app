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

    function fetchAndDisplay(url, type) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                allData[type] = data;
                displayItems(data, type);
            })
            .catch(error => console.error(`Error fetching ${type}:`, error));
    }

    function displayItems(items, type) {
        let listElement;
        if (type === "missions") listElement = missionsList;
        else if (type === "astronauts") listElement = astronautsList;
        else if (type === "spacecraft") listElement = spacecraftList;

        listElement.innerHTML = "";

        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            let itemId, itemName, itemImage, detailsPage;
            if (type === "missions") {
                itemId = item.Mission_ID;
                itemName = item.Mission_Name;
                itemImage = item.Mission_Img;
                detailsPage = "missions.html";
            } else if (type === "astronauts") {
                itemId = item.Astronaut_ID;
                itemName = item.Name;
                itemImage = item.Astronaut_Img;
                detailsPage = "astronaut.html";
            } else if (type === "spacecraft") {
                itemId = item.Spacecraft_ID;
                itemName = item.Spacecraft_Name;
                itemImage = item.Spacecraft_Img;
                detailsPage = "spacecraft.html";
            }

            card.innerHTML = `
                <a href="${detailsPage}?id=${itemId}">
                    <img src="${itemImage}" alt="${itemName}" class="thumbnail">
                    <p>${itemName}</p>
                </a>
            `;
            listElement.appendChild(card);
        });
    }

    function handleSearch(query) {
        const searchTerm = query.toLowerCase();

        const filteredMissions = allData.missions.filter(mission =>
            mission.Mission_Name.toLowerCase().includes(searchTerm)
        );
        const filteredAstronauts = allData.astronauts.filter(astro =>
            astro.Name.toLowerCase().includes(searchTerm)
        );
        const filteredSpacecraft = allData.spacecraft.filter(sc =>
            sc.Spacecraft_Name.toLowerCase().includes(searchTerm)
        );

        displayItems(filteredMissions, "missions");
        displayItems(filteredAstronauts, "astronauts");
        displayItems(filteredSpacecraft, "spacecraft");
    }

    searchInput.addEventListener("input", function () {
        handleSearch(searchInput.value);
    });

    fetchAndDisplay("/api/missions", "missions");
    fetchAndDisplay("/api/astronauts", "astronauts");
    fetchAndDisplay("/api/spacecraft", "spacecraft");
});