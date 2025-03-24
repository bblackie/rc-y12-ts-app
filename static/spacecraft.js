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
                    </a>
                `;
                container.appendChild(div);
            });
        });
});
