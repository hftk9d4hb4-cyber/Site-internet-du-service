# Site internet – Service de chirurgie viscérale et digestive du CHU de Nice – Version 2

## Mise en ligne sur GitHub Pages

1. Décompresser le fichier ZIP.
2. Dans le dépôt GitHub, rester sur la branche `main`.
3. Utiliser `Add file` puis `Upload files`.
4. Envoyer les fichiers et dossiers de cette version 2.
5. Choisir `Commit directly to the main branch`.
6. Attendre 1 à 2 minutes puis recharger le site.

## Actualités facilement administrables

Modifier le fichier :

```text
data/actualites.json
```

Chaque actualité suit ce format :

```json
{
  "date": "2026-06-28",
  "categorie": "Recherche",
  "titre": "Titre de l’actualité",
  "resume": "Résumé court affiché sur le site.",
  "lien": "https://..."
}
```

Si vous n’avez pas de lien, laisser `"lien": "#"`.

## Fiches chirurgiens, Doctolib et PubMed

Modifier le fichier :

```text
data/chirurgiens.json
```

Chaque fiche contient : nom, rôle, expertises, lien Doctolib, lien PubMed, publications mises en avant.

Pour ajouter une publication mise en avant :

```json
"selectedPublications": [
  "Auteur. Titre. Revue. Année. PMID: ..."
]
```

## Images attendues

- `logo-service-chirurgie-digestive.jpg` à la racine.
- `equipe-service.jpg` à la racine.
- portraits facultatifs dans `assets/photos/` avec les noms indiqués dans `data/chirurgiens.json`.

Si un portrait manque, le site affiche automatiquement les initiales.
