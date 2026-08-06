const pathPrefix = location.pathname.includes('/pages/') ? '../' : '';
const $ = (selector, context = document) => context.querySelector(selector);

async function loadJSON(name) {
  const response = await fetch(`${pathPrefix}data/${name}.json`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Impossible de charger data/${name}.json (${response.status})`);
  }
  return response.json();
}

function showLoadError(element, message) {
  if (!element) return;
  if (!element.children.length) {
    element.innerHTML = `<div class="card"><p>${message}</p></div>`;
  }
}

function iconInitials(name) {
  return String(name || '')
    .replace(/^(Pr|Dr)\s+/, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('');
}

function imgOrInitials(item) {
  const initials = iconInitials(item.nom);
  const source = item.photo ? `${pathPrefix}${item.photo}` : '';

  if (!source) {
    return `<div class="avatar missing" aria-hidden="true">${initials}</div>`;
  }

  return `<img class="avatar"
    src="${source}"
    alt="Portrait de ${item.nom}"
    onerror="this.outerHTML='<div class=&quot;avatar missing&quot; aria-hidden=&quot;true&quot;>${initials}</div>'">`;
}

function telHref(number) {
  return `tel:${String(number || '').replace(/[^0-9+]/g, '')}`;
}

function personCard(person) {
  const secretariat = person.telephone
    ? `<p class="small"><strong>Secrétariat :</strong>
         <a href="${telHref(person.telephone)}">${person.telephone}</a>
       </p>`
    : '';

  const status = person.statut && person.statut.texte
    ? `<p class="trial-status">${person.statut.texte}</p>`
    : '';

  const actions = [
    person.doctolib
      ? `<a class="btn primary" href="${person.doctolib}" target="_blank" rel="noopener">Fiche Doctolib</a>`
      : '',
    person.pubmed
      ? `<a class="btn secondary" href="${person.pubmed}" target="_blank" rel="noopener">Publications PubMed</a>`
      : ''
  ].filter(Boolean).join('');

  return `<article class="card person-card" id="${person.id}">
    ${imgOrInitials(person)}
    <div>
      <h3>${person.nom}</h3>
      <p class="small"><strong>${person.fonction}</strong></p>
      ${status}
      <div class="tags">
        ${(person.expertises || []).map(expertise => `<span class="tag">${expertise}</span>`).join('')}
      </div>
      <p>${person.activites || ''}</p>
      ${secretariat}
      <details>
        <summary>Enseignement et recherche</summary>
        <p><strong>Enseignement.</strong> ${person.enseignement || ''}</p>
        <p><strong>Recherche.</strong> ${person.recherche || ''}</p>
      </details>
      <div class="person-actions">${actions}</div>
    </div>
  </article>`;
}

function newsCard(news) {
  const date = new Date(`${news.date}T12:00:00`);
  const formattedDate = Number.isNaN(date.getTime())
    ? news.date
    : date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

  const image = news.image
    ? `<img class="news-image"
        src="${pathPrefix}assets/actualites/${news.image}"
        alt="${news.titre}"
        onerror="this.remove()">`
    : '';

  const link = news.lien
    ? `<a class="btn secondary" href="${news.lien}" target="_blank" rel="noopener">Lire</a>`
    : '';

  const details = news.texte
    ? `<details><summary>Lire la suite</summary><p>${news.texte}</p></details>`
    : '';

  return `<article class="card news-card">
    ${image}
    <time datetime="${news.date || ''}">${formattedDate}</time>
    <div class="tag">${news.categorie || 'Actualité'}</div>
    <h3>${news.titre}</h3>
    <p>${news.resume || ''}</p>
    ${details}
    ${link}
  </article>`;
}

function emergencyTrialCard(trial) {
  return `<article class="card">
    <span class="trial-status">${trial.statut || 'Recrutement ouvert'}</span>
    <h3>${trial.acronyme}</h3>
    <p><strong>${trial.pathologie}</strong></p>
    <p>${trial.description || ''}</p>
  </article>`;
}

function scheduledTrialCard(trial) {
  return `<article class="card">
    <span class="trial-status">${trial.statut || 'Recrutement ouvert'}</span>
    <h3>${trial.acronyme}</h3>
    <p>${trial.objet || ''}</p>
    <p class="small">
      <strong>Promoteur :</strong> ${trial.promoteur || ''}<br>
      <strong>Investigateur local :</strong> ${trial.investigateur || ''}
    </p>
  </article>`;
}

function contactUnit(unit) {
  const address = (unit.adresse || []).map(line => `<div>${line}</div>`).join('');
  const details = (unit.details || []).map(detail => {
    const value = detail.email
      ? `<a href="mailto:${detail.value}">${detail.value}</a>`
      : detail.value;

    return `<div class="contact-line">
      <strong>${detail.label}</strong>
      <span>${value}</span>
    </div>`;
  }).join('');

  return `<article class="card contact-unit">
    <p class="tag">${unit.type}</p>
    <h3>${unit.nom}</h3>
    <div class="small">${address}</div>
    <div style="margin-top:.9rem">${details}</div>
  </article>`;
}

function initialiseMenu() {
  const menuButton = $('.menu-toggle');
  const navigation = $('.nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      navigation.classList.toggle('open');
    });
  }
}

async function renderPeople() {
  const fullList = $('[data-render="chirurgiens"]');
  const preview = $('[data-render="chirurgiens-preview"]');

  if (!fullList && !preview) return;

  try {
    const people = await loadJSON('chirurgiens');
    const sorted = [...people].sort(
      (a, b) => (a.ordre_affichage || 999) - (b.ordre_affichage || 999)
    );

    if (fullList) fullList.innerHTML = sorted.map(personCard).join('');
    if (preview) preview.innerHTML = sorted.slice(0, 6).map(personCard).join('');
  } catch (error) {
    console.error(error);
    showLoadError(fullList, "Les fiches de l'équipe n'ont pas pu être chargées.");
    showLoadError(preview, "Les fiches de l'équipe n'ont pas pu être chargées.");
  }
}

async function renderNews() {
  const fullList = $('[data-render="actualites"]');
  const preview = $('[data-render="actualites-preview"]');

  if (!fullList && !preview) return;

  try {
    const news = await loadJSON('actualites');
    const sorted = [...news].sort(
      (a, b) => String(b.date).localeCompare(String(a.date))
    );

    if (fullList) fullList.innerHTML = sorted.map(newsCard).join('');
    if (preview) preview.innerHTML = sorted.slice(0, 3).map(newsCard).join('');
  } catch (error) {
    console.error(error);
    showLoadError(fullList, "Les actualités n'ont pas pu être chargées.");
    showLoadError(preview, "Les actualités n'ont pas pu être chargées.");
  }
}

async function renderTrials() {
  const emergency = $('[data-render="essais-urgence"]');
  const scheduled = $('[data-render="essais-programmees"]');
  const databases = $('[data-render="bases-donnees"]');
  const introduction = $('[data-render="essais-introduction"]');
  const regulatory = $('[data-render="mention-reglementaire"]');

  if (!emergency && !scheduled && !databases && !introduction && !regulatory) {
    return;
  }

  try {
    const data = await loadJSON('essais-cliniques');

    if (introduction && data.introduction) {
      introduction.textContent = data.introduction;
    }

    if (emergency && Array.isArray(data.etudes_urgence)) {
      emergency.innerHTML = data.etudes_urgence.map(emergencyTrialCard).join('');
    }

    if (scheduled && Array.isArray(data.etudes_programmees)) {
      scheduled.innerHTML = data.etudes_programmees.map(scheduledTrialCard).join('');
    }

    if (databases && Array.isArray(data.bases_donnees)) {
      databases.innerHTML = data.bases_donnees.map(database => `
        <article class="card">
          <h3>${database}</h3>
          <p class="small">Base de données clinique du service.</p>
        </article>
      `).join('');
    }

    if (regulatory && data.mention_reglementaire) {
      regulatory.innerHTML = `<p>${data.mention_reglementaire}</p>`;
    }
  } catch (error) {
    /*
     * La page essais.html contient un contenu HTML de secours complet.
     * En cas d'échec du JSON, ce contenu reste visible.
     */
    console.error(error);
  }
}

async function renderContact() {
  const contact = $('[data-render="contact"]');
  if (!contact) return;

  try {
    const data = await loadJSON('contact');
    contact.innerHTML = `
      <div class="grid two">${data.unites.map(contactUnit).join('')}</div>
      <div class="card" style="margin-top:1.25rem">
        <h3>Horaires de visite</h3>
        <p>${data.visites}</p>
      </div>
    `;
  } catch (error) {
    console.error(error);
    showLoadError(contact, "Les coordonnées du service n'ont pas pu être chargées.");
  }
}

async function initialiseSite() {
  initialiseMenu();

  await Promise.all([
    renderPeople(),
    renderNews(),
    renderTrials(),
    renderContact()
  ]);
}

initialiseSite();
