document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");

    searchBar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const searchTerm = searchBar.value.toLowerCase().trim();

            if (searchTerm.includes("mission")) {
                window.location.href = "missions.html";
            } else if (searchTerm.includes("astronaut")) {
                window.location.href = "astronauts.html";
            } else if (searchTerm.includes("spacecraft") || searchTerm.includes("rocket")) {
                window.location.href = "spacecraft.html";
            } else {
                alert("No results found. Try searching for 'Missions', 'Astronauts', or 'Spacecraft'.");
            }
        }
    });
});
