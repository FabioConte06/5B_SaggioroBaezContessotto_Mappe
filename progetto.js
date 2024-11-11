const createForm = (parentElement) => {
    let data;
    callback = null;

    return {
        setlabels: (labels) => {data = labels},
        submit: (callbackinput) => {callback = callbackinput},
        render: () => {
            parentElement.innerHTML = data.map((index) => {
                return `<div class="form-group">
                        ${index[0]}\n <input type="${index[1]}" id="${index[0]}" class="form-control"/>
                        </div>`;
            }).join("\n") + `<button type="button" class="btn btn-primary" id="submit">SUBMIT</button>`;
            document.getElementById("submit").onclick = () => {
                const result = {};
                console.log(data)
                data.forEach((index) => {
                    const campo = index[0];  
                    result[campo] = document.getElementById(campo).value;
                });
                Booking(result);        
            }
            },
        };
    };

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

