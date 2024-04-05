const communeSelect = document.getElementById("city");

function Recup_Villes(){
    let saisie = document.getElementById("postalCode").value;
    return saisie
    }

function fetchCommunesByCodePostal(codePostal) {
    const response = await fetch(
        `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`
    );
    const data = await response.json();
    console.table(data);
    return data;
}

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
