const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Use VoiceRSS to tell joke
function tellJoke(joke) {
  toggleButton();

  VoiceRSS.speech({
    key: "25b246ed52154dbcb433f84f39541b70",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJoke() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    return joke;
  } catch (error) {
    console.error(error);
  }
}

button.addEventListener("click", async () => {
  const joke = await getJoke();

  tellJoke(joke);
});

audioElement.addEventListener("ended", toggleButton);
