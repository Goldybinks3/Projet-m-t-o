document.addEventListener("DOMContentLoaded", function() {
    let codepostal = document.getElementById("postalCode");
    let communeSelect = document.getElementById("Commune"); 
    let weatherForm = document.getElementById("InfoCommune"); 
    let weatherInfo = document.getElementById("InfoClimat");
//on a recupe tous les id des parti html pour y a rajouter des infos.
	
    codepostal.addEventListener("input", async function() {
        let code = codepostal.value;//on prendre le code rentre postalCode
        if (code.length >= 5) {//verfi si plus grand que 5
            let communes = await getCommunes(code);// on vient recupere grace a lapi toutes les communes
            fillCommune(communes);//on vient rajouter toutes le commune pour les mettre en option dans le code html
        }
    });

    async function getCommunes(codePostal) {
        let response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`);//requete api
        let data = await response.json();//mis en point json
        console.log("Données de la première API (communes):", data);//pour voir si les info passe bien
        return data.map(commune => ({ nom: commune.nom, codeInsee: commune.code }));
    } 

    function fillCommune(communes) {
        communeSelect.innerHTML = "";//on remet le fill a '0'
        communes.forEach((commune) => {//pour toute les communes
            let option = document.createElement("option");// on cree un ellement option 
            option.value = commune.nom;// on rentre les valeur et textContent comme une option de base
            option.textContent = commune.nom;
            option.setAttribute('data-code-insee', commune.codeInsee); // on stocke le code INSEE pour plustard
            communeSelect.appendChild(option);//puis on le rajoute dans loption 
        });
    }

    weatherForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement (voir sur internet)

        let selectedOption = communeSelect.options[communeSelect.selectedIndex];//on prend l'option qui a etais choisi
        let codeInsee = selectedOption.getAttribute('data-code-insee');//on la recupere dans un variable
        let weatherData = await getClimat(codeInsee);//puis nous recuperons cest info 
        ClimatInfo(weatherData);//puis nous traitons les données pour les afficher
        let ville = document.getElementById("ville")
        ville.classList.toggle("masque")
    });


    

    async function getClimat(codeInsee) {
        let apiKey = "41c18754b83bd370551aaca5d9c94a67c998fb2a6969cd59aa1f33c6281db7b6";//cest un cle qui nous permet detrre autoriser a aller sur l'api
        let response = await fetch(`https://api.meteo-concept.com/api/forecast/daily?insee=${codeInsee}&token=${apiKey}`);   //requete sur lapi
        let data = await response.json();//mis en json
        return data;//on retourne les données
        
    }

    function ClimatInfo(weatherData) {  
        let todayWeather = weatherData.forecast[0]; // Prend les données météorologiques pour aujourd'hui

        let minTemp = todayWeather.tmin;
        let maxTemp = todayWeather.tmax;
        let rainProb = todayWeather.probarain;
        let sunshineHours = todayWeather.sun_hours;
		let termo; 
		let climat;

		if (maxTemp >= 25) {
			termo = 'thermo2.png';
		} else if (maxTemp >= 15 && maxTemp < 25) {
			termo = 'thermo1.png';
		} else {
			termo = 'thermo.png';
		}
		
		if (rainProb >= 50 && minTemp < 0) {
			climat = 'neige.png';
		} else if (rainProb >= 50) {
			climat = 'pluie.png';
		} else if (rainProb < 50 && rainProb >= 15) {
			climat = 'nuage.png';
		} else {
			climat = 'soleil.png';
		}
		
        let weatherList = ""
		weatherInfo.innerHTML = "<h2>Météo pour aujourd'hui</h2>";
        weatherInfo.innerHTML += `
            <p id="tmin">Température minimale: ${minTemp}°C</p>
            <p id="tmax">Température maximale: ${maxTemp}°C</p>
			<img src="${termo}" alt="Thermomètre" id="termo">
            <p id="prob">Probabilité de pluie: ${rainProb}%</p>
            <p id="heure">Nombre d'heures d'ensoleillement: ${sunshineHours} heures</p>
			<img src="${climat}" alt="climat" id="climat">
        `;
        let reloadButton = document.createElement("nav")
        reloadButton.textContent = "Nouvelle recherche";
        document.body.appendChild(reloadButton);
    
        reloadButton.addEventListener("click", function () {
        
            location.reload()
        });
        
        console.log("Données météorologiques pour aujourd'hui:", todayWeather);//observer si les données sont bien
    }
});
