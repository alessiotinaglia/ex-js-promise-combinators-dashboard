
async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}

async function getDashboardData(query) {
    console.log(`Caricando la dashboard per la query "${query}"`);

    const destinationsPromise = fetch(`https://www.freetestapi.com/api/v1/destinations?search=${query}`);
    const weathersPromise = fetch(`https://www.freetestapi.com/api/v1/weathers?search=${query}`);
    const airportsPromise = fetch(`https://www.freetestapi.com/api/v1/airports?search=${query}`);

    console.log(destinationsPromise);
    console.log(weathersPromise);
    console.log(airportsPromise);

    const [destinations, weathers, airports] = await Promise.all([
        destinationsPromise.then(res => res.json()),
        weathersPromise.then(res => res.json()),
        airportsPromise.then(res => res.json())
    ]);

    return {
        city: destinations[0]?.name || 'Unknown city',
        country: destinations[0]?.country || 'Unknown country',
        temperature: weathers[0]?.temperature || 'Unknown temperature',
        weather: weathers[0]?.weather_description || 'Unknown weather',
        airport: airports[0]?.name || 'Unknown airport'
    };
}

getDashboardData('london')
    .then(data => {
        console.log('Dashboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));
