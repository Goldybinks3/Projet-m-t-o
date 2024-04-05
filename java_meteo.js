function Recup_Villes(){
    let saisie = document.getElementById("postalCode").value;
    return saisie
    }

fetch('https://geo.api.gouv.fr/communes?codePostal=${saisie}')
