import * as dotenv from "dotenv";
import NewsArticleAnalyser from "./classes/NewsArticleAnalyser.js";
import getNewsFeed from "./utils/getNewsFeed.js";

const main = async () => {
  const data = await getNewsFeed();
  let analyser = new NewsArticleAnalyser(data);
  console.log(`There are ${analyser.uniqueTickers()} unique tickers.`);
  console.log(
    `The most popular category is ${analyser.mostPopularCategory()}.`
  );
  console.log(
    `The most popular category without a ticker is ${analyser.mostPopularCategoryWithoutTicker()}.`
  );
};

dotenv.config();
main();
