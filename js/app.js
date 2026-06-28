const root = document.documentElement;
const pathPrefix = location.pathname.includes('/pages/') ? '../' : '';
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

async function loadJSON(name){
  const res = await fetch(`${pathPrefix}data/${name}.json`, {cache:'no-store'});
  if(!res.ok) throw new Error(`Impossible de charger ${name}.json`);
  return res.json();
}
function iconInitials(name){
  return name.replace(/^(Pr|Dr)\s+/,'').split(/\s+/).slice(0,2).map(x=>x[0]).join('');
}
function imgOrInitials(item){
  const src = item.photo ? `${pathPrefix}${item.photo}` : '';
  if(!src) return `<div class="avatar missing">${iconInitials(item.nom)}</div>`;
  return `<img class="avatar" src="${src}" alt="Portrait de ${item.nom}" onerror="this.outerHTML='<div class=&quot;avatar missing&quot;>${iconInitials(item.nom)}</div>'">`;
}
function personCard(c){
  return `<article class="card person-card" id="${c.id}">
    ${imgOrInitials(c)}
    <div><h3>${c.nom}</h3><p class="small"><strong>${c.fonction}</strong></p>
    <div class="tags">${(c.expertises||[]).map(e=>`<span class="tag">${e}</span>`).join('')}</div>
    <p>${c.activites||''}</p>
    <details><summary>Enseignement et recherche</summary><p><strong>Enseignement.</strong> ${c.enseignement||''}</p><p><strong>Recherche.</strong> ${c.recherche||''}</p></details>
    <div class="person-actions"><a class="btn primary" href="${c.doctolib}" target="_blank" rel="noopener">Fiche Doctolib</a><a class="btn secondary" href="${c.pubmed}" target="_blank" rel="noopener">Publications PubMed</a></div>
    </div></article>`;
}
function newsCard(n){
  const date = new Date(n.date + 'T12:00:00');
  const d = isNaN(date) ? n.date : date.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
  const link = n.lien ? `<a class="btn secondary" href="${n.lien}" target="_blank" rel="noopener">Lire</a>` : '';
  return `<article class="card news-card"><time>${d}</time><div class="tag">${n.categorie||'Actualité'}</div><h3>${n.titre}</h3><p>${n.resume}</p>${link}</article>`;
}
function trialCard(t){
  return `<article class="card"><span class="trial-status">${t.statut||'À compléter'}</span><h3>${t.acronyme||''} — ${t.titre}</h3><p>${t.resume||''}</p><p class="small"><strong>Promoteur :</strong> ${t.promoteur||'À compléter'}<br><strong>Investigateur :</strong> ${t.investigateur||'À compléter'}<br><strong>Critères :</strong> ${t.criteres||'À compléter'}<br><strong>Contact :</strong> <a href="mailto:${t.contact}">${t.contact||''}</a></p></article>`;
}
function contactUnit(u){
  const addr = (u.adresse||[]).map(a=>`<div>${a}</div>`).join('');
  const details = (u.details||[]).map(d=>`<div class="contact-line"><strong>${d.label}</strong><span>${d.email?`<a href="mailto:${d.value}">${d.value}</a>`:d.value}</span></div>`).join('');
  return `<article class="card contact-unit"><p class="tag">${u.type}</p><h3>${u.nom}</h3><div class="small">${addr}</div><div style="margin-top:.9rem">${details}</div></article>`;
}
async function hydrate(){
  const menu = $('.menu-toggle');
  if(menu) menu.addEventListener('click',()=>$('.nav').classList.toggle('open'));
  const peopleEl = $('[data-render="chirurgiens"]');
  const peoplePreviewEl = $('[data-render="chirurgiens-preview"]');
  if(peopleEl || peoplePreviewEl){
    const people = await loadJSON('chirurgiens');
    if(peopleEl) peopleEl.innerHTML = people.map(personCard).join('');
    if(peoplePreviewEl) peoplePreviewEl.innerHTML = people.slice(0,6).map(personCard).join('');
  }
  const newsEl = $('[data-render="actualites"]');
  const newsPreviewEl = $('[data-render="actualites-preview"]');
  if(newsEl || newsPreviewEl){
    const news = await loadJSON('actualites');
    const sorted = news.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    if(newsEl) newsEl.innerHTML = sorted.map(newsCard).join('');
    if(newsPreviewEl) newsPreviewEl.innerHTML = sorted.slice(0,3).map(newsCard).join('');
  }
  const trialsEl = $('[data-render="essais"]');
  if(trialsEl){ const trials = await loadJSON('essais-cliniques'); trialsEl.innerHTML = trials.map(trialCard).join(''); }
  const contactEl = $('[data-render="contact"]');
  if(contactEl){
    const c = await loadJSON('contact');
    contactEl.innerHTML = `<div class="grid two">${c.unites.map(contactUnit).join('')}</div><div class="card" style="margin-top:1.25rem"><h3>Horaires de visite</h3><p>${c.visites}</p></div>`;
  }
}
hydrate().catch(err=>{console.error(err); const el=$('[data-render]'); if(el) el.innerHTML='<div class="card">Le contenu n’a pas pu être chargé. Vérifier les fichiers JSON dans le dossier data.</div>';});
