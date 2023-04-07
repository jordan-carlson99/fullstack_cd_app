async function getAlbums() {
  document.getElementById("results").innerHTML = "";
  let search = document.getElementById("search-val").value || "all";
  let response = await fetch(
    `https://cd-stackapi.onrender.com/api/albums/${search}`
  );
  let data = await response.json();
  data.forEach((element) => {
    let color = "green";
    if (!element.is_active) {
      color = "red";
    }
    let container = document.createElement("div");
    container.className = `result-card ${color} col-lg-4 panel panel-info`;
    container.innerHTML = `
    <div class="panel-heading">
    <h1 class="title">${element.album_name}</h1>
    </div>
    <div class="panel-body">
    <h2 class="artist">${element.artist_name}</h2>
    <h3 class="rating">Rating: ${element.rating}/10</h3>
    <p class="year">Year Released: ${element.release_year.slice(0, 4)}</p>
    <p class="genre">Genre: ${element.genre}</p>
    </div>`;
    document.getElementById("results").appendChild(container);
  });
}
