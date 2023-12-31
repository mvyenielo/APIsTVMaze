"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const TVMAZE_URL = 'https://api.tvmaze.com'

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // Remove placeholder & make request to TVMaze search shows API.
  const params = new URLSearchParams({q: term});
  const response = await fetch(`${TVMAZE_URL}/search/shows?${params}`);
  const showData = await response.json();
  const collectedShows = [];

  for(let tvShow of showData){
    let {id, name, summary, image} = tvShow.show;
    const extractedShowData = {id, name, summary, image};

    if(image){
      extractedShowData.image = image.medium;
    }
    else{
      extractedShowData.image = 'https://tinyurl.com/tv-missing'
    }

    collectedShows.push(extractedShowData);
  }

  return collectedShows;
}

/** Given list of shows, create markup for each and append to DOM.
 *
 * A show is {id, name, summary, image}
 * */

function displayShows(shows) {
  $showsList.empty();

  for (const show of shows) {
    const $show = $(`
        <div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image}"
              alt="Bletchly Circle San Francisco"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);
      // const showParsed = $show.json();
      // console.log(`showParsed in displayShows`, showParsed);
    $showsList.append($show);
  }

}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  displayShows(shows);
}

$searchForm.on("submit", async function handleSearchForm (evt) {
  evt.preventDefault();
  /*await*/ searchShowsAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(showId) {
    const showId = $(".data-show-id").attr();
    console.log(showId);
    const episodeParams = new URLSearchParams({showId});
    const episodeResponse = await fetch(`${TVMAZE_URL}/shows/${episodeParams}/episodes`);
    const episodeData = await episodeResponse.json();
    const collectedEpisodes = [];
    console.log(`episodeResponse`, episodeResponse)
    console.log(`episodeData`, episodeData)
 }

 $(".media-body").on("click","button", async function handleSearchForm (evt) {
  evt.preventDefault();
  console.log("episode button works");

  // const shows = await getShowsByTerm(term);

  // await getEpisodesOfShow();
});
/** Write a clear docstring for this function... */

// function displayEpisodes(episodes) {

//  }

// add other functions that will be useful / match our structure & design
