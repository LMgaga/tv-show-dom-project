//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  document.getElementById("searchtext").addEventListener('input', () => {
    const value = document.getElementById("searchtext").value
    const allEpisodes = getAllEpisodes();
    const selectedEpisodes = allEpisodes.filter(episode => {
      return episode.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
    })
    makePageForEpisodes(selectedEpisodes); 
    console.log('**** ' + value)
  })
  // console.log(allEpisodes)
}

function zeroPadded(episodeCode) {
 return episodeCode.toString().padStart(2, 0)
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((episode) => {
    rootElem.innerHTML += `<div><div class='header'><h2>${episode.name} - S${zeroPadded(episode.season)}E${zeroPadded(episode.number)}</h2></div><img src = ${episode.image.medium}> ${episode.summary}</div>`;
    // console.log(episode)
  });
}

window.onload = setup;
