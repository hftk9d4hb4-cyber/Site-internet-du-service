# Site du Service de chirurgie viscérale et digestive du CHU de Nice

Ce dossier contient une première version statique du site :

- `index.html` : structure de la page
- `styles.css` : design premium sobre et responsive
- `script.js` : données des chirurgiens, expertises, actualités et fiches détaillées

## Modifier les liens Doctolib

Ouvrir `script.js`, puis remplacer :

```js
const doctolibPlaceholder = "https://www.doctolib.fr/";
```

Ou, pour chaque chirurgien, remplacer la valeur `doctolib` par son lien personnel :

```js
doctolib: "https://www.doctolib.fr/chirurgien-digestif/..."
```

## Modifier le lien vers le CHU

Le lien du site officiel est déjà prévu :

```js
const chuWebsite = "https://www.chu-nice.fr/";
```

Il est utilisé dans les fiches détaillées et dans le site.

## Ajouter les coordonnées par chirurgien

Dans `script.js`, ajouter un bloc `contact` dans la fiche du chirurgien concerné :

```js
contact: {
  secretariat: "Secrétariat de consultation",
  unit: "Aile A3",
  phone: "04 92 03 .. ..",
  email: "adresse@chu-nice.fr"
},
```

Si le bloc n'est pas encore renseigné, le site affiche automatiquement un emplacement "à compléter".

## Modifier les unités d'hospitalisation

Les coordonnées des unités sont dans `index.html`, dans la section `infos-pratiques`.

Unités déjà prévues :

- Hospitalisation complète Aile A3
- Hospitalisation complète Aile D3
- Chirurgie ambulatoire Aile A3
- Chirurgie générale d'urgence CGU, Hôpital Pasteur 2

## Ajouter les photos

Les deux logos fournis sont déjà intégrés :

```text
assets/logo-chu-nice.jpg
assets/logo-service-chirurgie-digestive.jpg
```

Créer le dossier :

```text
assets/photos
```

Puis ajouter les images avec les noms déjà prévus dans `script.js`, par exemple :

```text
assets/photos/patrick-baque.jpg
assets/photos/damien-massalou.jpg
assets/photos/imed-ben-amor.jpg
```

Une photo d'équipe peut être ajoutée ici :

```text
assets/equipe-service.jpg
```

La photo d'équipe fournie est déjà intégrée à cet emplacement et utilisée dans le haut de page.

Si une photo manque, le site affiche les initiales du praticien.

## Modifier les publications et actualités

Dans `script.js`, modifier :

- `publications` dans chaque fiche chirurgien
- `news` pour le fil d'actualités

## Publier sur GitHub Pages

1. Créer un nouveau dépôt GitHub.
2. Déposer les fichiers `index.html`, `styles.css`, `script.js` et le dossier `assets`.
3. Dans GitHub, aller dans `Settings > Pages`.
4. Choisir la branche principale et le dossier racine.
5. GitHub donnera une adresse publique du site.

## Intégrer dans WordPress

Le plus simple est de confier ces fichiers à la personne qui administre le site WordPress du CHU. Le contenu peut être repris en blocs WordPress, ou intégré dans une page avec un bloc HTML personnalisé si le thème l'autorise.
