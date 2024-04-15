document.addEventListener("DOMContentLoaded", async function() { // Attend que la page html soit chargé
    const codepostal = document.getElementById("postalCode"); // Récupère l'élément du code postal
    const communeSelect = document.getElementById("city"); // Récupère l'élément de la liste déroulante des communes

    codepostal.addEventListener("input", async function() { // Ajoute un écouteur d'événements pour le champ de saisie du code postal
        const code = codepostal.value; // Récupère la valeur du champ de saisie du code postal
        if (code.length >= 5) { // Vérifie si au moins 5 caractères sont entrés dans le code postal
            const donnees = await Code(code); // Récupère les données des communes pour le code postal donné
            commune(donnees); // Remplit la liste déroulante des communes avec les données récupérées
        }
    });

    async function Code(codePostal) {
        const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`); // Envoie une requête pour obtenir les communes correspondant au code postal
        const data = await response.json(); // Récupère les données de la réponse au format JSON
        return data; // Renvoie les données
    }

    function commune(communes) {
        communeSelect.innerHTML = ""; // Réinitialise les options de la liste déroulante des communes
        communes.forEach((commune) => { // Parcourt toutes les communes
            const option = document.createElement("option"); // Crée un nouvel élément d'option
            option.value = commune.nom; // Définit la valeur de l'option sur le nom de la commune
            option.textContent = commune.nom; // Définit le texte de l'option sur le nom de la commune
            communeSelect.appendChild(option); // Ajoute l'option à la liste déroulante des communes
        });
    }
});



