document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/missions')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("missions-list");
            container.innerHTML = "";

            data.forEach(mission => {
                const div = document.createElement("div");
                div.classList.add("card");
                div.innerHTML = `
                    <a href="mission.html?id=${mission.Mission_ID}">
                        <img src="${mission.Mission_Img}" class="thumbnail">
                        <h3>${mission.Mission_Name}</h3>
                    </a>
                `;
                container.appendChild(div);
            });
        });
});
