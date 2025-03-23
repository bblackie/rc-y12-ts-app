document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const missionId = params.get("id");

    if (!missionId) {
        document.getElementById("mission-details").innerHTML = "<p>Mission not found.</p>";
        return;
    }

    fetch(`/api/missions/${missionId}`)
        .then(response => response.json())
        .then(mission => {
            document.getElementById("mission-details").innerHTML = `
                <h2>${mission.Mission_Name}</h2>
                <img src="${mission.Mission_Img || 'static/placeholder.jpg'}" alt="${mission.Mission_Name}" class="mission-image">
                <p><strong>Year:</strong> ${mission.Year}</p>
                <p><strong>Destination:</strong> ${mission.Destination}</p>
                <p><strong>Outcome:</strong> ${mission.Outcome}</p>
            `;
        })
        .catch(error => console.error("Error fetching mission details:", error));
});