document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/spacecraft')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("spacecraft-list");
            container.innerHTML = "";

            data.forEach(sc => {
                const div = document.createElement("div");
                div.classList.add("card");
                div.innerHTML = `
                    <a href="spacecraft.html?id=${sc.Spacecraft_ID}">
                        <img src="${sc.Spacecraft_Img}" class="thumbnail">
                        <h3>${sc.Spacecraft_Name}</h3>
                        <p><strong>Launch Vehicle:</strong> ${sc.Launch_Vehicle}</p>
                        <p><strong>First Launch:</strong> ${sc.First_Launch}</p>
                        <p><strong>Operator:</strong> ${sc.Operator}</p>
                        <p><strong>Crew Capacity:</strong> ${sc.Crew_Capacity}</p>
                        <p><strong>Notable Missions:</strong> ${sc.Notable_Missions}</p>
                    </a>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Error loading spacecraft:", error);
            document.getElementById("spacecraft-list").innerHTML = "<p>Error loading data. Please try again.</p>";
        });
});
