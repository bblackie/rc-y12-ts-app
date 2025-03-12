document.addEventListener("DOMContentLoaded", function () {
    const missionsList = document.getElementById("missions-list");
    const searchInput = document.getElementById("search");

    // Fetch missions from backend
    fetch("/api/missions")
        .then(response => response.json())
        .then(data => displayMissions(data));

    // Function to display missions
    function displayMissions(missions) {
        missionsList.innerHTML = "";
        missions.forEach(mission => {
            const missionCard = document.createElement("div");
            missionCard.classList.add("mission-card");
            missionCard.innerHTML = `
                <h3>${mission.Mission_Name}</h3>
                <p><strong>Year:</strong> ${mission.Year}</p>
                <p><strong>Destination:</strong> ${mission.Destination}</p>
                <p><strong>Outcome:</strong> ${mission.Outcome}</p>
            `;
            missionsList.appendChild(missionCard);
        });
    }
    function displayMissions(missions) {
        missionsList.innerHTML = "";
        missions.forEach(mission => {
            const missionCard = document.createElement("div");
            missionCard.classList.add("mission-card");
            missionCard.innerHTML = `
                <a href="mission.html?id=${mission.Mission_ID}">
                    <img src="${mission.Mission_Img || 'static/placeholder.jpg'}" 
                         alt="${mission.Mission_Name}" class="mission-image">
                    <h3>${mission.Mission_Name}</h3>
                    <p><strong>Year:</strong> ${mission.Year}</p>
                    <p><strong>Destination:</strong> ${mission.Destination}</p>
                </a>
            `;
            missionsList.appendChild(missionCard);
        });
    }
    
    // Search feature
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        fetch("/api/missions")
            .then(response => response.json())
            .then(data => {
                const filteredMissions = data.filter(mission => 
                    mission.Mission_Name.toLowerCase().includes(searchTerm)
                );
                displayMissions(filteredMissions);
            });
    });
});
