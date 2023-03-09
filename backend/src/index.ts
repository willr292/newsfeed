import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import NewsArticleAnalyser from "./classes/NewsArticleAnalyser.js";
import getNewsFeed from "./utils/getNewsFeed.js";
import logStats from "./utils/logStats.js";

const main = async () => {
  let data = await getNewsFeed();
  let analyser = new NewsArticleAnalyser(data);
  logStats(analyser);

  setInterval(async () => {
    data = await getNewsFeed();
    analyser = new NewsArticleAnalyser(data);
    logStats(analyser);
  }, 60000);

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173",
      optionsSuccessStatus: 200,
    })
  );

  app.get("/getNewsData", (_req, res) => {
    res.json({
      newsArticles: analyser.newsArticles,
      uniqueTickers: analyser.uniqueTickers(),
      mostPopularCategory: analyser.mostPopularCategory(),
      mostPopularCategoryWithoutTicker:
        analyser.mostPopularCategoryWithoutTicker(),
    });
  });

  app.listen(4000, () => {
    console.log(`Listening on port 4000`);
  });
};

dotenv.config();
main();
