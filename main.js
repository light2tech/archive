const CATEGORIES = {
  photo:   ["Photography", "#ff4a1c"],
  music:   ["Music",       "#e9b32f"],
  fashion: ["Fashion",     "#4d86e0"],
  design:  ["Design",      "#1f9e57"],
};

const ENTRIES = [
  [
    "1950s", "music",
    "Highlife fills the dance halls",
    "Bandleaders like Victor Olaiya and Bobby Benson make Lagos nights swing with horns and guitars.",
  ],
  [
    "1960", "design",
    "A flag is raised",
    "Designed by Michael Taiwo Akinkunmi, the green-white-green flag is hoisted at independence on 1 October.",
  ],
  [
    "1960s", "fashion",
    "The boutique era begins",
    "Shade Thomas-Fahm, often credited as a pioneer of Nigerian fashion design, dresses a newly independent city.",
  ],
  [
    "1968", "photo",
    "Hairstyles, one frame at a time",
    "J.D. 'Okhai Ojeikere begins photographing women's hairstyles across Nigeria, turning them into a monumental body of work.",
  ],
  [
    "1970s", "music",
    "The Shrine and the sound",
    "Fela Kuti fuses jazz, highlife and funk into Afrobeat and turns the Afrika Shrine into a stage for dissent.",
  ],
  [
    "1970s", "design",
    "Building a new culture",
    "Architect and designer Demas Nwoko roots modernism in Nigerian form at the New Culture Studios in Ibadan.",
  ],
  [
    "1980s", "music",
    "Juju and fuji go loud",
    "King Sunny Adé takes juju abroad while fuji grows in the streets, drums first.",
  ],
  [
    "2010", "photo",
    "LagosPhoto opens",
    "An annual festival gives contemporary photographers a home city audience and a world one.",
  ],
  [
    "2011", "fashion",
    "Lagos gets a fashion week",
    "Lagos Fashion Week launches, turning local labels into a calendar the world watches.",
  ],
  [
    "2010s", "music",
    "Afrobeats leaves home",
    "A new generation of artists carries the sound onto global charts and stages.",
  ],
  [
    "2020s", "design",
    "ARCHIVE opens",
    "A generation scans, tags and shares what was nearly lost. The past stays on the record.",
  ],
];

const $ = (selector) => document.querySelector(selector);

function initMarquee() {
  const text = "Photography ✦ Music ✦ Fashion ✦ Design ✦ 1950 → Now ✦ " +
               "Lagos ✦ Ibadan ✦ Kano ✦ Enugu ✦ Port Harcourt ✦ Abuja ✦ ";
  $("#mq").innerHTML = text.repeat(2);
}

function initRooms() {
  document.querySelectorAll(".room").forEach((room) => {
    room.addEventListener("click", () => {
      document.querySelectorAll(".room").forEach((r) => r.classList.remove("on"));
      room.classList.add("on");
    });
  });
}

function buildChips() {
  const entries = [["all", "All"], ...Object.entries(CATEGORIES).map(([k, v]) => [k, v[0]])];

  $("#ch").innerHTML = entries
    .map(([key, label]) =>
      `<button class="chip" data-k="${key}" aria-pressed="${key === "all"}">${label}</button>`
    )
    .join("");
}

const rowObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("v");
        rowObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

let activeFilter = "all";

function drawTimeline() {
  const filtered = ENTRIES.filter((e) => activeFilter === "all" || e[1] === activeFilter);

  $("#tl").innerHTML = filtered
    .map(
      ([decade, cat, title, desc]) => `
      <li>
        <div class="yr d">${decade}</div>
        <div>
          <h4>${title}</h4>
          <p>${desc}</p>
        </div>
        <div class="dis tag">
          <i style="background:${CATEGORIES[cat][1]}"></i>${CATEGORIES[cat][0]}
        </div>
      </li>`
    )
    .join("");

  document.querySelectorAll(".tl li").forEach((li) => rowObserver.observe(li));
}

function initTimeline() {
  buildChips();
  drawTimeline();

  $("#ch").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;

    activeFilter = btn.dataset.k;
    document.querySelectorAll(".chip").forEach((c) =>
      c.setAttribute("aria-pressed", c === btn)
    );
    drawTimeline();
  });
}

function initPullRecord() {
  let lastIndex = -1;

  function pull() {
    let i;
    do {
      i = Math.floor(Math.random() * ENTRIES.length);
    } while (i === lastIndex);
    lastIndex = i;

    const [decade, cat, title, desc] = ENTRIES[i];
    const num = String(i + 1).padStart(3, "0");

    $("#card").innerHTML = `
      <span class="tag" style="color:#6b624f">Record No. ${num} · ${CATEGORIES[cat][0]}</span>
      <div class="yr d">${decade}</div>
      <h4>${title}</h4>
      <p>${desc}</p>`;
  }

  $("#pb").addEventListener("click", pull);
  pull();
}

document.addEventListener("DOMContentLoaded", () => {
  initMarquee();
  initRooms();
  initTimeline();
  initPullRecord();
});
