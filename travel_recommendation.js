let recommendations = [];

fetch('travel_recommendation_api.json')
  .then(res => res.json())
  .then(data => {
    recommendations = data;
    console.log('Loaded data:', recommendations);
  })
  .catch(err => console.error('Error loading JSON:', err));

function search() {
  const input = document.getElementById('searchInput').value.toLowerCase().trim();

  let category = null;
  if (["beach", "beaches"].includes(input)) category = "beach";
  else if (["temple", "temples"].includes(input)) category = "temple";
  else if (["country", "countries"].includes(input)) category = "country";

  if (!category) {
    document.getElementById('result').innerHTML = 'No results. Try "beach", "temple", or "country".';
    return;
  }

  const filtered = recommendations.filter(item => item.category === category);
  displayResults(filtered);
}

function displayResults(results) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  results.forEach(place => {
    resultDiv.innerHTML += `
      <div>
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <img src="${place.imageUrl}" alt="${place.name}" />
      </div>
    `;
  });
}

function resetSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('result').innerHTML = '';
}

document.getElementById('searchBtn').addEventListener('click', search);
document.getElementById('resetBtn').addEventListener('click', resetSearch);
