document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const astronautId = params.get("id");

    if (!astronautId) {
        document.getElementById("astronaut-details").innerHTML = "<p>Astronaut not found.</p>";
        return;
    }

    // Fetch astronaut details using the astronaut ID
    fetch(`/api/astronauts/${astronautId}`)
        .then(response => response.json())
        .then(astronaut => {
            document.getElementById("astronaut-name").textContent = astronaut.Name;
            document.getElementById("astronaut-birth").textContent = astronaut.Birth_Year;
            document.getElementById("astronaut-nationality").textContent = astronaut.Nationality;
            document.getElementById("astronaut-bio").textContent = astronaut.Biography;
            document.getElementById("astronaut-img").src = astronaut.Astronaut_Img;
            document.getElementById("astronaut-img").alt = astronaut.Name;
        })
        .catch(error => {
            console.error("Error fetching astronaut details:", error);
            document.getElementById("astronaut-details").innerHTML = "<p>Error loading astronaut details.</p>";
        });
});
