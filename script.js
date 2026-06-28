const groupLabels = { professeur: "Professeurs", ph: "Praticiens hospitaliers", cca: "Chefs de clinique" };
const expertiseDefinitions = [
  { title: "Chirurgie de la paroi abdominale", text: "Hernies, éventrations et pathologies complexes de la paroi, avec recours possible à la chirurgie mini-invasive et robot-assistée.", tags: ["Paroi abdominale", "Hernie", "Éventration", "Chirurgie robotique"] },
  { title: "Chirurgie bariatrique", text: "Parcours spécialisé pour la chirurgie de l’obésité, en coordination avec les équipes médicales, nutritionnelles et anesthésiques.", tags: ["Chirurgie bariatrique", "Chirurgie de l’obésité"] },
  { title: "Cancérologie digestive", text: "Prise en charge multidisciplinaire des cancers digestifs avec stratégie personnalisée en réunion de concertation pluridisciplinaire.", tags: ["Cancérologie digestive", "Chirurgie du rectum", "Carcinose péritonéale"] },
  { title: "Carcinose péritonéale et CHIP", text: "Activité de recours pour la carcinose péritonéale et la chimiothérapie hyperthermique intrapéritonéale.", tags: ["Carcinose péritonéale", "CHIP"] },
  { title: "Chirurgie hépato-biliaire et transplantation", text: "Chirurgie du foie, des voies biliaires et activité de transplantation hépatique.", tags: ["Chirurgie hépato-biliaire", "Transplantation hépatique"] },
  { title: "Chirurgie pancréatique et œso-gastrique", text: "Pathologies du pancréas, de l’œsophage et de l’estomac, incluant la hernie hiatale.", tags: ["Chirurgie pancréatique", "Chirurgie œso-gastrique", "Hernie hiatale"] },
  { title: "Endométriose, rectum et statique pelvienne", text: "Prise en charge chirurgicale de pathologies pelviennes complexes en lien avec les spécialités concernées.", tags: ["Endométriose", "Chirurgie du rectum", "Statique pelvienne"] },
  { title: "MICI", text: "Chirurgie de la maladie de Crohn et de la rectocolite hémorragique.", tags: ["MICI", "Maladie de Crohn", "Rectocolite hémorragique"] },
  { title: "Urgences chirurgicales", text: "Organisation de la prise en charge des urgences viscérales et digestives au CHU.", tags: ["Urgences chirurgicales"] }
];
let surgeons = [];
function el(selector){return document.querySelector(selector)}
function safeLink(url){return url && url !== "#" ? url : "#"}
function avatar(surgeon){return `<div class="avatar"><img src="${surgeon.photo}" alt="Portrait de ${surgeon.name}" onerror="this.remove(); this.parentElement.textContent='${surgeon.initials}'"></div>`}
function renderExpertises(){
  const target = el('[data-expertises]');
  target.innerHTML = expertiseDefinitions.map(expertise => {
    const refs = surgeons.filter(s => s.expertise.some(item => expertise.tags.includes(item))).slice(0,4).map(s => `<span class="chip">${s.name}</span>`).join('');
    return `<article class="card"><h3>${expertise.title}</h3><p>${expertise.text}</p><div class="chips">${refs}</div></article>`
  }).join('');
}
function surgeonCard(s){
  return `<article class="surgeon-card" data-group="${s.group}">${avatar(s)}<div><h3>${s.name}</h3><p class="surgeon-meta">${s.role}</p><p>${s.expertise.slice(0,4).join(' · ')}</p></div><div class="surgeon-actions"><button class="small-button primary" data-profile="${s.id}">Voir la fiche</button><a class="small-button" href="${safeLink(s.doctolib)}" target="_blank" rel="noopener">Doctolib</a><a class="small-button" href="${safeLink(s.pubmed)}" target="_blank" rel="noopener">PubMed</a></div></article>`
}
function renderSurgeons(filter='all'){
  el('[data-surgeons]').innerHTML = surgeons.filter(s => filter==='all' || s.group===filter).map(surgeonCard).join('');
}
function renderNews(news){
  el('[data-news]').innerHTML = news.map(item => `<article class="news-card"><time datetime="${item.date}">${item.date}</time><p class="eyebrow">${item.categorie || 'Actualité'}</p><h3>${item.titre}</h3><p>${item.resume}</p>${item.lien && item.lien !== '#' ? `<a class="text-link" href="${item.lien}" target="_blank" rel="noopener">Lire la suite</a>` : ''}</article>`).join('');
}
function openProfile(id){
  const s = surgeons.find(x => x.id === id); if(!s) return;
  const pubs = (s.selectedPublications && s.selectedPublications.length) ? s.selectedPublications.map(p => `<li>${p}</li>`).join('') : '<li>Ajouter ici les publications sélectionnées dans <code>data/chirurgiens.json</code>.</li>';
  el('[data-modal-content]').innerHTML = `<div class="modal-inner"><div class="modal-head">${avatar(s)}<div><p class="eyebrow">${groupLabels[s.group] || ''}</p><h2>${s.name}</h2><p class="surgeon-meta">${s.role}</p></div></div><div class="modal-grid"><div><h3>Profil</h3><p>${s.bio}</p><h3>Expertises</h3><div class="chips">${s.expertise.map(e=>`<span class="chip">${e}</span>`).join('')}</div></div><div><h3>Rendez-vous et publications</h3><p><a class="button primary" href="${safeLink(s.doctolib)}" target="_blank" rel="noopener">Prendre rendez-vous sur Doctolib</a></p><p><a class="button" href="${safeLink(s.pubmed)}" target="_blank" rel="noopener">Voir les publications PubMed</a></p><h3>Publications mises en avant</h3><ul class="pub-list">${pubs}</ul><p class="admin-note">Pour personnaliser cette fiche : modifier l’entrée correspondante dans <code>data/chirurgiens.json</code>.</p></div></div></div>`;
  el('[data-modal]').showModal();
}
async function loadJson(path, fallback){try{const r=await fetch(path,{cache:'no-store'}); if(!r.ok) throw new Error(path); return await r.json()}catch(e){console.warn(e); return fallback}}
document.addEventListener('click', ev => {
  const p = ev.target.closest('[data-profile]'); if(p) openProfile(p.dataset.profile);
  if(ev.target.closest('[data-close]')) el('[data-modal]').close();
});
document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderSurgeons(btn.dataset.filter)}));
el('[data-menu-toggle]').addEventListener('click',()=> el('[data-main-nav]').classList.toggle('open'));
el('[data-main-nav]').addEventListener('click',()=> el('[data-main-nav]').classList.remove('open'));
(async function init(){
  surgeons = await loadJson('data/chirurgiens.json', []);
  const news = await loadJson('data/actualites.json', []);
  renderExpertises(); renderSurgeons(); renderNews(news);
})();
