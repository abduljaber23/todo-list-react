Consulter le site [ici](https://your-site-url.com).

# Les étapes

1. **Installation des dépendances**

   ```bash
   npm install
   ```

2. **Démarrage du serveur de développement**
   ```bash
   npm run dev
   ```

# Les bibliothèques utilisées

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) `npm create vite@latest`
- [Tailwind CSS](https://tailwindcss.com/) `npm install tailwindcss @tailwindcss/vite`
- [DaisyUI](https://daisyui.com/) `npm i -D daisyui@latest`
- [Lucide](https://lucide.dev/) `npm install lucide-react`

# Configuration

1. **Configuration de Tailwind CSS**
   Dans le fichier `tailwind.config.js` :
   ```javascript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   // Importation de Tailwind CSS
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   });

``

2. **Ajout de Tailwind CSS et DaisyUI**
Dans le fichier `src/index.css`, ajoutez les lignes suivantes :
```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: night;
};

```
# Les fonctionnalités 
1. Ajouter une tâche
2. Marquer une tâche comme terminée
3. Supprimer une tâche
4. Modifier une tâche
5. Changer de thème
6. Sauvegarder les tâches dans le `localStorage` + le thème sélectionné



# Ce que j'ai appris
1. J'ai appris à configurer un projet React avec Vite.
2. J'ai appris à utiliser Tailwind CSS pour le style.
3. J'ai appris à intégrer DaisyUI pour des composants pré-stylés.
4. J'ai appris à utiliser Lucide pour des icônes dans mon application.
5. J'ai appris à utiliser le hook `useState` pour gérer l'état dans mes composants -> j'ai compris comment il permet de créer des composants réactifs, je l'ai utilisé pour gérer l'état de ma liste de tâches.
