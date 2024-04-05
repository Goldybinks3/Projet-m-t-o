const communeSelect = document.getElementById("city");

function Recup_Villes(){
    let saisie = document.getElementById("postalCode").value;
    return saisie
    }

const response = await fetch(
    `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`
);

function displayCommunes(data) {
    data.forEach((commune) => {
            const option = document.createElement("option");
            option.value = commune.code;
            option.textContent = commune.nom;
    });
}

const data = await fetchCommunesByCodePostal(codePostal);
displayCommunes(data);

fetch('https://geo.api.gouv.fr/communes?codePostal=${saisie}')
