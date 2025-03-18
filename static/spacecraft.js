document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const spacecraftId = params.get("id");

    if (!spacecraftId) {
        document.getElementById("spacecraft-details").innerHTML = "<p>Spacecraft not found.</p>";
        return;
    }

    // Fetch spacecraft details using the spacecraft ID
    fetch(`/api/spacecraft/${spacecraftId}`)
        .then(response => response.json())
        .then(spacecraft => {
            document.getElementById("spacecraft-name").textContent = spacecraft.Spacecraft_Name;
            document.getElementById("spacecraft-year").textContent = spacecraft.Launch_Year;
            document.getElementById("spacecraft-manufacturer").textContent = spacecraft.Manufacturer;
            document.getElementById("spacecraft-description").textContent = spacecraft.Description;
            document.getElementById("spacecraft-img").src = spacecraft.Spacecraft_Img;
            document.getElementById("spacecraft-img").alt = spacecraft.Spacecraft_Name;
        })
        .catch(error => {
            console.error("Error fetching spacecraft details:", error);
            document.getElementById("spacecraft-details").innerHTML = "<p>Error loading spacecraft details.</p>";
        });
});
