// let apiLink = `http://127.0.0.10:3500/api/albums/${search}`

async function getAlbums() {
  document.getElementById("results").innerHTML = "";
  let search = document.getElementById("search-val").value || "all";
  let response = await fetch(`http://127.0.0.10:3500/api/albums/${search}`);
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

async function getArtists() {
  document.getElementById("results").innerHTML = "";
  let search = document.getElementById("search-val-artist").value || "all";
  let response = await fetch(`http://127.0.0.10:3500/api/artists/${search}`);
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

async function appendDB() {
  let formObj = {};
  const data = new FormData(document.getElementById("append"));
  data.forEach((value, key) => (formObj[key] = value.toLowerCase()));
  formObj.release_year = `${formObj.release_year}-01-01`;
  let ifArtist = await fetch(
    `http://127.0.0.10:3500/api/exactArtist/${formObj.artist_name}`
  );
  // console.log(ifArtist.json().value.length < 1);
  if (ifArtist.ok) {
    console.log("send to post");
    id = await ifArtist.json();
    fetch(`http://127.0.0.10:3500/api/append/true/${id[0].artist_id}`, {
      method: "POST",
      body: formObj,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } else {
    id = await ifArtist.json();
    fetch;
  }
}
//{
//   "artist_name": "fgse",
//   "album_name": "nam",
//   "rating": "3",
//   "release_year": "1643",
//   "genre": "tt"
// }
