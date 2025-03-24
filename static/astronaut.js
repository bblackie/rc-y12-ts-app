document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/astronauts')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("astronauts-list");
            container.innerHTML = "";

            data.forEach(astro => {
                const div = document.createElement("div");
                div.classList.add("card");
                div.innerHTML = `
                    <a href="astronaut.html?id=${astro.Astronaut_ID}">
                        <img src="${astro.Astronaut_Img}" class="thumbnail">
                        <h3>${astro.Name}</h3>
                        <p><strong>Role:</strong> ${astro.Role}</p>
                    </a>
                `;
                container.appendChild(div);
            });
        });
});
