document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const missionId = urlParams.get("id");

    if (!missionId) {
        document.getElementById("mission-details").innerHTML = "<p>Mission not found.</p>";
        return;
    }

    fetch(`/api/missions`)
        .then(response => response.json())
        .then(data => {
            const mission = data.find(m => m.Mission_ID == missionId);
            if (!mission) {
                document.getElementById("mission-details").innerHTML = "<p>Mission not found.</p>";
                return;
            }

            document.getElementById("mission-details").innerHTML = `
                <h2>${mission.Mission_Name}</h2>
                <img src="${mission.Mission_Img || 'static/placeholder.jpg'}" alt="${mission.Mission_Name}" class="mission-image">
                <p><strong>Year:</strong> ${mission.Year}</p>
                <p><strong>Destination:</strong> ${mission.Destination}</p>
                <p><strong>Outcome:</strong> ${mission.Outcome}</p>
            `;
        })
        .catch(error => console.error("Error fetching mission data:", error));
});
