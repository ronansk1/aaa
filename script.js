// Inicializa o mapa focado em uma região agrícola (ex: Paraná)
const map = L.map('map').setView([-24.95, -53.45], 10);

// Camada visual do mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marcador;
let lat, lon;

// Evento de clique no mapa
map.on('click', function(e) {
    lat = e.latlng.lat;
    lon = e.latlng.lng;

    // Move ou cria o marcador
    if (marcador) {
        marcador.setLatLng(e.latlng);
    } else {
        marcador = L.marker(e.latlng).addTo(map);
    }

    document.getElementById('coord-display').innerText = 
        `Lat: ${lat.toFixed(4)} | Lon: ${lon.toFixed(4)}`;
});

async function analisarClima() {
    if (!lat) return alert("Clique em um local no mapa primeiro!");

    const apiKey = "SUA_CHAVE_AQUI"; // Você precisará criar uma conta gratuita na OpenWeather
    const url = `https://openweathermap.org{lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        // Exemplo de como você buscaria os dados reais
        // const response = await fetch(url);
        // const data = await response.json();
        
        // Simulação enquanto você não tem a chave da API:
        document.getElementById('weather-info').innerHTML = `
            <h3>Análise Técnica:</h3>
            <p>Temperatura: 28°C</p>
            <p>Umidade do Ar: 45%</p>
            <hr>
            <p style="color: #ffdd59">⚠️ Risco de estresse hídrico moderado.</p>
        `;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}
