//You can edit ALL of the code here
async function setup() {
  // const allEpisodes = getAllEpisodes();
  let showOptions = ""
  let allShows = getAllShows();
  allshows = allShows.sort((first, last) => first.name.localeCompare(last.name))
  allShows.forEach(show => {
    let currentShow = show.name
    showOptions += '<option value="' + show.id + '">' + currentShow + '</option>'
  })
  document.getElementById("tvshows").innerHTML = showOptions
  document.getElementById("tvshows").addEventListener('change', async () => {
    const showNumber = document.getElementById("tvshows").value
    const allEpisodePerShow = await getAllEpisodesForShow(showNumber)
    makePageForEpisodes(allEpisodePerShow);
    console.log('**** you selected ***' + value)
  })


  const allEpisodes = await getAllEpisodesFromServer()
  makePageForEpisodes(allEpisodes);
  document.getElementById("searchtext").addEventListener('input', async () => {
    const value = document.getElementById("searchtext").value
    // const allEpisodes = getAllEpisodes();
    const allEpisodes = await getAllEpisodesFromServer()
    const selectedEpisodes = allEpisodes.filter(episode => {
      return episode.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
    })
    makePageForEpisodes(selectedEpisodes); 
  })
  let episodeOptions = ""
  allEpisodes.forEach(episode => {
    let currentEpisode = episode.id + ' ' + episode.name
    episodeOptions += '<option value="' + episode.name + '">' + currentEpisode + '</option>'
  }) 
  document.getElementById("tvepisodes").innerHTML = episodeOptions
  document.getElementById("tvepisodes").addEventListener('change', async () => {
      const value = document.getElementById("tvepisodes").value
      // const allEpisodes = getAllEpisodes();
      const allEpisodes = await getAllEpisodesFromServer()
      const selectedEpisodes = allEpisodes.filter(episode => {
        return episode.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
    })
    makePageForEpisodes(selectedEpisodes); 
  })
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

function displayAllShows(allShows){
 
  let showContent = ""
  allShows.forEach(show => {
      showContent += "<div>"
      showContent += "<h1 id ='" + show.id + "'>" + show.name + "</h1>"
      showContent += "<div class = 'showsView'>"
      showContent += "<div>" 
      if(show.image == null){
        show.image = {medium: ""}
      }    
      showContent += "<img src='" + show.image.medium + "'>"
      showContent += "</div>"
      showContent += "<div>"
      showContent += show.summary
      showContent += "</p>"
      showContent += "</div>"
      showContent += "<div>"
      showContent += "<ol>"
      showContent += "<li>Rated: " + show.rating.average + "</li>"
      showContent += "<li>Genre: " + show.genres + "</li>"
      showContent += "<li>status: " + show.status + "</li>"
      showContent += "<li>Runtime: " + show.runtime + "</li>"
      showContent += "</ol>"
      showContent += "</div>"
      showContent += "</div>"
      showContent += "</div>"  
  })
  document.getElementById("showContainer").innerHTML = showContent
  document.querySelectorAll("h1").forEach(element => {
    element.addEventListener("click", async function(event){
      console.log(event.target.id)
      document.getElementById("episodeView").setAttribute("style", "display:inline")
      document.getElementById("showContainer").setAttribute("style", "display: none")

      const allEpisodePerShow = await getAllEpisodesForShow(event.target.id)
      makePageForEpisodes(allEpisodePerShow);

    })
  })
}

document.getElementById("episodeView").setAttribute("style", "display:none")
 let allShows = getAllShows();
 document.getElementById("filterText").addEventListener("input", () => {
  let text = document.getElementById("filterText").value
  let filtershows = allShows.filter(show => show.name.toLowerCase().includes(text.toLowerCase()))
  console.log("*****")
  displayAllShows(filtershows)
 })
displayAllShows((allShows))