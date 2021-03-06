let artistNames = [];

const response = () =>
  fetch("/api/artists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const getAndRenderArtists = () => response().then(renderAristsList);

const renderAristsList = async (artists) => {
  let jasonArtists = await artists.json();
  jasonArtists.forEach((artist) => {
    artistNames.push(artist.name);
  });
};

getAndRenderArtists();

console.log(artistNames);

$(function () {
  $("#artist-list").autocomplete({
    source: artistNames,
  });
});

const searchFormHandler = async (event) => {
  event.preventDefault();

  const artist = document
    .querySelector("#artist-list")
    .value.trim()
    .replace(" ", "_");

  if (artist) {
    const response = await fetch(`/artists/${artist}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace(`/artists/${artist}`);
    }
  }
};

document
  .querySelector(".artist-form")
  .addEventListener("submit", searchFormHandler);
