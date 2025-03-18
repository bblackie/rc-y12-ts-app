document.addEventListener("DOMContentLoaded", function () {
    const missionsList = document.getElementById("missions-list");
    const astronautsList = document.getElementById("astronauts-list");
    const spacecraftList = document.getElementById("spacecraft-list");
    const searchInput = document.getElementById("global-search");
    const searchBar = document.getElementById("searchBar");
    const missionsListUL = document.getElementById("missionsList");

    let allData = {
        missions: [],
        astronauts: [],
        spacecraft: []
    };

    // Function to fetch data from API
    function fetchAndDisplay(url, type) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                allData[type] = data;
                displayItems(data, type);
            })
            .catch(error => console.error(`Error fetching ${type}:`, error));
    }

    // Function to display items in the respective lists
    function displayItems(items, type) {
        let listElement;
        if (type === "missions") listElement = document.getElementById("missions-list");
        else if (type === "astronauts") listElement = document.getElementById("astronauts-list");
        else if (type === "spacecraft") listElement = document.getElementById("spacecraft-list");
    
        listElement.innerHTML = ""; // Clear existing content
    
        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
    
            // Set correct links and data based on type
            let itemId, itemName, itemImage, detailsPage;
            if (type === "missions") {
                itemId = item.Mission_ID;
                itemName = item.Mission_Name;
                itemImage = item.Mission_Img;
                detailsPage = "mission.html";
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
                    <img src="${itemImage}" alt="${itemName}">
                    <h3>${itemName}</h3>
                </a>
            `;
    
            listElement.appendChild(card);
        });
    }
    

    // Function to handle search and filter results
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

    // Event listener for global search input
    searchInput.addEventListener("input", function () {
        handleSearch(searchInput.value);
    });

    // Event listener for missions-only search bar
    searchBar.addEventListener("input", function () {
        let query = searchBar.value.trim().toLowerCase();

        fetch(`/api/missions?search=${query}`)
            .then(response => response.json())
            .then(data => {
                missionsListUL.innerHTML = ""; // Clear existing results
                data.forEach(mission => {
                    let missionItem = document.createElement("li");
                    missionItem.textContent = `${mission.Mission_Name} (${mission.Year})`;
                    missionsListUL.appendChild(missionItem);
                });
            })
            .catch(error => console.error("Error fetching missions:", error));
            fetch("/api/missions")
    .then(response => response.json())
    .then(data => {
        console.log("Missions Data Loaded:", data); // 🔹 Debugging Output
        allData.missions = data;
        displayItems(data, "missions");
    })
    .catch(error => console.error("Error fetching missions:", error));

    });

    // Fetch and display all initial data
    fetchAndDisplay("/api/missions", "missions");
    fetchAndDisplay("/api/astronauts", "astronauts");
    fetchAndDisplay("/api/spacecraft", "spacecraft");
});
