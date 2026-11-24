
const API_KEY = "4d9607280a7b40bcaac62f0d4d83dc10";

async function getNews() {

    const query = document.getElementById("searchInput").value || "technology";

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

    const container = document.getElementById("newsContainer");

    container.innerHTML = "<p>Loading news...</p>";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok") {
            throw new Error(data.message || "Unable to fetch news");
        }

        container.innerHTML = "";

        data.articles.forEach(article => {

            const card = document.createElement("div");
            card.className = "news-card";

            const image = document.createElement("img");
            image.src = article.urlToImage ||
                "https://placehold.co/600x300?text=No+Image";
            image.alt = "News image";

            const content = document.createElement("div");
            content.className = "news-content";

            const title = document.createElement("h3");
            title.textContent = article.title || "No title";

            const description = document.createElement("p");
            description.textContent =
                article.description || "No description available";

            const source = document.createElement("small");
            source.textContent = "Source: " +
                (article.source.name || "Unknown");

            const date = document.createElement("p");
            date.textContent = "Published: " +
                new Date(article.publishedAt).toLocaleString();

            const link = document.createElement("a");
            link.href = article.url;
            link.textContent = "Read More";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            content.append(title, description, source, date, link);
            card.append(image, content);

            container.appendChild(card);
        });

        if (data.articles.length === 0) {
            container.textContent = "No news articles found.";
        }

    } catch (error) {
        container.textContent = "Error: " + error.message;
    }
}

// Load news when the page opens
getNews();
