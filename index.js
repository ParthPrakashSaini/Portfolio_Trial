// --- Preloader and Content Animation Script ---
const preloader = document.getElementById("preloader");
const siteHeader = document.getElementById("site-header");
const siteMain = document.getElementById("site-main");
const siteFooter = document.getElementById("site-footer");
const heroHeadline = document.getElementById("hero-headline");

// Only run the preloader logic if the preloader element exists
if (preloader) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("preloader-hidden");
      preloader.addEventListener(
        "transitionend",
        () => {
          if (preloader) preloader.style.display = "none";

          siteHeader.classList.add("content-visible");
          siteMain.classList.add("content-visible");
          siteFooter.classList.add("content-visible");

          // Animate headline text only if it exists
          if (heroHeadline) {
            heroHeadline.style.opacity = 1;
            const textWrapper = document.querySelector("#hero-headline");
            const lines = textWrapper.innerHTML.split(/<br\s*\/?>/i);
            let newHTML = "";
            lines.forEach((line, index) => {
              newHTML += line.replace(/\S/g, "<span class='letter'>$&</span>");
              if (index < lines.length - 1) {
                newHTML += "<br>";
              }
            });
            textWrapper.innerHTML = newHTML;

            anime.timeline({ loop: false }).add({
              targets: "#hero-headline .letter",
              translateY: [-100, 0],
              easing: "easeOutExpo",
              duration: 1400,
              delay: (el, i) => 30 * i,
            });
          }

          AOS.init({
            duration: 1000,
            once: true,
          });
        },
        { once: true }
      );
    }, 3000);
  });
} else {
  // If no preloader, just show the content and initialize AOS
  window.addEventListener("load", () => {
    if (siteHeader) siteHeader.classList.add("content-visible");
    if (siteMain) siteMain.classList.add("content-visible");
    if (siteFooter) siteFooter.classList.add("content-visible");
    AOS.init({
      duration: 1000,
      once: true,
    });
  });
}

// --- Custom Cursor Script (Simplified) ---
const cursorDot = document.querySelector("#cursor-dot");
if (cursorDot) {
  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
  });
  const links = document.querySelectorAll(
    "a, button, .project-card img, .inspiration-item"
  );
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => cursorDot.classList.add("hover"));
    link.addEventListener("mouseleave", () =>
      cursorDot.classList.remove("hover")
    );
  });
}

// --- Text Scramble Effect ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
document.querySelectorAll(".glitch-link").forEach((link) => {
  let interval = null;
  link.onmouseenter = (event) => {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.text[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= event.target.dataset.text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };
});

// --- Project Modal Script ---
const modal = document.getElementById("project-modal");
const closeModalBtn = document.getElementById("close-modal");
const projectCards = document.querySelectorAll(".project-card");

const projectData = {
  DOCSYNC: {
    img: "./Mockups/Docsyncmockup.png",
    challenge:
      "Patients faced difficulty booking appointments across multiple clinics efficiently.",
    process:
      "Developed a MERN stack app with role-based access, allowing patients to book and doctors to manage appointments.",
    result:
      "Streamlined booking process with real-time approvals, enhancing convenience for both patients and doctors.",
  },
  WORKS: {
    img: "./Mockups/Worksmockup.png",
    challenge:
      "Create a modern and visually striking online presence for a creative brand.",
    process:
      "Designed an aesthetic, unique UI and developed a fully responsive landing page with smooth interactions and clean layout.",
    result:
      "A captivating website that reflects the brand's identity and enhances its digital presence.",
  },
  DENTYTECH: {
    img: "./Mockups/Dentytech.png",
    challenge:
      "Design a clean and professional landing page to represent a modern dental brand online.",
    process:
      "Created a responsive, visually appealing UI with smooth layout, clear sections, and a focus on trust-building design.",
    result:
      "A polished landing page that effectively showcases DentyTech's services and enhances their online credibility.",
  },
  SIMONGAME: {
    img: "./Mockups/Simongame.png",
    challenge:
      "Build a fun and interactive game that challenges users' memory with increasing difficulty.",
    process:
      "Developed using HTML, CSS, and JavaScript. Implemented game logic, color/sound cues, and responsive user interaction.",
    result:
      "A smooth, browser-based game with engaging feedback and a nostalgic feel that keeps users entertained.",
  },
  KEEPER: {
    img: "./Mockups/Keeper.png",
    challenge:
      "Create a simple and clean app for users to jot down and manage their daily notes.",
    process:
      "Built with React.js, using components to handle adding and deleting notes with a minimal and intuitive UI.",
    result:
      "A lightweight, user-friendly note-taking app that keeps things organized and visually neat.",
  },
};

if (projectCards.length > 0) {
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3").textContent;
      const data = projectData[title] || {
        // Fallback data
        img: card.querySelector("img").src,
        challenge: "Details for this project are coming soon.",
        process: "Details for this project are coming soon.",
        result: "Details for this project are coming soon.",
      };

      document.getElementById("modal-img").src = data.img;
      document.getElementById("modal-title").textContent = title;
      document.getElementById("modal-challenge").textContent = data.challenge;
      document.getElementById("modal-process").textContent = data.process;
      document.getElementById("modal-result").textContent = data.result;

      modal.classList.remove("opacity-0", "pointer-events-none");
      document.body.style.overflow = "hidden";
    });
  });
}

const closeModal = () => {
  if (modal) {
    modal.classList.add("opacity-0", "pointer-events-none");
    document.body.style.overflow = "";
  }
};
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// --- Mobile Menu Script ---
const mobileMenuButton = document.getElementById("mobile-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const body = document.querySelector("body");

const toggleMenu = () => {
  mobileMenu.classList.toggle("open");
  body.classList.toggle("menu-open");
};

mobileMenuButton.addEventListener("click", toggleMenu);
closeMenuButton.addEventListener("click", toggleMenu);

const mobileMenuLinks = mobileMenu.getElementsByTagName("a");
for (let link of mobileMenuLinks) {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    body.classList.remove("menu-open");
  });
}
