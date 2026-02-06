const hamburger = document.querySelector(".hamburger");
const backdrop = document.querySelector(".mobile-menu-backdrop");
const closeBtn = document.querySelector(".mobile-menu-close");

function setMenuOpen(isOpen) {
  if (!hamburger || !backdrop) return;
  hamburger.classList.toggle("is-open", isOpen);
  backdrop.classList.toggle("is-open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  backdrop.setAttribute("aria-hidden", String(!isOpen));
  if (isOpen) {
    const first = backdrop.querySelector("button, [href], input, [tabindex]");
    if (first) first.focus();
  } else {
    hamburger.focus();
  }
}

if (hamburger && backdrop) {
  hamburger.addEventListener("click", () => {
    const isOpen = !hamburger.classList.contains("is-open");
    setMenuOpen(isOpen);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => setMenuOpen(false));
  }

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
}

const calculateBtn = document.getElementById("calculate-btn");
const finalAverageEl = document.getElementById("final-average");

if (calculateBtn && finalAverageEl) {
  const SUBJECT_WEIGHTS = {
    database: { td: 0.2, tp: 0.2, exam: 0.6 },
    info_tl: { td: 0.2, tp: 0.2, exam: 0.6 },
    networks: { td: 0.2, tp: 0.2, exam: 0.6 },
    oop: { tp: 0.4, exam: 0.6 }, 
    os: { td: 0.2, tp: 0.2, exam: 0.6 },
    web: { tp: 0.4, exam: 0.6 }, 
    english: { exam: 1 }, 
  };

  calculateBtn.addEventListener("click", () => {
    const rows = document.querySelectorAll(
      ".calculator-form .calculator-grid[data-subject]"
    );

    let totalWeighted = 0;
    let totalCoef = 0;

    rows.forEach((row) => {
      const subjectKey = row.getAttribute("data-subject");
      const weights = SUBJECT_WEIGHTS[subjectKey];
      if (!weights) return;

      const coefCell = row.querySelector(".calc-coef");
      if (!coefCell) return;
      const coef = Number(coefCell.getAttribute("data-coef") || "0");
      if (!coef) return;

      let moduleAvg = 0;

      const tdInput = row.querySelector("input[name$='_td']");
      const tpInput = row.querySelector("input[name$='_tp']");
      const examInput = row.querySelector("input[name$='_exam']");

      if (weights.td && tdInput) {
        const v = Number(tdInput.value || "0");
        if (!Number.isNaN(v)) {
          moduleAvg += v * weights.td;
        }
      }

      if (weights.tp && tpInput) {
        const v = Number(tpInput.value || "0");
        if (!Number.isNaN(v)) {
          moduleAvg += v * weights.tp;
        }
      }

      if (weights.exam && examInput) {
        const v = Number(examInput.value || "0");
        if (!Number.isNaN(v)) {
          moduleAvg += v * weights.exam;
        }
      }

      const moduleAvgCell = row.querySelector(".calc-module-avg");
      if (moduleAvgCell) {
        moduleAvgCell.textContent = moduleAvg.toFixed(2);
      }

      totalWeighted += moduleAvg * coef;
      totalCoef += coef;
    });

    if (!totalCoef) {
      finalAverageEl.textContent = "—";
      return;
    }

    const finalAvg = totalWeighted / totalCoef;
    finalAverageEl.textContent = finalAvg.toFixed(2);
  });
}

const searchInput = document.querySelector(".search-input");
const searchCta = document.querySelector(".search-cta");
const searchResults = document.getElementById("search-results");

const SEARCH_INDEX = [
  { label: "Home", page: "index.html", type: "Page", description: "Landing page" },
  {
    label: "Modules page",
    page: "modules.html",
    type: "Page",
    description: "All S4 modules",
  },
  {
    label: "Calculator page",
    page: "calculator.html",
    type: "Page",
    description: "Grades & GPA",
  },
  {
    label: "Professor Emails",
    page: "prof-emails.html",
    type: "Page",
    description: "Professors contacts",
  },
  {
    label: "P-emails",
    page: "prof-emails.html",
    type: "Page",
    description: "Professor emails",
  },
  {
    label: "Ahmim Marwa",
    page: "prof-emails.html",
    type: "Professor",
    description: "maroua.ahmim@univ-annaba.dz",
  },
  {
    label: "Amrane Djamel Essolh",
    page: "prof-emails.html",
    type: "Professor",
    description: "djamel-essolh.amrane@univ-annaba.dz",
  },
  {
    label: "Beggari Nadia",
    page: "prof-emails.html",
    type: "Professor",
    description: "nadia.begari@univ-annaba.dz",
  },
  {
    label: "Benali Abdelhakim",
    page: "prof-emails.html",
    type: "Professor",
    description: "abdelhakim.benali@univ-annaba.dz",
  },
  {
    label: "Benchalel Amir",
    page: "prof-emails.html",
    type: "Professor",
    description: "amir.benchalel@univ-annaba.dz",
  },
  {
    label: "Benmazou Sarah",
    page: "prof-emails.html",
    type: "Professor",
    description: "sara.benmazou@univ-annaba.dz",
  },
  {
    label: "Benouareth Abdallah",
    page: "prof-emails.html",
    type: "Professor",
    description: "abdallah.benouareth@univ-annaba.dz",
  },
  {
    label: "Bensalem Hana",
    page: "prof-emails.html",
    type: "Professor",
    description: "hana.bensalem@univ-annaba.dz",
  },
  {
    label: "Besnaci Mohamed",
    page: "prof-emails.html",
    type: "Professor",
    description: "mohamed.besnaci@univ-annaba.dz",
  },
  {
    label: "Boudjedir Amina",
    page: "prof-emails.html",
    type: "Professor",
    description: "amina.boudjedir@univ-annaba.dz",
  },
  {
    label: "Bouhaddada Tahar",
    page: "prof-emails.html",
    type: "Professor",
    description: "taher.bouhadada@yahoo.com",
  },
  {
    label: "Boulemden Ahmed",
    page: "prof-emails.html",
    type: "Professor",
    description: "ahmed.boulemden@univ-annaba.dz",
  },
  {
    label: "Bouslah Ayoub",
    page: "prof-emails.html",
    type: "Professor",
    description: "ayoub.bouslah@univ-annaba.dz",
  },
  {
    label: "Debboub Soumeya",
    page: "prof-emails.html",
    type: "Professor",
    description: "soumeya.debboub@univ-annaba.dz",
  },
  {
    label: "Djemili Fatiha",
    page: "prof-emails.html",
    type: "Professor",
    description: "fatiha.djemili@univ-annaba.dz",
  },
  {
    label: "Farah Nadir",
    page: "prof-emails.html",
    type: "Professor",
    description: "nadir.farah@univ-annaba.dz",
  },
  {
    label: "Haiahem Rahim",
    page: "prof-emails.html",
    type: "Professor",
    description: "rahim.haiahem@univ-annaba.dz",
  },
  {
    label: "Hakim Amira",
    page: "prof-emails.html",
    type: "Professor",
    description: "amira.hakim@univ-annaba.dz",
  },
  {
    label: "Hamadache Billel",
    page: "prof-emails.html",
    type: "Professor",
    description: "bilel.hamadache@univ-annaba.dz",
  },
  {
    label: "Hariati Mehdi",
    page: "prof-emails.html",
    type: "Professor",
    description: "mehdi.hariati@univ-annaba.dz",
  },
  {
    label: "Kahya Noudjoud",
    page: "prof-emails.html",
    type: "Professor",
    description: "noudjoud.kahya@univ-annaba.dz",
  },
  {
    label: "Kherici Nada",
    page: "prof-emails.html",
    type: "Professor",
    description: "nada.kherici@univ-annaba.dz",
  },
  {
    label: "Khetatba Mourad",
    page: "prof-emails.html",
    type: "Professor",
    description: "mourad.khetatba@univ-annaba.dz",
  },
  {
    label: "Klai Sihem",
    page: "prof-emails.html",
    type: "Professor",
    description: "sihem.klai@univ-annaba.dz",
  },
  {
    label: "Mecheri Karima",
    page: "prof-emails.html",
    type: "Professor",
    description: "karima.mecheri@univ-annaba.dz",
  },
  {
    label: "Mechetri Leila",
    page: "prof-emails.html",
    type: "Professor",
    description: "leila.mechtri@univ-annaba.dz",
  },
  {
    label: "Menghour Kamilia",
    page: "prof-emails.html",
    type: "Professor",
    description: "kamilia.manghour@univ-annaba.dz",
  },
  {
    label: "Nafaa Mehdi",
    page: "prof-emails.html",
    type: "Professor",
    description: "mehdi.nafaa@univ-annaba.dz",
  },
  {
    label: "Saheb Faïza",
    page: "prof-emails.html",
    type: "Professor",
    description: "faiza.saheb@univ-annaba.dz",
  },
  {
    label: "Sobhi Hocine",
    page: "prof-emails.html",
    type: "Professor",
    description: "sobhi_h@yahoo.com",
  },
  {
    label: "Taleb Nora",
    page: "prof-emails.html",
    type: "Professor",
    description: "nora.taleb@univ-annaba.dz",
  },
  {
    label: "Yakoubi Mohammed Amine",
    page: "prof-emails.html",
    type: "Professor",
    description: "amine.yakoubi@univ-annaba.dz",
  },
  {
    label: "Yessad Mokhtari Safia",
    page: "prof-emails.html",
    type: "Professor",
    description: "safia.yassad-mokhtari@univ-annaba.dz",
  },
  {
    label: "Zenati Soraya",
    page: "prof-emails.html",
    type: "Professor",
    description: "soraya.zenati@univ-annaba.dz",
  },
  {
    label: "Data base",
    page: "modules.html",
    type: "Module",
    description: "S4 module",
  },
  {
    label: "Info TL",
    page: "modules.html",
    type: "Module",
    description: "S4 module",
  },
  {
    label: "Networks",
    page: "modules.html",
    type: "Module",
    description: "S4 module",
  },
  {
    label: "Orient object programming",
    page: "modules.html",
    type: "Module",
    description: "S4 module",
  },
  {
    label: "Operation system",
    page: "modules.html",
    type: "Module",
    description: "S4 module",
  },
  {
    label: "Web development",
    page: "modules.html",
    type: "Module",
    description: "S4 module",
  },
  {
    label: "English",
    page: "modules.html",
    type: "Module",
    description: "S4 module",
  },
  {
    label: "Database",
    page: "calculator.html",
    type: "Calculator",
    description: "TP, TD, Exam (coef 3)",
  },
  {
    label: "Info TL",
    page: "calculator.html",
    type: "Calculator",
    description: "TD, TP, Exam (coef 2)",
  },
  {
    label: "Networks",
    page: "calculator.html",
    type: "Calculator",
    description: "TD, TP, Exam (coef 3)",
  },
  {
    label: "OOP",
    page: "calculator.html",
    type: "Calculator",
    description: "TP, Exam (coef 2)",
  },
  {
    label: "Operating System",
    page: "calculator.html",
    type: "Calculator",
    description: "TD, TP, Exam (coef 3)",
  },
  {
    label: "Web Development",
    page: "calculator.html",
    type: "Calculator",
    description: "TP, Exam (coef 2)",
  },
  {
    label: "English",
    page: "calculator.html",
    type: "Calculator",
    description: "Exam only (coef 1)",
  },
];

function clearSearchHighlights() {
  document.querySelectorAll(".search-match").forEach((el) => {
    el.classList.remove("search-match");
  });
  document.querySelectorAll(".search-dim").forEach((el) => {
    el.classList.remove("search-dim");
  });

  if (searchResults) {
    searchResults.innerHTML = "";
  }
}

function runPageSearch(queryRaw) {
  const query = queryRaw.trim().toLowerCase();
  clearSearchHighlights();
  if (!query) return;

  
  if (searchResults) {
    const matches = SEARCH_INDEX.filter((item) => {
      const haystack = `${item.label} ${item.description || ""} ${item.type || ""}`.toLowerCase();
      return haystack.includes(query);
    });

    if (matches.length > 0) {
      const inner = document.createElement("div");
      inner.className = "search-results-inner";

      const title = document.createElement("div");
      title.className = "search-results-title";
      title.textContent = `Results for "${queryRaw.trim()}"`;
      inner.appendChild(title);

      const list = document.createElement("div");
      list.className = "search-results-list";

      matches.forEach((item) => {
        const pill = document.createElement("div");
        pill.className = "search-result-pill";

        const main = document.createElement("span");
        main.textContent = item.label;
        pill.appendChild(main);

        const meta = document.createElement("small");
        meta.textContent = item.description || item.type;
        pill.appendChild(meta);

        const link = document.createElement("a");
        link.href = item.page;
        link.className = "search-open-btn";
        link.textContent = "Open";
        pill.appendChild(link);

        list.appendChild(pill);
      });

      inner.appendChild(list);
      searchResults.appendChild(inner);
    }
  }

  const profCards = document.querySelectorAll(".prof-card");
  if (profCards.length) {
    let anyMatch = false;
    profCards.forEach((card) => {
      const nameEl = card.querySelector(".prof-name");
      const emailEl = card.querySelector(".prof-email-btn");
      const text = [nameEl, emailEl]
        .filter(Boolean)
        .map((el) => el.textContent.toLowerCase())
        .join(" ");
      if (text.includes(query)) {
        card.classList.add("search-match");
        anyMatch = true;
      } else {
        card.classList.add("search-dim");
      }
    });
    if (anyMatch) return;
  }

  const moduleCards = document.querySelectorAll(".module-card");
  if (moduleCards.length) {
    let anyMatch = false;
    moduleCards.forEach((card) => {
      const nameEl = card.querySelector(".module-name");
      const text = nameEl ? nameEl.textContent.toLowerCase() : "";
      if (text.includes(query)) {
        card.classList.add("search-match");
        anyMatch = true;
      } else {
        card.classList.add("search-dim");
      }
    });
    if (anyMatch) return;
  }

  const subjectRows = document.querySelectorAll(
    ".calculator-form .calculator-grid[data-subject]"
  );
  if (subjectRows.length) {
    subjectRows.forEach((row) => {
      const labelEl = row.querySelector(".calc-subject span");
      const text = labelEl ? labelEl.textContent.toLowerCase() : "";
      if (text.includes(query)) {
        row.classList.add("search-match");
      } else {
        row.classList.add("search-dim");
      }
    });
  }
}

if (searchInput) {
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runPageSearch(searchInput.value);
    } else if (event.key === "Escape") {
      clearSearchHighlights();
    }
  });
}

if (searchCta && searchInput) {
  searchCta.addEventListener("click", () => {
    runPageSearch(searchInput.value);
  });
}

const moduleToggles = document.querySelectorAll(".module-toggle");

if (moduleToggles.length) {
  moduleToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const card = toggle.closest(".module-card");
      const details = card && card.querySelector(".module-details");
      const chevron = toggle.querySelector(".module-chevron");
      if (!details) return;

      const isOpen = details.classList.contains("is-open");

      document.querySelectorAll(".module-details.is-open").forEach((open) => {
        if (open !== details) {
          open.classList.remove("is-open");
          const c = open.closest(".module-card")?.querySelector(".module-chevron");
          if (c) c.textContent = "⌄";
        }
      });

      details.classList.toggle("is-open", !isOpen);
      if (chevron) {
        chevron.textContent = !isOpen ? "⌃" : "⌄";
      }
    });
  });
}



