function fetchData() {
  const API_KEY =
    "499d03534f224e8890dcd1f95376001c";
  const searchText = document.getElementById("getText").value;
  const url = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (!data || !data.articles) {
        throw new Error("Invalid response format");
      }
      return data.articles;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
}

function displayData(articles) {
  const titles = document.querySelectorAll("#latestStories footer");

  articles.slice(0, 6).forEach((article, index) => {
    const titleElement = titles[index];
    if (titleElement) {
      // Ensure titleElement exists
      titleElement.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
    }
  });
}

function updateData() {
  fetchData().then(displayData);
}

document.getElementById("getText").addEventListener("input", updateData);

updateData();
