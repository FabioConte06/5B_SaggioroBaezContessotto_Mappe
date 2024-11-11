const chiave ="mappa"
const token = "3819207b-2545-44f5-9bce-560b484b2f0f"

const GETMAPPA = (indirizzo) => {
    return new Promise((resolve, reject) => {
        fetch("https://us1.locationiq.com/v1/search?key=pk.869b0a986abed22e19f8fca6de24a2cb=" + indirizzo + "&format=json&"
            
        )
        .then(r => r.json())
        .then(r => {
            resolve(r);
        })
        .catch(error => reject(error));
    });
};

const createForm = (parentElement) => {
    let data;
    let callback = null;
  
    return {  
        setLabels: (labels) => { data = labels; },  
        onsubmit: (callbackInput) => { callback = callbackInput},
        render: () => { 
            parentElement.innerHTML = 
            data.map((name, index) => {
                return `<div>${name}\n<input id="${name}" type="text" /></div>`;
            }).join('\n')
            + "<button type='button' id='submit'>Submit</button>";  
            document.querySelector("#submit").onclick = () => {
            const result = data.map((name) => {
                return document.querySelector("#" + name).value;
            });
            callback(result);
            }         
        },
    };
};
  
const form = createForm(document.querySelector('#app'));
form.setLabels(["Luogo"]);
form.onsubmit(console.log);
form.render();

let places = [
    {
        name: "Piazza del Duomo",
        coords: [45.4639102, 9.1906426]
    },
    {
        name: "Darsena",
        coords: [45.4536286, 9.1755852]
    },
    {
        name: "Parco Lambro",
        coords: [45.4968296, 9.2505173]
    },
    {
        name: "Stazione Centrale",
        coords: [45.48760768, 9.2038215]
    }
];

let zoom = 12;
let maxZoom = 19;
let map = L.map('map').setView(places[0].coords, zoom);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: maxZoom,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

places.forEach((place) => {
    const marker = L.marker(place.coords).addTo(map);
    marker.bindPopup(`<b>${place.name}</b>`);
});

