import { NewsArticleArray } from "../utils/types.js";

class NewsArticleAnalyser {
  newsArticles: NewsArticleArray;

  constructor(newsArticles: NewsArticleArray) {
    this.newsArticles = newsArticles;
  }

  uniqueTickers() {
    const tickers = new Set();
    for (const article of this.newsArticles) {
      if (article.ticker) {
        tickers.add(article.ticker);
      }
    }
    return tickers.size;
  }

  mostPopularCategory() {
    const categories = new Map();
    for (const article of this.newsArticles) {
      const category = article["smw category"];
      if (category) {
        const count = categories.get(category) || 0;
        categories.set(category, count + 1);
      }
    }
    let mostPopularCategory = "";
    let highestCount = 0;
    for (const [category, count] of categories.entries()) {
      if (count > highestCount) {
        mostPopularCategory = category;
        highestCount = count;
      }
    }
    return mostPopularCategory;
  }

  mostPopularCategoryWithoutTicker() {
    const categories = new Map();
    for (const article of this.newsArticles) {
      const category = article["smw category"];
      const ticker = article.ticker;
      if (category && !ticker) {
        const count = categories.get(category) || 0;
        categories.set(category, count + 1);
      }
    }
    let mostPopularCategory = "";
    let highestCount = 0;
    for (const [category, count] of categories.entries()) {
      if (count > highestCount) {
        mostPopularCategory = category;
        highestCount = count;
      }
    }
    return mostPopularCategory;
  }
}

export default NewsArticleAnalyser;
