document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const astronautId = params.get("id");

    if (!astronautId) {
        document.getElementById("astronaut-details").innerHTML = "<p>Astronaut not found.</p>";
        return;
    }

    fetch(`/api/astronauts/${astronautId}`)
        .then(response => response.json())
        .then(astronaut => {
            document.getElementById("astronaut-details").innerHTML = `
                <h2>${astronaut.Name}</h2>
                <img src="${astronaut.Astronaut_Img}" alt="${astronaut.Name}" class="astronaut-image">
                <p><strong>Birth Year:</strong> ${astronaut.Birth_Year}</p>
                <p><strong>Nationality:</strong> ${astronaut.Nationality}</p>
                <p><strong>Bio:</strong> ${astronaut.Biography}</p>
            `;
        })
        .catch(error => console.error("Error fetching astronaut details:", error));
});