const ipAddess = document.querySelector(".ip-address");
const city = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");
const button = document.querySelector("#submit");
const inputAddress = document.querySelector("#input-ip-address");
let api = "http://ip-api.com/json/";
async function initMap() {
    try {
        const res = await fetch(api);
        const data = await res.json();
        let location = { lat: data.lat, lng: data.lon };
        let map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: data.lat + 0.0025, lng: data.lon },
            zoom: 16,
        });
        let marker = new google.maps.Marker({
            position: location,
            map: map,
        });
        ipAddess.textContent = data.query;
        city.textContent = `${data.city}, ${data.region}, ${data.zip} `;
        timezone.textContent = data.timezone;
        isp.textContent = `${data.isp}, ${data.org}`;
    } catch (err) {
        console.error(err);
    }
}
button.addEventListener("click", submitAddress);
function submitAddress(e) {
    let ipAdressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (inputAddress.value.match(ipAdressRegex)) {
        api = `http://ip-api.com/json/${inputAddress.value}`;
        initMap();
    }
}
