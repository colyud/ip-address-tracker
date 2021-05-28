const ipAddess = document.querySelector(".ip-address");
const city = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");
const button = document.querySelector("#submit");
const inputAddress = document.querySelector("#input-ip-address");
let api = "https://ipapi.co/json/";
async function initMap() {
    try {
        const res = await fetch(api);
        const data = await res.json();
        let location = { lat: data.latitude, lng: data.longitude };
        let map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: data.latitude + 0.0025, lng: data.longitude },
            zoom: 16,
        });
        let marker = new google.maps.Marker({
            position: location,
            map: map,
        });
        ipAddess.textContent = data.ip;
        city.textContent = `${data.city}, ${data.region}, ${data.postal} `;
        timezone.textContent = `UTC${data.utc_offset}`;
        isp.textContent = data.languages;
    } catch (err) {
        console.error(err);
    }
}
button.addEventListener("click", submitAddress);
function submitAddress(e) {
    let ipAdressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (inputAddress.value.match(ipAdressRegex)) {
        api = `https://ipapi.co/${inputAddress.value}/json/`;
        initMap();
    }
}
