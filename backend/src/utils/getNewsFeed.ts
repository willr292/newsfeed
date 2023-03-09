import { NewsArticleArraySchema } from "./types.js";

const getNewsFeed = async () => {
  try {
    if (!process.env.API_URL) {
      throw new Error("Please provide an API URL.");
    }
    const response = await fetch(process.env.API_URL);
    if (response.ok) {
      const data = await response.json();
      const parsedData = NewsArticleArraySchema.safeParse(data);

      if (!parsedData.success) {
        throw new Error("Articles are misshapen.");
      }

      // Check for missing tickers and log them to the console.
      parsedData.data.forEach((article) => {
        if (!article.ticker) {
          console.warn(`article "${article.title}" does not have a ticker.`);
        }
      });

      // Remove html a tag from category.
      return parsedData.data.map((article) => {
        return {
          ...article,
          "smw category": article["smw category"].replace(/<[^>]+>/g, ""),
        };
      });
    } else {
      throw new Error(`Request failed with status ${response.status}.`);
    }
  } catch (error) {
    let message = "Unknown Error.";
    if (error instanceof Error) message = error.message;
    console.error(`something went wrong fetching from the API: ${message}`);
  }
};

export default getNewsFeed;
