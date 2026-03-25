async function getData() {
    try {
        const response = await fetch("erfarenhet.json");
        if (!response.ok) {
            throw new Error("Kunde inte hämta data: " + response.statusText);
        }
        const data = await response.json();
        showEducations(data.educations)
        showJobbs(data.workPlaces);
        showInfo(data.info);
    } catch (error) {
        console.log(error)
    }
}

getData();

function showEducations(educations) {
    const educationListElement = document.querySelector("#utbildningar");

    educations.forEach((education) => {
        const educationElement = document.createElement("div");
        educationElement.className = "education";

        educationElement.innerHTML = `
        <h2>${education.schoolName}</h2>
        <p><strong></strong> ${education.subjectName}</p>
        <p><strong>Längd:</strong> ${education.length}</p>`;

        educationListElement.appendChild(educationElement);
    })
}

function showJobbs(jobbs) {
    const jobbListElement = document.getElementById("jobb");

    jobbs.forEach((jobb) => {
        const jobbElement = document.createElement("div");
        jobbElement.className = "jobbs";

        jobbElement.innerHTML = `
        <h2>${jobb.name}</h2>
        <p><strong>Anställd:</strong> ${jobb.employment}</p>`;

        jobbListElement.appendChild(jobbElement);
    })
}

function showInfo(info) {
    const infoElement = document.getElementById("info")

    infoElement.innerHTML = `
    <h2>${info.title}</h2>
    <p><strong>Namn: </strong>${info.name}</p>
    <p><strong>Gmail: </strong>${info.mail}</p>
    <p><strong>Telefon: </strong>${info.phone}</p>`
}

const copyIcon = document.getElementById("copy");
let count = 0;
copyIcon.addEventListener("click", () => {
    count++;
    if (count > 0) {
        count = 0;
        document.querySelector("body").classList.add("changeColor");
    }
})

//easter egg pop-up
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");

function modalPopup() {
    modal.classList.add("open");
}

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
})

let keyPresses = "";

document.addEventListener("keydown", (e) => { 
    keyPresses = keyPresses + e.key;
    let lastkey = e.key;
    console.log(keyPresses);  
    if (lastkey === "1") {
        keyPresses = "1"
    } 
    if (keyPresses === "1337") {
        modalPopup();
    }
    if (keyPresses.length > 3) {
        keyPresses = "";
    }
})

const baseURL = "https://api.github.com/users/Bgust03/repos"
const loaderContainer = document.querySelector('.loading-container')

async function fetchProjekts() {
    const response = await fetch(`${baseURL}`);
    if (!response.ok) {
        console.log("Något gick fel.");
        return;
    }
        const data = await response.json();
        console.log(data);

        const mySelectedRepos = ["Individuellt_databasprojekt_Liam", "NumbersGame", "Bibloteket"];

        const filteredRepos = data.filter(repo => mySelectedRepos.includes(repo.name));

        showRepos(filteredRepos);
        loaderContainer.classList.add('fade-out');
}

fetchProjekts();

function showRepos(repos) {
    const repoListElement = document.getElementById("repos");
    repoListElement.innerHTML = ""; // Clear list before adding

    repos.forEach((repo) => {
        const repoElement = document.createElement("div");
        repoElement.className = "repo-container"; // Use classes, not IDs for multiples

        // 1. Create the HTML (notice we use classes for the buttons now)
        repoElement.innerHTML = `
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}" target="_blank">
                <img src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU=w240-h480-rw" alt="Bild på projektet">
            </a>
            <button class="open-modal-btn">Mer info</button>
            
            <div class="modal2">
                <div class="modal-inner2">
                    <h2>${repo.name}</h2>
                    <p>${repo.description || "Ingen beskrivning tillgänglig."}</p>
                    <button class="close-modal-btn">Close</button>
                </div>
            </div>`;

        // 2. Select the elements SPECIFICALLY inside this repoElement
        const openBtn = repoElement.querySelector(".open-modal-btn");
        const closeBtn = repoElement.querySelector(".close-modal-btn");
        const modal = repoElement.querySelector(".modal2");

        // 3. Add the listeners right here
        openBtn.addEventListener("click", () => {
            modal.classList.add("open");
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("open");
        });

        repoListElement.appendChild(repoElement);
    });
}

