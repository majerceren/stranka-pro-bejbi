const slider = document.querySelector(".slider");
const heart = document.getElementById("sliderHeart");
const page1 = document.getElementById("page1");
const music = document.getElementById("music");

let dragging = false;
let completed = false;


/* =========================================
   SLIDER
========================================= */

function moveHeart(clientX) {

    if (completed) return;

    const rect = slider.getBoundingClientRect();

    const heartWidth = heart.offsetWidth;

    const maxPosition =
        rect.width - heartWidth;

    let position =
        clientX - rect.left - heartWidth / 2;

    position = Math.max(
        0,
        Math.min(position, maxPosition)
    );

    heart.style.left = position + "px";

    const percentage =
        position / maxPosition;

    /*
       Jakmile je srdíčko prakticky úplně
       na konci, přejde se na druhou stránku.
    */

    if (percentage >= 0.96) {
        completeSlider();
    }
}


/* MYŠ */

heart.addEventListener("mousedown", (event) => {

    event.preventDefault();

    dragging = true;
});


document.addEventListener("mousemove", (event) => {

    if (!dragging) return;

    moveHeart(event.clientX);
});


document.addEventListener("mouseup", () => {

    dragging = false;
});


/* DOTYK / MOBIL */

heart.addEventListener("touchstart", (event) => {

    event.preventDefault();

    dragging = true;
}, {
    passive: false
});


document.addEventListener("touchmove", (event) => {

    if (!dragging) return;

    event.preventDefault();

    moveHeart(event.touches[0].clientX);

}, {
    passive: false
});


document.addEventListener("touchend", () => {

    dragging = false;
});


/* =========================================
   DOKONČENÍ SLIDERU
========================================= */

function completeSlider() {

    if (completed) return;

    completed = true;

    const rect = slider.getBoundingClientRect();

    heart.style.left =
        (rect.width - heart.offsetWidth) + "px";

    heart.style.transform = "scale(1.25)";

    setTimeout(() => {

        document.body.classList.add("show-page-two");

        /*
          Prohlížeče často blokují automatické
          přehrání zvuku. Proto se pokusíme
          spustit hudbu až po kliknutí/touchi
          uživatele.
        */

        music.play().catch(() => {
            console.log(
                "Automatické přehrání hudby bylo prohlížečem zablokováno."
            );
        });

        createHearts();
        createLadybugs();

    }, 500);
}


/* =========================================
   PADAJÍCÍ SRDÍČKA
========================================= */

function createHearts() {

    const container =
        document.querySelector(".falling-hearts");

    setInterval(() => {

        const heartElement =
            document.createElement("div");

        heartElement.className =
            "falling-heart";

        const hearts = [
            "♥",
            "❤",
            "♡"
        ];

        heartElement.textContent =
            hearts[
                Math.floor(
                    Math.random() * hearts.length
                )
            ];

        heartElement.style.left =
            Math.random() * 100 + "%";

        heartElement.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heartElement.style.animationDuration =
            (4 + Math.random() * 5) + "s";

        container.appendChild(heartElement);

        setTimeout(() => {
            heartElement.remove();
        }, 10000);

    }, 450);
}


/* =========================================
   BERUŠKY
========================================= */

function createLadybugs() {

    const container =
        document.querySelector(".ladybugs");

    for (let i = 0; i < 5; i++) {

        const bug =
            document.createElement("div");

        bug.className = "ladybug";

        bug.textContent = "🐞";

        bug.style.top =
            (10 + Math.random() * 75) + "%";

        bug.style.animationDuration =
            (10 + Math.random() * 10) + "s";

        bug.style.animationDelay =
            (Math.random() * 8) + "s";

        container.appendChild(bug);
    }
}