import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function wordSearch(searchTerm) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, searchTerm);
    } else {
      //printError(this, response, searchTerm);
    }
  });

  request.open("GET", url, true);
  request.send();
}


// UI Logic

function printElements(apiResponse, searchTerm) {
  const gifs = apiResponse.data;
  if (gifs.length > 0) {
    let gifHtml = '';
    gifs.forEach((gif) => {
      const gifUrl = gif.images.original.url;
      gifHtml += `
        <div>
          <br>
          <img src="${gifUrl}" alt="${searchTerm} GIF">
        </div>
      `;
    });
    document.querySelector('#showResponse').innerHTML = gifHtml;
  } else {
    document.querySelector('#showResponse').innerText = `No GIFs found for "${searchTerm}"`;
  }
}



function handleFormSubmission(event) {
  event.preventDefault();
  const searchTerm = document.querySelector('#searchTerm').value;
  wordSearch(searchTerm);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});