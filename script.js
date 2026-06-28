const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

async function getJson(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Impossible de charger ${path}`);
  return response.json();
}

function avatar(person) {
  const photo = person.photo || '';
  return `<div class="avatar">${photo ? `<img src="${escapeHtml(photo)}" alt="Portrait de ${escapeHtml(person.name)}" onerror="this.remove(); this.parentElement.textContent='${escapeHtml(person.initials || '')}'">` : escapeHtml(person.initials || '')}</div>`;
}

function renderTeam(people) {
  const grid = $('#team-grid');
  grid.innerHTML = people.map(person => `
    <article class="team-card">
      ${avatar(person)}
      <h3>${escapeHtml(person.name)}</h3>
      <p class="role">${escapeHtml(person.role)}</p>
      <p>${escapeHtml(person.bio || '')}</p>
      <div class="tags">${(person.expertise || []).slice(0,5).map(item => `<span class="tag">${escapeHtml(item)}</span>`).join('')}</div>
      <div class="card-actions">
        <a class="btn btn-primary" href="${escapeHtml(person.doctolib)}" target="_blank" rel="noopener">Fiche Doctolib</a>
        <a class="btn btn-secondary" href="${escapeHtml(person.pubmed)}" target="_blank" rel="noopener">PubMed</a>
        <button class="btn btn-secondary" type="button" data-profile="${escapeHtml(person.id)}">Voir la fiche</button>
      </div>
    </article>
  `).join('');

  const dialog = $('#profile-dialog');
  const content = $('#profile-content');
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-profile]');
    if (!button) return;
    const person = people.find(item => item.id === button.dataset.profile);
    if (!person) return;
    const selected = person.selectedPublications || [];
    content.innerHTML = `
      <div class="profile-inner">
        <div class="profile-top">
          ${avatar(person)}
          <div>
            <p class="eyebrow">Fiche praticien</p>
            <h2>${escapeHtml(person.name)}</h2>
            <p class="role">${escapeHtml(person.role)}</p>
          </div>
        </div>
        <p>${escapeHtml(person.bio || '')}</p>
        <div class="profile-sections">
          <div><h3>Domaines d’expertise</h3><ul>${(person.expertise || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
          <div><h3>Recherche et publications</h3><p>Accès direct aux publications indexées dans PubMed.</p></div>
        </div>
        ${selected.length ? `<h3>Publications mises en avant</h3><ul>${selected.map(pub => `<li>${escapeHtml(pub)}</li>`).join('')}</ul>` : ''}
        <div class="hero-actions">
          <a class="btn btn-primary" href="${escapeHtml(person.doctolib)}" target="_blank" rel="noopener">Fiche Doctolib</a>
          <a class="btn btn-secondary" href="${escapeHtml(person.pubmed)}" target="_blank" rel="noopener">Voir les publications PubMed</a>
        </div>
      </div>
    `;
    dialog.showModal();
  });
  $('.dialog-close').addEventListener('click', () => dialog.close());
}

function renderNews(news) {
  const grid = $('#news-grid');
  grid.innerHTML = news.map(item => `
    <article class="news-card">
      <time datetime="${escapeHtml(item.date)}">${escapeHtml(item.date)}</time>
      <h3>${escapeHtml(item.titre || item.title || '')}</h3>
      <p><strong>${escapeHtml(item.categorie || '')}</strong></p>
      <p>${escapeHtml(item.resume || '')}</p>
      ${item.lien && item.lien !== '#' ? `<a class="btn btn-secondary" href="${escapeHtml(item.lien)}" target="_blank" rel="noopener">En savoir plus</a>` : ''}
    </article>
  `).join('');
}

function renderTrials(trials) {
  const grid = $('#trial-grid');
  grid.innerHTML = trials.map(trial => `
    <article class="trial-card card">
      <p class="trial-status">${escapeHtml(trial.statut || '')}</p>
      <h3>${escapeHtml(trial.titre || '')}</h3>
      <p><strong>${escapeHtml(trial.acronyme || '')}</strong> ${trial.theme ? '– ' + escapeHtml(trial.theme) : ''}</p>
      <p>${escapeHtml(trial.resume || '')}</p>
      <p><strong>Promoteur :</strong> ${escapeHtml(trial.promoteur || '')}</p>
      <p><strong>Investigateur :</strong> ${escapeHtml(trial.investigateur || '')}</p>
      ${trial.inclusions ? `<p><strong>Inclusions :</strong> ${escapeHtml(trial.inclusions)}</p>` : ''}
      ${trial.contact ? `<p><strong>Contact :</strong> <a href="mailto:${escapeHtml(trial.contact)}">${escapeHtml(trial.contact)}</a></p>` : ''}
      ${trial.lien ? `<a class="btn btn-secondary" href="${escapeHtml(trial.lien)}" target="_blank" rel="noopener">Détails</a>` : ''}
    </article>
  `).join('');
}

async function init() {
  const menuToggle = $('.menu-toggle');
  const menu = $('#menu');
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  $$('#menu a').forEach(link => link.addEventListener('click', () => menu.classList.remove('open')));

  try {
    const [people, news, trials] = await Promise.all([
      getJson('data/chirurgiens.json'),
      getJson('data/actualites.json'),
      getJson('data/essais-cliniques.json')
    ]);
    renderTeam(people);
    renderNews(news);
    renderTrials(trials);
  } catch (error) {
    console.error(error);
  }
}

init();
