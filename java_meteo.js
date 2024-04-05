const communeSelect = document.getElementById("city");

function Recup_Villes(){
    let saisie = document.getElementById("postalCode").value;
    return saisie
    }

data.forEach((commune) => {
        const option = document.createElement("comms");
        comms.value = commune.code;
        comms.textContent = commune.nom;

fetch('https://geo.api.gouv.fr/communes?codePostal=${saisie}')
