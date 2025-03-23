document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const spacecraftId = params.get("id");

    if (!spacecraftId) {
        document.getElementById("spacecraft-details").innerHTML = "<p>Spacecraft not found.</p>";
        return;
    }

    fetch(`/api/spacecraft/${spacecraftId}`)
        .then(response => response.json())
        .then(spacecraft => {
            document.getElementById("spacecraft-details").innerHTML = `
                <h2>${spacecraft.Spacecraft_Name}</h2>
                <img src="${spacecraft.Spacecraft_Img}" alt="${spacecraft.Spacecraft_Name}" class="spacecraft-image">
                <p><strong>Launch Year:</strong> ${spacecraft.Launch_Year}</p>
                <p><strong>Manufacturer:</strong> ${spacecraft.Manufacturer}</p>
                <p><strong>Description:</strong> ${spacecraft.Description}</p>
            `;
        })
        .catch(error => console.error("Error fetching spacecraft details:", error));
});