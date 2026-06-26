const doctolibPlaceholder = "https://www.doctolib.fr/";
const chuWebsite = "https://www.chu-nice.fr/";
const defaultSurgeonContact = {
  secretariat: "Secrétariat à compléter",
  unit: "Unité ou consultation à compléter",
  phone: "Téléphone à compléter",
  email: "Email à compléter"
};

const surgeons = [
  {
    id: "patrick-baque",
    name: "Pr BAQUÉ Patrick",
    role: "Chef de service",
    group: "professeur",
    initials: "PB",
    photo: "assets/photos/patrick-baque.jpg",
    expertise: ["Direction du service", "Chirurgie viscérale et digestive"],
    bio: "Chef du Service de chirurgie viscérale et digestive du CHU de Nice. Sa fiche peut présenter le parcours hospitalo-universitaire, les responsabilités, les axes de recours et les publications majeures.",
    publications: ["Ajouter ici les publications sélectionnées.", "Ajouter ici les communications ou responsabilités scientifiques."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "damien-massalou",
    name: "Pr MASSALOU Damien",
    role: "Professeur des Universités - Praticien Hospitalier",
    group: "professeur",
    initials: "DM",
    photo: "assets/photos/damien-massalou.jpg",
    expertise: ["Paroi abdominale", "Hernie", "Éventration", "Chirurgie robotique", "Urgences chirurgicales"],
    bio: "Spécialisé dans la chirurgie de la paroi abdominale, les hernies, les éventrations, y compris par chirurgie robot-assistée, ainsi que les urgences chirurgicales.",
    publications: ["Ajouter ici les publications sur la chirurgie pariétale.", "Ajouter ici les publications sur la chirurgie d'urgence."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "imed-ben-amor",
    name: "Dr BEN AMOR Imed",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "IBA",
    photo: "assets/photos/imed-ben-amor.jpg",
    expertise: ["Chirurgie bariatrique", "Chirurgie de l'obésité"],
    bio: "Spécialisé en chirurgie bariatrique et dans la prise en charge chirurgicale de l'obésité.",
    publications: ["Ajouter ici les publications sur la chirurgie bariatrique."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "jean-louis-bernard",
    name: "Dr BERNARD Jean-Louis",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "JLB",
    photo: "assets/photos/jean-louis-bernard.jpg",
    expertise: ["Carcinose péritonéale", "CHIP"],
    bio: "Spécialisé dans la prise en charge de la carcinose péritonéale et la chimiothérapie hyperthermique intrapéritonéale.",
    publications: ["Ajouter ici les publications sur la carcinose péritonéale et la CHIP."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "serena-de-fatico",
    name: "Dr DE FATICO Serena",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "SDF",
    photo: "assets/photos/serena-de-fatico.jpg",
    expertise: ["Chirurgie bariatrique", "Chirurgie de l'obésité", "Paroi abdominale", "Hernie", "Éventration", "Chirurgie robotique"],
    bio: "Spécialisée en chirurgie bariatrique, chirurgie de l'obésité et chirurgie de la paroi abdominale, notamment hernies et éventrations, y compris par chirurgie robot-assistée.",
    publications: ["Ajouter ici les publications sur la chirurgie bariatrique.", "Ajouter ici les publications sur la chirurgie pariétale."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "guido-liddo",
    name: "Dr LIDDO Guido",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "GL",
    photo: "assets/photos/guido-liddo.jpg",
    expertise: ["Chirurgie hépato-biliaire"],
    bio: "Spécialisé en chirurgie hépato-biliaire.",
    publications: ["Ajouter ici les publications sur la chirurgie du foie et des voies biliaires."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "andrea-mabilia",
    name: "Dr MABILIA Andrea",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "AM",
    photo: "assets/photos/andrea-mabilia.jpg",
    expertise: ["Urgences chirurgicales"],
    bio: "Spécialisé dans les urgences chirurgicales.",
    publications: ["Ajouter ici les publications ou communications liées aux urgences chirurgicales."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "daniela-mariage",
    name: "Dr MARIAGE Daniela",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "DM",
    photo: "assets/photos/daniela-mariage.jpg",
    expertise: ["Chirurgie pancréatique", "Chirurgie oeso-gastrique", "Hernie hiatale"],
    bio: "Spécialisée en chirurgie pancréatique, chirurgie oeso-gastrique et chirurgie de la hernie hiatale.",
    publications: ["Ajouter ici les publications sur la chirurgie pancréatique.", "Ajouter ici les publications sur la chirurgie oeso-gastrique."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "clementine-mazoyer",
    name: "Dr MAZOYER Clémentine",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "CM",
    photo: "assets/photos/clementine-mazoyer.jpg",
    expertise: ["Endométriose", "Chirurgie de la surrénale", "Chirurgie du rectum", "Statique pelvienne", "Carcinose péritonéale", "CHIP"],
    bio: "Spécialisée dans l'endométriose, la chirurgie de la surrénale, la chirurgie du rectum, la statique pelvienne, ainsi que la carcinose péritonéale et la CHIP.",
    publications: ["Ajouter ici les publications sur l'endométriose.", "Ajouter ici les publications sur la chirurgie colorectale et pelvienne."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "mohammed-amine-rahili",
    name: "Dr RAHILI Mohammed Amine",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "MAR",
    photo: "assets/photos/mohammed-amine-rahili.jpg",
    expertise: ["Cancérologie digestive", "MICI", "Crohn", "RCH"],
    bio: "Spécialisé en cancérologie digestive et dans la prise en charge chirurgicale des maladies inflammatoires chroniques intestinales, dont Crohn et rectocolite hémorragique.",
    publications: ["Ajouter ici les publications sur la cancérologie digestive.", "Ajouter ici les publications sur les MICI."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "michel-rayar",
    name: "Dr RAYAR Michel",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "MR",
    photo: "assets/photos/michel-rayar.jpg",
    expertise: ["Chirurgie hépato-biliaire", "Transplantation hépatique"],
    bio: "Spécialisé en chirurgie hépato-biliaire et transplantation hépatique.",
    publications: ["Ajouter ici les publications sur la transplantation hépatique.", "Ajouter ici les publications sur la chirurgie hépato-biliaire."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "eric-sejor",
    name: "Dr SEJOR Eric",
    role: "Praticien Hospitalier",
    group: "ph",
    initials: "ES",
    photo: "assets/photos/eric-sejor.jpg",
    expertise: ["Chirurgie viscérale et digestive"],
    bio: "Praticien hospitalier du Service de chirurgie viscérale et digestive. Compléter cette fiche avec ses expertises principales, publications et modalités de rendez-vous.",
    publications: ["Ajouter ici les publications sélectionnées."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "andrea-chierici",
    name: "Dr CHIERICI Andrea",
    role: "Chef de clinique",
    group: "cca",
    initials: "AC",
    photo: "assets/photos/andrea-chierici.jpg",
    expertise: ["Chirurgie oeso-gastrique"],
    bio: "Chef de clinique spécialisé en chirurgie oeso-gastrique.",
    publications: ["Ajouter ici les publications ou communications."],
    doctolib: doctolibPlaceholder
  },
  {
    id: "sebastien-frey",
    name: "Dr FREY Sébastien",
    role: "Chef de clinique",
    group: "cca",
    initials: "SF",
    photo: "assets/photos/sebastien-frey.jpg",
    expertise: ["Chirurgie hépato-biliaire", "Transplantation hépatique"],
    bio: "Chef de clinique spécialisé en chirurgie hépato-biliaire et transplantation hépatique.",
    publications: ["Ajouter ici les publications ou communications."],
    doctolib: doctolibPlaceholder
  }
];

const expertises = [
  {
    title: "Chirurgie de la paroi abdominale",
    text: "Prise en charge des hernies, éventrations et pathologies complexes de la paroi, avec recours possible à la chirurgie mini-invasive et robot-assistée.",
    tags: ["Paroi abdominale", "Hernie", "Éventration", "Chirurgie robotique"]
  },
  {
    title: "Chirurgie bariatrique",
    text: "Parcours spécialisé pour la chirurgie de l'obésité, en coordination avec les équipes médicales, nutritionnelles et anesthésiques.",
    tags: ["Chirurgie bariatrique", "Chirurgie de l'obésité"]
  },
  {
    title: "Cancérologie digestive",
    text: "Prise en charge multidisciplinaire des cancers digestifs, avec discussion en réunion de concertation pluridisciplinaire et stratégie personnalisée.",
    tags: ["Cancérologie digestive", "Chirurgie du rectum", "Carcinose péritonéale"]
  },
  {
    title: "Carcinose péritonéale et CHIP",
    text: "Activité de recours pour la carcinose péritonéale et la chimiothérapie hyperthermique intrapéritonéale selon les indications spécialisées.",
    tags: ["Carcinose péritonéale", "CHIP"]
  },
  {
    title: "Chirurgie hépato-biliaire et transplantation",
    text: "Chirurgie du foie, des voies biliaires et activité de transplantation hépatique au sein d'un environnement hospitalo-universitaire.",
    tags: ["Chirurgie hépato-biliaire", "Transplantation hépatique"]
  },
  {
    title: "Chirurgie pancréatique et oeso-gastrique",
    text: "Expertise dédiée aux pathologies du pancréas, de l'oesophage et de l'estomac, incluant la prise en charge de la hernie hiatale.",
    tags: ["Chirurgie pancréatique", "Chirurgie oeso-gastrique", "Hernie hiatale"]
  },
  {
    title: "Endométriose, rectum et statique pelvienne",
    text: "Prise en charge chirurgicale de pathologies pelviennes complexes, en lien avec les spécialités concernées.",
    tags: ["Endométriose", "Chirurgie du rectum", "Statique pelvienne"]
  },
  {
    title: "MICI",
    text: "Chirurgie des maladies inflammatoires chroniques intestinales, dont la maladie de Crohn et la rectocolite hémorragique.",
    tags: ["MICI", "Crohn", "RCH"]
  },
  {
    title: "Urgences chirurgicales",
    text: "Organisation de la prise en charge des urgences viscérales et digestives au CHU, avec continuité des soins et expertise spécialisée.",
    tags: ["Urgences chirurgicales"]
  }
];

const news = [
  {
    date: "À compléter",
    title: "Nouvelle publication scientifique",
    text: "Ajouter ici le titre de la publication, la revue, les auteurs du service et un lien vers PubMed ou la revue."
  },
  {
    date: "À compléter",
    title: "Communication en congrès",
    text: "Ajouter ici les informations sur les congrès, communications orales, posters ou prix obtenus par l'équipe."
  },
  {
    date: "À compléter",
    title: "Information patient",
    text: "Ajouter ici les informations pratiques : nouveau parcours, consultation spécialisée, innovation opératoire ou organisation du service."
  }
];

const groupLabels = {
  professeur: "Professeurs",
  ph: "Praticiens hospitaliers",
  cca: "Chefs de clinique"
};

const surgeonList = document.querySelector("[data-surgeon-list]");
const expertiseList = document.querySelector("[data-expertise-list]");
const newsList = document.querySelector("[data-news-list]");
const modal = document.querySelector("[data-modal]");
const modalContent = document.querySelector("[data-modal-content]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

function renderExpertises() {
  expertiseList.innerHTML = expertises
    .map((expertise) => {
      const matchingSurgeons = surgeons.filter((surgeon) =>
        surgeon.expertise.some((item) => expertise.tags.includes(item))
      );
      const tags = matchingSurgeons
        .map((surgeon) => `<a class="tag" href="#${surgeon.id}" data-profile-link="${surgeon.id}">${surgeon.name}</a>`)
        .join("");

      return `
        <article class="expertise-card">
          <h3>${expertise.title}</h3>
          <p>${expertise.text}</p>
          <div class="expertise-tags">${tags}</div>
        </article>
      `;
    })
    .join("");
}

function surgeonCard(surgeon) {
  const style = `--photo-url: linear-gradient(135deg, rgba(19, 38, 59, 0.72), rgba(36, 134, 166, 0.56)), url('${surgeon.photo}')`;
  const contact = surgeon.contact || defaultSurgeonContact;
  return `
    <article class="person-card" id="${surgeon.id}" data-group="${surgeon.group}">
      <div class="person-photo" style="${style}" aria-hidden="true">${surgeon.initials}</div>
      <div class="person-body">
        <h3>${surgeon.name}</h3>
        <div class="person-role">${surgeon.role}</div>
        <p>${surgeon.expertise.slice(0, 4).join(", ")}</p>
        <div class="contact-preview">
          <strong>Contact secrétariat</strong><br />
          ${contact.secretariat} · ${contact.phone}
        </div>
        <div class="person-actions">
          <button class="mini-button" type="button" data-profile="${surgeon.id}">Fiche détaillée</button>
          <a class="mini-button" href="${surgeon.doctolib}" target="_blank" rel="noreferrer">Doctolib</a>
        </div>
      </div>
    </article>
  `;
}

function renderSurgeons(filter = "all") {
  const visible = filter === "all" ? surgeons : surgeons.filter((surgeon) => surgeon.group === filter);
  surgeonList.innerHTML = visible.map(surgeonCard).join("");
}

function renderNews() {
  newsList.innerHTML = news
    .map(
      (item) => `
        <article class="news-card">
          <time>${item.date}</time>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function openProfile(id) {
  const surgeon = surgeons.find((item) => item.id === id);
  if (!surgeon) return;

  const style = `--photo-url: linear-gradient(135deg, rgba(19, 38, 59, 0.72), rgba(36, 134, 166, 0.56)), url('${surgeon.photo}')`;
  const contact = surgeon.contact || defaultSurgeonContact;
  modalContent.innerHTML = `
    <div class="profile-detail">
      <div class="person-photo" style="${style}" aria-hidden="true">${surgeon.initials}</div>
      <div>
        <p class="eyebrow">${groupLabels[surgeon.group]}</p>
        <h2 id="modal-title">${surgeon.name}</h2>
        <p class="person-role">${surgeon.role}</p>
        <p>${surgeon.bio}</p>
        <h3>Expertises</h3>
        <ul class="detail-list">
          ${surgeon.expertise.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="contact-box">
          <h3>Coordonnées du secrétariat</h3>
          <dl>
            <div><dt>Secrétariat</dt><dd>${contact.secretariat}</dd></div>
            <div><dt>Unité</dt><dd>${contact.unit}</dd></div>
            <div><dt>Téléphone</dt><dd>${contact.phone}</dd></div>
            <div><dt>Email</dt><dd>${contact.email}</dd></div>
          </dl>
        </div>
        <h3>Publications</h3>
        <ul class="detail-list">
          ${surgeon.publications.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="person-actions">
          <a class="button primary" href="${surgeon.doctolib}" target="_blank" rel="noreferrer">Prendre rendez-vous sur Doctolib</a>
          <a class="button secondary" href="${chuWebsite}" target="_blank" rel="noreferrer">Site du CHU de Nice</a>
          <a class="button secondary" href="#actualites" data-modal-close>Voir les actualités</a>
        </div>
      </div>
    </div>
  `;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeProfile() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.addEventListener("click", (event) => {
  const profileButton = event.target.closest("[data-profile], [data-profile-link]");
  if (profileButton) {
    event.preventDefault();
    openProfile(profileButton.dataset.profile || profileButton.dataset.profileLink);
  }

  if (event.target.closest("[data-modal-close]")) {
    closeProfile();
  }
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderSurgeons(button.dataset.filter);
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeProfile();
  }
});

renderExpertises();
renderSurgeons();
renderNews();
