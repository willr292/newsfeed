import NewsArticleAnalyser from "../classes/NewsArticleAnalyser.js";

const logStats = (analyser: NewsArticleAnalyser) => {
  console.log(`There are ${analyser.uniqueTickers()} unique tickers.`);
  console.log(
    `The most popular category is ${analyser.mostPopularCategory()}.`
  );
  console.log(
    `The most popular category without a ticker is ${analyser.mostPopularCategoryWithoutTicker()}.`
  );
};

export default logStats;
